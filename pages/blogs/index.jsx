import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcardHeart } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";

const Blog = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);

  const { alldata, loading } = useFetchData(
    "http://localhost:3000/api/blogApi"
  );

  // Filter draft blogs only once after fetching the data
  const publishedblog = alldata.filter((ab) => ab.status === "publish");

  // Paginate the draft blogs
  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = publishedblog.slice(indexOfFirstBlog, indexOfLastBlog);

  // Calculate the total number of pages
  const totalPages = Math.ceil(publishedblog.length / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="loadingdata flex flex-col flex-center wh-100">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (session) {
    return (
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All Published <span>Blogs</span>
            </h2>
            <h3>Supper User Panel</h3>
          </div>

          <div className="breadcrumb">
            <BsPostcardHeart /> <span>/</span> <span>Blogs</span>
          </div>
        </div>

        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Blogs</h2>
            <input
              type="search"
              placeholder="search by title....."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="blogstable">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Edit / Delete</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Loading.....
                    </td>
                  </tr>
                ) : currentBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  currentBlogs.map((blog, index) => (
                    <tr key={blog._id}>
                      <td>{indexOfFirstBlog + index + 1}</td>
                      <td>{blog.title}</td>
                      <td>{blog.slug}</td>
                      <td>
                        <div className="flex gap-2 flex-center">
                          <Link href={`/blogs/edit/${blog._id}`}>
                            <button title="edit">
                              <FaEdit />
                            </button>
                          </Link>
                          <Link href={`/blogs/edit/${blog._id}`} >
                            <button
                              title="delete"
                     
                            >
                              <RiDeleteBin6Fill />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {currentBlogs.length > 0 && (
              <div className="blogpagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {pageNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => paginate(num)}
                    className={currentPage === num ? "active" : ""}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Blog;
