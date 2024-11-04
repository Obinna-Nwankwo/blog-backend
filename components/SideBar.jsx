import Link from "next/link";
import { BsPostcardHeart } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrChapterAdd } from "react-icons/gr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SideBar = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLinkClicked = (link) => { 
    setActiveLink(link);
    setClicked(false);
  };

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <aside className="asideleft">
      <ul>
        <Link href="/">
          <li
            className={activeLink === "/" ? "navactive" : ""}
            onClick={() => handleLinkClicked("/")}
          >
            <IoHome />
            <span>Dashboard </span>
          </li>
        </Link>
        <Link href="/blogs">
          <li
            className={activeLink === "/blogs" ? "navactive" : ""}
            onClick={() => handleLinkClicked("/blogs")}
          >
            <BsPostcardHeart />
            <span>Blogs </span>
          </li>
        </Link>
        <Link href="/blogs/add-blog">
          <li
            className={activeLink === "/blogs/add-blog" ? "navactive" : ""}
            onClick={() => handleLinkClicked("/blogs/add-blog")}
          >
            <GrChapterAdd />
            <span>Add Blog </span>
          </li>
        </Link>
        <Link href="/draft">
          <li
            className={activeLink === "/draft" ? "navactive" : ""}
            onClick={() => handleLinkClicked("/draft")}
          >
            <MdOutlinePendingActions />
            <span>Pending </span>
          </li>
        </Link>
        <Link href="/settings">
          <li
            className={activeLink === "/settings" ? "navactive" : ""}
            onClick={() => handleLinkClicked("/settings")}
          >
            <GiSettingsKnobs />
            <span>Settings </span>
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default SideBar;
