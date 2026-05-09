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

    {
      id: 1,
      title: t("banner_hi"),
      subtitle: t("banner_role"),
      description: t("banner_desc"),
      image: "https://img1.pic.in.th/images/portfolioa5ba697fc437c561.jpg",
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
    <section className="relative w-full overflow-hidden bg-background">
      <div className="relative h-[600px] md:h-[800px] w-full flex items-center overflow-hidden">
  <div className="container mx-auto px-4 md:px-6 relative z-10">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-2xl pt-12 md:pt-0"
    >
      <h1 className="text-4xl md:text-7xl font-bold mb-6">
        {t("banner_hi")}
      </h1>

      <p className="text-xl text-muted-foreground mb-8">
        {t("banner_desc")}
      </p>

      <Link to="/works">
        <Button size="lg">
          {t("banner_view_projects")}
        </Button>
      </Link>
    </motion.div>
  </div>
</div>
    </section>
  );
}
