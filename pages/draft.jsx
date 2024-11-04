import useFetchData from "@/hooks/useFetchData";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"; 
import { FaEdit } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md"; 
import { RiDeleteBin6Fill } from "react-icons/ri";

const Draft = () => {
  const router = useRouter();
  const { data: session, status } = useSession();


  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);


  const { alldata, loading } = useFetchData(
    "http://localhost:3000/api/blogApi"
  );

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  // Filter draft blogs only once after fetching the data
  const draftblogs = alldata.filter((ab) => ab.status === "draft");

  // Paginate the draft blogs
  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = draftblogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Calculate the total number of pages
  const totalPages = Math.ceil(draftblogs.length / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  if (status === "loading") {
    return (
      <div className="flex flex-col flex-center wh_100">
        <h1>Loading.....</h1>
      </div>
    );
  }

  if (session) {
    return (
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>
              Draft <span>Blog</span>
            </h2>
            <h3>Super User Panel</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <MdOutlinePendingActions /> <span>/</span> <span>Draft Blogs</span>
          </div>
        </div>

        <div className="blogstable" data-aos="fade-up">
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
                        <Link href={`/blogs/delete/${blog._id}`}>
                          <button title="delete">
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
    );
  }
};

export default Draft;
