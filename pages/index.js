import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";

import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LineController,
  LinearScale,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogData, setBlogData] = useState([]);

  ChartJS.register(
    CategoryScale,
    BarElement,
    LineController,
    LinearScale,
    Tooltip,
    Title,
    Legend
  );

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/blogApi");
        const data = await res.json();
        setBlogData(data);
        console.log("fetching all data", data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);


  const monthlydata = blogData
    .filter((blog) => blog.status === "draft" && blog.createdAt) // Only proceed if createdAt exists
    .reduce((acc, blog) => {
      const year = new Date(blog.createdAt).getFullYear();
      const month = new Date(blog.createdAt).getMonth();

      acc[year] = acc[year] || Array(12).fill(0);
      acc[year][month]++;
      return acc;
    }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlydata);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlydata[year] || Array(12).fill(0), // Correctly initialize array
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)},  0.5)`,
  }));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blog Created Monthly By Year",
      },
    },
  };

  const data = { labels, datasets };

  console.log("monthlydata", monthlydata);
  console.log("blog", blogData);



  if (status === "loading") {
    return (
      <div className="flex flex-col flex-center wh_100">
        <h1>Loading.....</h1>
      </div>
    );
  }

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
            <div data-aos="fade-right">
              <h2>
                Blogs <span>Dashboard</span>
              </h2>
              <h3>Supper User Panel</h3>
            </div>

            <div className="breadcrumb" data-aos="fade-left">
              <IoHome /> <span>/</span> <span>Dashboard</span>
            </div>
          </div>

          <div className="topfourcards flex flex-sb">
            <div className="four_card" data-aos="fade-right">
              <h2>Total Blogs</h2>
              <span>
                {" "}
                {blogData?.filter((ab) => ab.status === "publish").length}{" "}
              </span>
            </div>
            <div className="four_card" data-aos="fade-right">
              <h2>Total Topics</h2>
              <span>10</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Total Tags</h2>
              <span>8</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Total Draft</h2>
              <span>
                {blogData?.filter((ab) => ab.status === "draft").length}
              </span>
            </div>
          </div>

          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview" data-aos="fade-up">
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

              <Bar data={data} options={options} />
            </div>
            <div className="right_salescont" data-aos="fade-up">
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
