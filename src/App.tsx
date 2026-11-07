import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Button, Container } from "./components/ui";
import About from "./pages/About";
import Landing from "./pages/Landing";

/** Scrolls to the #hash target on navigation, or back to the top on a new page. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, key]);
  return null;
}

function NotFound() {
  return (
    <main>
      <Container className="flex flex-col items-start gap-6 py-24">
        <h1 className="text-t48 font-bold text-ink">This page doesn’t exist.</h1>
        <p className="text-[18px] leading-[1.55] text-muted">
          The link may be old or mistyped. Head back to the start to keep exploring.
        </p>
        <Button to="/">Back to home</Button>
        <Link to="/about" className="text-base font-medium text-brand-blue-dark hover:underline">
          Or read about the community
        </Link>
      </Container>
    </main>
  );
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
