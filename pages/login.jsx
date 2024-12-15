"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";


const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <h1>Loading....</h1>
      </div>
    );
  }

  async function login() {
    await signIn("google");
    router.push("/");
  }

  if (session) {
    router.push("/");
    return null;
  }

  if (!session) {
    return (
      <div className="loginfront flex flex-center flex-col full-w">
        <img src="./images/obiTech.jpg" width={230} height={230} />
        <h1>Welcome Super User of ObiTech Blog 👋</h1>
        <p>
          Visit our main website <a href="/">ObiTech</a>
        </p>

        <button className="mt-2" onClick={login}>
          Login with google
        </button>
      </div>
    );
  }
};

export default Login;
