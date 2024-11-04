import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react"; 

import { GiSettingsKnobs } from "react-icons/gi";
import { MdOutlineAccountCircle } from "react-icons/md";

const Settings = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-center flex-col wh_100">
        <h1>Loading......</h1>
      </div>
    );
  }

  async function logout() {
    await signOut();
    await router.push("/login");
  }

  if (session) {
    return (
      <div className="settingpage">
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>
              Super User <span>Setting</span>
            </h2>
            <h3>Supper User Panel</h3>
          </div>

          <div className="breadcrumb" data-aos="fade-left">
            <GiSettingsKnobs /> <span>/</span> <span>Setting</span>
          </div>
        </div>

        <div className="profilesettings">
          <div className="leftprofile_details flex" data-aos="fade-up">
            <img
              src="./images/obiTech.jpg"
              alt="Obitech"
              width={20}
              height={20}
              style={{ borderRadius: "100%" }}
            />
            <div className="w-100">
              <div className="flex flex-sb flex-left mt-2">
                <h2>My Profile</h2>
                <h3>
                  ObiTech <br /> Web Developer
                </h3>
              </div>

              <div className="flex flex-sb mt-2">
                <h3>Phone</h3>
                <input type="text" defaultValue="+234 903 0734 697" />
              </div>

              <div className="mt-2">
                <input
                  type="email"
                  defaultValue="official.info.obitech@gmail.com"
                />
              </div>

              <div className="flex flex-center w-100 mt-2">
                <button>Save</button>
              </div>
            </div>
          </div>
          <div className="rightlogoutsec" data-aos="fade-up">
            <div className="topaccoutnbox">
              <h2 className="flex flex-sb mt-1">
                My Account <MdOutlineAccountCircle />
              </h2>
              <hr />
              <div className="flex flex-sb mt-1">
                <h3>
                  Active Account <br /> <span>Email</span>
                </h3>
                <button onClick={logout}>Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Settings;
