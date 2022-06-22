using System;
using Microsoft.AspNetCore.Http;

namespace going_serverless.Models
{
	public class CreatePost
	{
		public CreatePost(IFormCollection form)
        {
			Title = form[nameof(Title)];

			Content = form[nameof(Content)];
        }

		public string Title { get; set; }

		public string Content { get; set; }

		public string? ImageUrl { get; set; }
	}
}

