import * as React from "react";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Languages, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { useTheme } from "./ThemeProvider";
import { useLanguage, Language } from "./LanguageProvider";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { name: "about", href: "#about" },
  { name: "projects", href: "#projects" },
  { name: "experience", href: "#experience" },
  { name: "works", href: "#works" },
  { name: "contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active Section Detection
      if (location.pathname === "/") {
        // Human focus is around 25% - 40% from the top of the screen
        const trigger = window.scrollY + (window.innerHeight * 0.3);
        let current = "";

        navItems.forEach((item) => {
          const id = item.href.replace("#", "");
          const el = document.getElementById(id);
          if (el && trigger >= el.offsetTop) {
            current = id;
          }
        });

        // Bottom of page detection
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
          current = "contact";
        }

        // Top of page exception
        if (window.scrollY < 100) {
          current = "";
        }

        setActiveSection((prev) => (prev !== current ? current : prev));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const languages: { code: Language; label: string }[] = [
    { code: "TH", label: "ไทย" },
    { code: "EN", label: "English" },
    { code: "CN", label: "中文" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setActiveSection(href.replace("#", ""));
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm py-3"
          : "bg-white dark:bg-zinc-950 py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                // For other pages, we let navigation happen, but we can also trigger a smooth scroll 
                // once we land on the homepage via a timeout similar to handleNavClick
                // This ensures we definitely end up at the top and it feels consistent
                navigate("/");
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
                e.preventDefault();
              }
            }}
            className="text-2xl font-bold tracking-tighter text-[#C79937]"
          >
            {t("logo")}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === "/" && activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium transition-all uppercase tracking-wider relative group ${
                    isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {t(item.name)}
                  {/* Underline for active state */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Languages className="h-4 w-4" />
                    <span className="hidden sm:inline">{language}</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "bg-primary/10 text-primary" : ""}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger
                  render={
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  }
                />
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="text-left text-primary font-bold">{t("logo")}</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-6 mt-10">
                    {navItems.map((item) => {
                      const isActive = location.pathname === "/" && activeSection === item.href.replace("#", "");
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`text-lg font-medium transition-colors uppercase tracking-widest ${
                            isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                          }`}
                        >
                          {t(item.name)}
                        </a>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
