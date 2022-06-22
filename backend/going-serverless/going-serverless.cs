using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using MongoDB.Driver;
using going_serverless.Models;
using Amazon.S3;
using Amazon;
using Amazon.S3.Transfer;
using System.Linq;
using going_serverless.Configurations;

namespace going_serverless
{
    public static class going_serverless
    {
        private static readonly MongoDbSettings _mongoDbSettings;
        private static readonly IMongoCollection<Post> _mongoDbCollection;

        private static readonly AmazonS3Settings _amazonS3Settings;
        private static readonly AmazonS3Client _amazonS3Client;

        static going_serverless()
        {
            _mongoDbSettings = new MongoDbSettings
            {
                ConnectionString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING"),
                DatabaseName = Environment.GetEnvironmentVariable("MONGDDB_DATABASE_NAME")
            };

            _amazonS3Settings = new AmazonS3Settings
            {
                AccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY"),
                SecretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY"),
                BucketName = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME")
            };

            _amazonS3Client = new AmazonS3Client(
                _amazonS3Settings.AccessKey,
                _amazonS3Settings.SecretKey,
                RegionEndpoint.EUCentral1
            );
            
            _mongoDbCollection = new MongoClient(_mongoDbSettings.ConnectionString)
                .GetDatabase(_mongoDbSettings.DatabaseName)
                .GetCollection<Post>("posts");
        }

        [FunctionName("getAll")]
        public static async Task<IActionResult> GetAsync(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "post/getAll")] HttpRequest req,
            ILogger log)
        {
            var findResult = await _mongoDbCollection.FindAsync(x => true);
            var listResult = await findResult.ToListAsync();
            
            return new JsonResult(listResult.OrderByDescending(x => x.CreatedAt));
        }

        [FunctionName("create")]
        public static async Task<IActionResult> CreateAsync(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "post/create")] HttpRequest req,
            ILogger log)
        {
            var formData = await req.ReadFormAsync();
            var createPost = new CreatePost(formData);
            if (formData.Files.Count > 0)
            {
                using var memoryStream = new MemoryStream();
                await formData.Files[0].CopyToAsync(memoryStream);

                var uploadRequest = new TransferUtilityUploadRequest
                {
                    InputStream = memoryStream,
                    Key = formData.Files[0].FileName,
                    BucketName = _amazonS3Settings.BucketName
                };

                var fileTransferUtility = new TransferUtility(_amazonS3Client);
                await fileTransferUtility.UploadAsync(uploadRequest);

                var fileUploadRegion = RegionEndpoint.EUCentral1.SystemName;
                var fileBucket = _amazonS3Settings.BucketName;
                var fileName = formData.Files[0].FileName;

                createPost.ImageUrl = $"https://{fileBucket}.s3.{fileUploadRegion}.amazonaws.com/{fileName}";
            }

            var post = new Post(createPost);
            await _mongoDbCollection.InsertOneAsync(post);
            return new JsonResult(post);
        }
    }
}

