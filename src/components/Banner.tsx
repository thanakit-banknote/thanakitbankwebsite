import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "./LanguageProvider";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { ArrowRight, Palette, Code, Layout } from "lucide-react";
import { Link } from "react-router-dom";

export default function Banner() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const isDark = React.useMemo(() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, [theme]);

  const autoplay = React.useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: false }),
    []
  );

  const slides = [
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
      <Carousel
        plugins={[autoplay]}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[600px] md:h-[800px] w-full flex items-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover opacity-20 dark:opacity-10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl pt-12 md:pt-0"
                  >
                    <div className="scale-75 md:scale-100 origin-left">
                      {slide.icon}
                    </div>
                    <h2 className="text-primary font-medium tracking-widest uppercase mb-2 text-sm md:text-base">
                      {slide.subtitle}
                    </h2>
                    <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight mb-4 md:mb-6 leading-tight whitespace-pre-line">
                      {slide.title}
                    </h1>
                    <p className="text-base md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed line-clamp-4 md:line-clamp-none">
                      {slide.description}
                    </p>
                    
                    {slide.cta && (
                      <Link to="/works">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-full group transition-all">
                          {t("banner_view_projects")}
                          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                </div>

                {/* Decorative Element */}
                <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
                   <div className="w-full h-full bg-primary/5 skew-x-12 translate-x-1/2" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:right-16 md:left-auto flex justify-center md:justify-start gap-2 z-20">
          <CarouselPrevious className="static translate-y-0 h-10 w-10 md:h-12 md:w-12 border-primary/20 hover:bg-primary hover:text-white transition-all" />
          <CarouselNext className="static translate-y-0 h-10 w-10 md:h-12 md:w-12 border-primary/20 hover:bg-primary hover:text-white transition-all" />
        </div>
      </Carousel>
    </section>
  );
}
