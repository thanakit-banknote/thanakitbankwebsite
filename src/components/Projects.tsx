import * as React from "react";
import { useLanguage } from "./LanguageProvider";
import { motion } from "motion/react";
import { ChevronRight, ExternalLink, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: number;
  titleKey: string;
  descKey: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    titleKey: "project_1_title",
    descKey: "project_1_desc",
    image: "https://img1.pic.in.th/images/EMS_NIGHT.png",
    tags: ["Photoshop", "Premiere Pro", "Management"],
  },
  {
    id: 2,
    titleKey: "project_2_title",
    descKey: "project_2_desc",
    image: "https://img1.pic.in.th/images/625934-POKER-TOURNAMENT-PATTAYA-3-1.md.jpg",
    tags: ["AutoCAD", "SketchUp", "V-Ray"],
  },
  {
    id: 3,
    titleKey: "project_3_title",
    descKey: "project_3_desc",
    image: "https://img1.pic.in.th/images/CROP-PNG81e61ff7dfcd4b80.png",
    tags: ["Architecture", "Interior", "Design", "AutoCAD", "SketchUp"],
  },
];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="p-3 bg-muted rounded-xl border border-border shadow-sm">
              <FolderKanban className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {t("projects_title")}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/projects"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline group"
            >
              {t("projects_view_all")}
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group flex flex-col bg-muted/30 rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={t(project.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                    {t(project.descKey)}
                  </p>
                  
                  {/* Tags */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-background border border-border rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
