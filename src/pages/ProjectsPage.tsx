import * as React from "react";
import { useState } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Filter, Search, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Project {
  id: number;
  titleKey: string;
  descKey: string;
  image: string;
  tags: string[];
  category: "Architecture" | "Design" | "Content";
}

const allProjects: Project[] = [
  {
    id: 1,
    titleKey: "project_1_title",
    descKey: "project_1_desc",
    image: "https://img1.pic.in.th/images/Untitled-30fd7b0e8747a3ca5.jpg",
    tags: ["Photoshop", "Premiere Pro", "Management"],
    category: "Design",
  },
  {
    id: 2,
    titleKey: "project_2_title",
    descKey: "project_2_desc",
    image: "https://img1.pic.in.th/images/625934-POKER-TOURNAMENT-PATTAYA-3-1.md.jpg",
    tags: ["AutoCAD", "SketchUp", "V-Ray"],
    category: "Architecture",
  },
  {
    id: 3,
    titleKey: "project_3_title",
    descKey: "project_3_desc",
    image: "https://img1.pic.in.th/images/CROP-PNG81e61ff7dfcd4b80.png",
    tags: ["Architecture", "Interior", "Design", "AutoCAD", "SketchUp"],
    category: "Architecture",
  },
];

export default function ProjectsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = allProjects.filter((project) => {
    const matchesFilter = filter === "All" || project.category === filter;
    const matchesSearch = t(project.titleKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { id: "All", label: t("projects_filter_all") },
    { id: "Architecture", label: t("projects_filter_arch") },
    { id: "Design", label: t("projects_filter_design") },
    { id: "Content", label: t("projects_filter_content") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-12">
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors group cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              {t("projects_page_back")}
            </button>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {t("projects_page_title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t("projects_page_desc")}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
            {/* Filter Tabs */}
            <div className="flex bg-muted p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    filter === cat.id 
                      ? "bg-background text-primary shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("projects_search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="group flex flex-col bg-muted/30 rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={t(project.titleKey)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/10">
                          {project.category === "Architecture" ? t("projects_filter_arch") : 
                           project.category === "Design" ? t("projects_filter_design") : 
                           t("projects_filter_content")}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {t(project.titleKey)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                        {t(project.descKey) || project.descKey}
                      </p>
                      
                      <div className="mt-auto flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-background border border-border rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <div className="inline-flex p-6 bg-muted rounded-full mb-6">
                <Search className="w-12 h-12 text-muted-foreground opacity-20" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("projects_no_results")}</h3>
              <p className="text-muted-foreground">{t("projects_no_results_desc")}</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
