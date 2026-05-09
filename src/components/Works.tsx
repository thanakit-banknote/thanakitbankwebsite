import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageProvider";
import { motion, AnimatePresence } from "motion/react";
import { Image as ImageIcon, ArrowRight } from "lucide-react";
import { worksData } from "../constants/works";

export default function Works() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Design", "Vdo", "Marketing"];

  const filteredWorks = filter === "All" 
    ? worksData 
    : worksData.filter(work => work.category === filter);

  return (
    <section className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 md:gap-4"
          >
            <div className="p-2 md:p-3 bg-muted rounded-xl border border-border shadow-sm">
              <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              {t("works_title")}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/works"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline group underline sm:no-underline"
            >
              {t("works_view_all")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Filters - Horizontal scroll on mobile */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-2 md:gap-3 mb-8 md:mb-12 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border cursor-pointer whitespace-nowrap ${
                filter === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat === "All" ? t("works_filter_all") : 
               cat === "Design" ? t("works_filter_ui") :
               cat === "Vdo" ? t("works_filter_web") :
               t("works_filter_mobile")}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[3/4] sm:aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden group border border-border"
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <Link 
                  to={`/works/${work.id}`}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[4px]"
                >
                  <div className="text-center p-6">
                    <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      {work.category}
                    </p>
                    <h3 className="text-white text-2xl font-bold mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                      {work.title}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-4 group-hover:translate-y-0">
                      {t("works_view_more")}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
