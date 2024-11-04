import Blog from "@/components/Blog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GrChapterAdd } from "react-icons/gr";

const AddBlog = () => {
  const router = useRouter();
  const { data: session, status } = useSession();  

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  });

  if(status === "loading"){
    return <div className="loadingdata flex flex-col wh-100 flex-center">
        <h1>Loading.....</h1>
    </div>
  }

  if (session) {
    return (
      <>
        <div className="addblogspage">
          <div className="titledashboard flex flex-sb">
            <div data-aos="fade-right">
              <h2>
                Add <span>Blog</span>
              </h2>
              <h3>Supper User Panel</h3>
            </div>

            <div className="breadcrumb" data-aos="fade-left">
              <GrChapterAdd /> <span>/</span> <span>Add Blog</span>
            </div>
          </div>

          <div className="blogsadd">
            <Blog />
          </div>
        </div>
      </>
    );
  }
};

export default AddBlog;
