import * as React from "react";
import { useState, useEffect } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { motion, AnimatePresence } from "motion/react";
import { Image as ImageIcon, ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { worksData } from "../constants/works";
import Navbar from "../components/Navbar";

export default function WorksPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Design", "Vdo", "Marketing"];

  const filteredWorks = filter === "All" 
    ? worksData 
    : worksData.filter(work => work.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground font-kanit">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-16">
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              {t("projects_page_back")}
            </button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                {t("works_page_title")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {t("works_page_desc")}
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work) => (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-square rounded-[2.5rem] overflow-hidden group border border-border"
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
      </main>
    </div>
  );
}
