import { MdOutlinePendingActions } from "react-icons/md";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Head } from "next/head";

import { useSession } from "next-auth/react";

import axios from "axios";

import Blog from "@/components/Blog";



const DeleteBlog = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/blogApi/${id}`).then((res) => {
        setProduct(res.data);
      });
    } else {
      return;
    }
  });

  if (status === "loading") {
    return (
      <div className="flex flex-col flex-center wh_100">
        <h1>Loading.......</h1>
      </div>
    );
  }

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

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
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default DeleteBlog;
