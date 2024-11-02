import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoHome } from "react-icons/io5";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (session) {
    return (
      <>
        <Head>
          <title>Super User Dashboard</title>
          <meta name="description" content="super user dashboard next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="dashboard">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Blogs <span>Dashboard</span>
              </h2>
              <h3>Supper User Panel</h3>
            </div>

            <div className="breadcrumb">
              <IoHome /> <span>/</span> <span>Dashboard</span>
            </div>
          </div>

          <div className="topfourcards flex flex-sb">
            <div className="four_card">
              <h2>Total Blogs</h2>
              <span>6</span>
            </div>
            <div className="four_card">
              <h2>Total Topics</h2>
              <span>10</span>
            </div>
            <div className="four_card">
              <h2>Total Tags</h2>
              <span>8</span>
            </div>
            <div className="four_card">
              <h2>Total Draft</h2>
              <span>4</span>
            </div>
          </div>

          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">
                  10 / 365 <br /> <span>Total Published</span>
                </h3>
              </div>
            </div>
            <div className="right_salescont">
              <div>
                <h3>Blogs By Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>

              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Html, Css, Javascript</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Next Js, React Js</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td>Databases</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Deployment</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
