import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Aos({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      offset: 200,
      once: true,
    });
  }, []);
  return <div>{children}</div>;
}
