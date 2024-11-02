import { BsBarChartSteps } from "react-icons/bs";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Header = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const {data: sessinon} = useSession();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        });
      }
    }
  };

  return (
    <header className="header flex flex-sb">
      <div className="logo flex gap-2">
        <h1>Super User</h1>
        <div className="flex flex-center headerham">
          <BsBarChartSteps />
        </div>
      </div>
      <div className="rightnav flex gap-2">
        <div onClick={toggleFullScreen}>
          {isFullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
        </div>

        <div className="notification ">
          <IoNotificationsOutline />
        </div>

        <div className="profile ">
          {sessinon ? (
            <img
              src={sessinon.user.image}
              alt="Md profile"
              width={45}
              height={45}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <img
              src="./images/profile.avif"
              alt="Md profile"
              width={45}
              height={45}
              style={{ borderRadius: "50%" }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
