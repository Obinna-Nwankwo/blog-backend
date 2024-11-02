import { model, models, Schema } from "mongoose";


const blogSchema = new Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
  blogcategory: [
    {
      type: String,
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Blog = models.Blog || model('Blog', blogSchema, 'blogtest');

export default Blog;
