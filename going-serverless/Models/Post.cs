using System;

namespace going_serverless.Models
{
	public class Post
	{
        public Post(CreatePost create)
        {
            Id = Guid.NewGuid();
            Title = create.Title;
            Content = create.Content;
            ImageURL = create.ImageUrl;
            CreatedAt = DateTime.Now;
        }

        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string? ImageURL { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}

