import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const Blog = ({
  _id,
  title: exsitingTitle,
  slug: existingSlug,
  blogcategory: existingBlogCategory,
  tags: existingTags,
  status: existingStatus,
  description: existingDescription,
}) => {
  const [title, setTitle] = useState(exsitingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [blogcategory, setBlogCategory] = useState(existingBlogCategory || "");
  const [tags, setTags] = useState(existingTags || "");
  const [status, setStatus] = useState(existingStatus || "");
  const [description, setDescription] = useState(existingDescription || "");

  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    
    const newSlug = inputValue.replace(/\s+/g, '-');
    setSlug(newSlug);
  }

  async function createProduct(evnt) {
    evnt.preventDefault();

    const data = { title, slug, blogcategory, tags, status, description };

    if (_id) {
      await axios.put("/api/blogApi", { ...data, _id });
    } else {
      await axios.post("/api/blogApi", data);
    }

    setRedirect(true);
  }

  if (redirect) {
    router.push("/");
    return null;
  }

  return (
    <>
      <form onSubmit={createProduct} className="addWebsiteform">
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter a title....."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Slug</label>
          <input
            value={slug}
            onChange={handleSlugChange}
            type="text"
            id="slug"
            placeholder="Enter a slug url....."
            required
          />
        </div>

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            multiple
            value={blogcategory}
            onChange={(e) =>
              setBlogCategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option value="htmlcssjs">Html, Css, Javascript</option>
            <option value="nextjs">Next Js, React Js</option>
            <option value="database">Database</option>
            <option value="deployment">Deployment</option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1">
            Selected: <span>category</span>
          </p>
        </div>

        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description">Blog Content</label>
          <MdEditor
            value={description}
            onChange={(ev) => setDescription(ev.text)}
            style={{ height: "500px", width: "100%" }}
            renderHTML={(text) => (
              <ReactMarkdown
                components={{
                  code: ({ node, inline, children, className, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    if (inline) {
                      return <code>{children} </code>;
                    } else if (match) {
                      return (
                        <div style={{ position: "relative" }}>
                          {" "}
                          <pre
                            style={{
                              padding: "0",
                              borderRadius: "5px",
                              overflowX: "auto",
                              whiteSpace: "pre-wrap",
                            }}
                            {...props}
                          >
                            {" "}
                            <code>{children}</code>
                          </pre>{" "}
                          <button
                            style={{
                              position: "absolute",
                              top: "-20px",
                              right: "-20px",
                              zIndex: "1",
                            }}
                            onClick={() =>
                              navigator.clipboard.writeText(children)
                            }
                          >
                            Copy Code
                          </button>{" "}
                        </div>
                      );
                    } else {
                      return <code {...props}> {children} </code>;
                    }
                  },
                }}
              >
                {text}
              </ReactMarkdown>
            )}
          />
        </div>

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">Tags</label>
          <select
            name="tags"
            id="tags"
            multiple
            value={tags}
            onChange={(e) =>
              setTags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option value="html">Html</option>
            <option value="css">Css</option>
            <option value="javascript">Javascript</option>
            <option value="nextjs">Next Js</option>
            <option value="reactjs">React Js</option>
            <option value="database">Database</option>
          </select>
          <p className="existingtag flex gap-1 mt-1 mb-1">
            Selected: <span>tag</span>
          </p>
        </div>

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value=""> ---No Select--- </option>
            <option value="publish">Publish</option>
            <option value="draft">Draft</option>
          </select>
          <p className="existingstatus flex gap-1 mt-1 mb-1">
            Selected: <span>status</span>
          </p>
        </div>

        <div className="w-100 mb-2">
          <button type="submit" className="w-100 addwebbtn flex-center">
            SAVE BLOG
          </button>
        </div>
      </form>
    </>
  );
};

export default Blog;
