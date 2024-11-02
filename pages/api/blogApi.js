import { mongooseConnection } from "@/lib/mongoose";
import Blog from "@/models/blog";

export default async function handler(req, res) {
  await mongooseConnection();

  const { method } = req;

  if (method === "POST") {
    const { title, slug, blogcategory, tags, description, status } = req.body;

    const blogDoc = await Blog.create({
      title,
      slug,
      blogcategory,
      tags,
      description,
      status,
    });

    res.json(blogDoc);
  }

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Blog.findById(req.query.id));
    } else {
      res.json((await Blog.find()).reverse());
    }
  }

  if (method === "PUT") {
    const { _id, title, slug, blogcategory, tags, description, status } =
      req.body;
    await Blog.updateOne(
      { _id },
      { _id, title, slug, blogcategory, tags, description, status }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Blog.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
