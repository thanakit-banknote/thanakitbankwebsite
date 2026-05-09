import * as React from "react";
import { useLanguage } from "./LanguageProvider";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { ArrowRight, Palette, Code, Layout } from "lucide-react";
import { Link } from "react-router-dom";

export default function Banner() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const slides = [
    {
      id: 1,
      title: t("banner_hi"),
      subtitle: t("banner_role"),
      description: t("banner_desc"),
      image:
        "https://img1.pic.in.th/images/portfolioa5ba697fc437c561.jpg",
      icon: <Layout className="w-12 h-12 text-primary mb-4" />,
    },
    {
      id: 2,
      title: t("banner_highlight_title"),
      subtitle: "Adobe Creative Suite",
      description: t("banner_highlight_desc"),
      image: isDark
        ? "https://img2.pic.in.th/IMG_2514.jpg"
        : "https://img1.pic.in.th/images/AJAH0397.jpg",
      icon: <Palette className="w-12 h-12 text-primary mb-4" />,
    },
    {
      id: 3,
      title: t("banner_cta_title"),
      subtitle: "Portfolio & Works",
      description: t("banner_cta_desc"),
      image: "https://img2.pic.in.th/EMS_NIGHT.md.png",
      icon: <Code className="w-12 h-12 text-primary mb-4" />,
      cta: true,
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        {slides.map((slide) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <div>
              {slide.icon}

              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {slide.title}
              </h1>

              <h2 className="text-2xl text-primary mb-4">
                {slide.subtitle}
              </h2>

              <p className="text-muted-foreground mb-6">
                {slide.description}
              </p>

              {slide.cta && (
                <Button asChild size="lg">
                  <Link to="/portfolio">
                    View Portfolio
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>

            <div className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
