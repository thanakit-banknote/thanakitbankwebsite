/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Works from "./components/Works";
import Contact from "./components/Contact";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import WorksPage from "./pages/WorksPage";
import WorkDetailPage from "./pages/WorkDetailPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <LanguageProvider defaultLanguage="TH">
        <Router>
          <div className="min-h-screen bg-background font-kanit">
            <Navbar />
            <ScrollToTop />
            <main>
              <Routes>
                <Route path="/" element={<HomePageContent />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                <Route path="/works" element={<WorksPage />} />
                <Route path="/works/:id" element={<WorkDetailPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

function HomePageContent() {
  return (
    <>
      {/* Banner Section */}
      <div id="banner">
        <Banner />
      </div>

      {/* About Section */}
      <div id="about">
        <About />
      </div>

      {/* Projects Section */}
      <div id="projects">
        <Projects />
      </div>

      {/* Experience Section */}
      <div id="experience">
        <Experience />
      </div>

      {/* Works Section */}
      <div id="works">
        <Works />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}

