import { MdOutlinePendingActions } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head"; // Fix here: default import

import { useSession } from "next-auth/react";
import axios from "axios";



const DeleteBlog = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/blogApi?id=${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product info:", error);
        });
    }
  }, [id]);

  function goback() {
    router.push('/')
  }

  async function deleteOne() {
    await axios.delete(`/api/blogApi?id=${id}`)
    goback();
  }

  if (status === "loading") {
    return (
      <div className="flex flex-col flex-center wh_100">
        <h1>Loading.......</h1>
      </div>
    );
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Deleting Blog</title>
        </Head>

        <div className="blogpage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Delete <span>{product?.title}</span>
              </h2>
              <h3>Super User Panel</h3>
            </div>
            <div className="breadcrumb">
              <MdOutlinePendingActions /> <span>/</span>{" "}
              <span>Delete Blogs</span>
            </div>
          </div>

          <div className="deletesec flex flex-center wh_100">
            <div className="deletecard">
              <svg viewBox="0 0 24 24" fill="red" width="6rem" height="6rem">
                <path d="M4 19V7h12v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2M6 9v10h8V9H6m7.5-5H17v2H3V4h3.5l1-1h5l1 1M19 17v-2h2v2h-2m0-4V7h2v6h-2z" />
              </svg>
              <p className="cookieHeading">Are you sure?</p>
              <p className="cookieDescription">
                If you delete this blog content it will be permenent delete your
                blog.
              </p>
              <div className="buttonContainer">
                <button onClick={deleteOne} className="acceptButton">
                  Delete
                </button>
                <button onClick={goback} className="declineButton">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default DeleteBlog;
