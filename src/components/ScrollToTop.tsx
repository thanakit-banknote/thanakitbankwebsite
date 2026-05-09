import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, key } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scrollPos-${key}`, window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [key]);

  useEffect(() => {
    if (navType === "POP") {
      const savedPosition = sessionStorage.getItem(`scrollPos-${key}`);
      if (savedPosition) {
        const pos = parseInt(savedPosition, 10);
        // Instant restoration
        window.scrollTo(0, pos);
        
        // Fallback for async content loading
        requestAnimationFrame(() => {
          window.scrollTo(0, pos);
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType, key]);

  return null;
}
