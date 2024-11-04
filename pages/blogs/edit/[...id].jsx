import { MdOutlinePendingActions } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head"; // Fix here: default import

import { useSession } from "next-auth/react";
import axios from "axios";
import Blog from "@/components/Blog"; // Ensure this is correctly exported in Blog.js

const EditBlog = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

   // Fetch product information when `id` is available
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/blogApi?id=${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product info:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

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
          <title>Update Blog</title>
        </Head>

        <div className="blogpage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Edit <span>{product?.title}</span>
              </h2>
              <h3>Super User Panel</h3>
            </div>
            <div className="breadcrumb">
              <MdOutlinePendingActions /> <span>/</span> <span>Edit Blogs</span>
            </div>
          </div>

          <div className="mt-3">{product && <Blog {...product} />}</div>
        </div>
      </>
    );
  }
};

export default EditBlog;
