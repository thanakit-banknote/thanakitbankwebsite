import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../components/LanguageProvider";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ExternalLink, Calendar, User, Tag, ArrowRight, X, ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon } from "lucide-react";
import Navbar from "../components/Navbar";

interface ProjectDetail {
  id: number;
  titleKey: string;
  fullDescKey: string;
  image: string;
  gallery: string[];
  tags: string[];
  category: string;
  clientKey: string;
  year: string;
  link?: string;
}

const projectDetails: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    titleKey: "project_1_title",
    fullDescKey: "project_1_full_desc",
    image: "https://img1.pic.in.th/images/Untitled-30fd7b0e8747a3ca5.jpg",
    gallery: [
      "https://img2.pic.in.th/Untitled-1e2649124555c5af3.jpg", // 0: Interview
      "https://img1.pic.in.th/images/Untitled-2cf4f4c361a1aabd2.jpg", // 1: PS & AI
      "https://img1.pic.in.th/images/Untitled-30fd7b0e8747a3ca5.jpg", // 2: Content (Storyboard)
      "https://img2.pic.in.th/Untitled-4f7487fab3b3db0eb.jpg", // 3: Content (Schedule)
      "https://img2.pic.in.th/Untitled-54affcf3f15a5ba7d.jpg", // 4: Report
      "https://img2.pic.in.th/Untitled-693e5ee5843424828.jpg", // 5: Meme
      "https://img1.pic.in.th/images/Untitled-9.jpg", // 6: News
      "https://img1.pic.in.th/images/Untitled-7.jpg", // 7: Tips
      "https://img1.pic.in.th/images/Untitled-83.jpg" // 8: Scale
    ],
    tags: ["Photoshop", "Premiere Pro", "Management"],
    category: "Marketing",
    clientKey: "POKERTALK TEAM",
    year: "2024",
    link: "https://www.thailandexhibition.com/",
  },
  2: {
    id: 2,
    titleKey: "project_2_title",
    fullDescKey: "project_2_full_desc",
    image: "https://img1.pic.in.th/images/625934-POKER-TOURNAMENT-PATTAYA-3-1.md.jpg",
    gallery: [
      "https://img1.pic.in.th/images/625934-POKER-TOURNAMENT-PATTAYA-3-1.md.jpg",
      "https://img1.pic.in.th/images/15-copy.md.jpg",
      "https://img2.pic.in.th/17-copy.md.jpg",
      "https://img1.pic.in.th/images/18-copy.md.jpg",
      "https://img2.pic.in.th/19-copy.md.jpg",
      "https://img2.pic.in.th/20-copy.md.jpg",
      "https://img2.pic.in.th/21-copy.md.jpg",
      "https://img2.pic.in.th/22-copy.md.jpg",
      "https://img1.pic.in.th/images/23-copy.md.jpg",
      "https://img1.pic.in.th/images/24-copy.md.jpg",
      "https://img1.pic.in.th/images/25-copy.md.jpg",
      "https://img2.pic.in.th/26-copy7d14b5e22bc4a735.md.jpg",
      "https://img1.pic.in.th/images/27-copy.md.jpg",
      "https://img2.pic.in.th/28-copy.md.jpg",
      "https://img1.pic.in.th/images/29-copy.md.jpg",
      "https://img2.pic.in.th/30-copy61dfb91f2c4ea7a6.md.jpg",
      "https://img1.pic.in.th/images/31-copy.md.jpg",
      "https://img2.pic.in.th/625934-POKER-TOURNAMENT-PATTAYA-7-5795f047b9733dd78.jpg",
    ],
    tags: ["AutoCAD", "SketchUp", "V-Ray"],
    category: "Architecture",
    clientKey: "Entertainment Complex",
    year: "2023",
    link: "https://example.com/project-2",
  },
  3: {
    id: 3,
    titleKey: "project_3_title",
    fullDescKey: "project_3_full_desc",
    image: "https://img1.pic.in.th/images/CROP-PNG81e61ff7dfcd4b80.png",
    gallery: [
      "https://img1.pic.in.th/images/1daf557488cb54aa1.jpg",
      "https://img1.pic.in.th/images/2e6154588b2f70de3.jpg",
      "https://img1.pic.in.th/images/Untitled-3-copy98b3f33898ec85d8.jpg",
      "https://img1.pic.in.th/images/Untitled-1-Recovered-Recovered-Recovered-Recovered-copybea9489298ca4235.jpg",
      "https://img2.pic.in.th/LANDSCAPE-copy7d79835a77d84ff4.jpg",
      "https://img1.pic.in.th/images/INTERIOR-copyca3b8ed64a50e701.jpg",
      "https://img1.pic.in.th/images/messageImage_16944992332379a87c743590c92a8.jpg",
    ],
    tags: ["Architecture", "Interior", "Design", "AutoCAD", "SketchUp"],
    category: "Architecture",
    clientKey: "ORIGIN",
    year: "2022",
    link: "https://origin.co.th/",
  },
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const project = projectDetails[Number(id)];
  
  const [selectedImgIndex, setSelectedImgIndex] = React.useState<number | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <button 
            onClick={() => navigate("/projects")}
            className="text-primary hover:underline"
          >
            Back to all projects
          </button>
        </div>
      </div>
    );
  }

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImgIndex !== null) {
      setSelectedImgIndex((selectedImgIndex + 1) % project.gallery.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImgIndex !== null) {
      setSelectedImgIndex((selectedImgIndex - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumbs / Back */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              {t("project_detail_back")}
            </button>
          </motion.div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                {project.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
                {t(project.titleKey)}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                {t(project.fullDescKey)}
              </p>

              {/* Project Meta */}
              <div className="grid grid-cols-2 gap-8 py-8 border-y border-border">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t("project_detail_year")}</span>
                  </div>
                  <p className="font-medium">{project.year}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Tag className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t("project_detail_category")}</span>
                  </div>
                  <p className="font-medium">{project.category}</p>
                </div>
                {project.link && (
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Link</span>
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                      {t("project_detail_visit")}
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Tools */}
              <div className="mt-10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  {t("project_detail_tools")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-4 py-1.5 bg-muted rounded-full text-xs font-medium border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-2xl group cursor-zoom-in"
              onClick={() => {
                // Main image click handling if needed
              }}
            >
              <img 
                src={project.image} 
                alt={t(project.titleKey)} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Gallery Section */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-4">{t("project_detail_gallery")}</h2>
              <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
            </motion.div>

            {/* Custom sections for project 1 (THAILAND EXHIBITION) */}
            {project.id === 1 ? (
              <div className="space-y-16">
                {/* Section: Interview */}
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3 text-foreground">
                    <span className="w-8 h-px bg-primary" />
                    {t("work_section_interview")}
                  </h3>
                  <p className="text-muted-foreground mb-8 pl-11">
                    {t("work_section_interview_desc")}
                  </p>
                  <div className="grid grid-cols-1 gap-8">
                    <ProjectGalleryItem 
                      img={project.gallery[0]} 
                      index={0} 
                      title={t(project.titleKey)} 
                      onClick={() => setSelectedImgIndex(0)}
                      linkTo="/works/2"
                      linkLabel={t("work_view_more")}
                    />
                  </div>
                </div>

                {/* Section: PS & AI */}
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3 text-foreground">
                    <span className="w-8 h-px bg-primary" />
                    {t("work_section_ps_ai")}
                  </h3>
                  <p className="text-muted-foreground mb-8 pl-11">
                    {t("work_section_ps_ai_desc")}
                  </p>
                  <div className="grid grid-cols-1 gap-8">
                    <ProjectGalleryItem img={project.gallery[1]} index={1} title={t(project.titleKey)} onClick={() => setSelectedImgIndex(1)} />
                  </div>
                </div>

                {/* Section: Content Creator */}
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3 text-foreground">
                    <span className="w-8 h-px bg-primary" />
                    {t("work_section_content")}
                  </h3>
                  <p className="text-muted-foreground mb-8 pl-11">
                    {t("work_section_content_desc")}
                  </p>
                  <div className="grid grid-cols-1 gap-8">
                    <ProjectGalleryItem 
                      img={project.gallery[2]} 
                      index={2} 
                      title={t(project.titleKey)} 
                      onClick={() => setSelectedImgIndex(2)}
                      linkTo="/works/1"
                      linkLabel={t("work_view_more")}
                    />
                    <ProjectGalleryItem 
                      img={project.gallery[3]} 
                      index={3} 
                      title={t(project.titleKey)} 
                      onClick={() => setSelectedImgIndex(3)}
                      linkTo="/works/1"
                      linkLabel={t("work_view_more")}
                    />
                  </div>
                </div>

                {/* Section: Report */}
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3 text-foreground">
                    <span className="w-8 h-px bg-primary" />
                    {t("work_section_report")}
                  </h3>
                  <p className="text-muted-foreground mb-8 pl-11">
                    {t("work_section_report_desc")}
                  </p>
                  <div className="grid grid-cols-1 gap-8">
                    <ProjectGalleryItem 
                      img={project.gallery[4]} 
                      index={4} 
                      title={t(project.titleKey)} 
                      onClick={() => setSelectedImgIndex(4)}
                      linkTo="/works/3"
                      linkLabel={t("work_view_more")}
                    />
                  </div>
                </div>

                {/* Other Sections Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Meme */}
                  <div>
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-foreground">
                      <span className="w-6 h-px bg-primary" />
                      {t("work_section_meme")}
                    </h3>
                    <ProjectGalleryItem img={project.gallery[5]} index={5} title={t(project.titleKey)} onClick={() => setSelectedImgIndex(5)} />
                  </div>

                  {/* News */}
                  <div>
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-foreground">
                      <span className="w-6 h-px bg-primary" />
                      {t("work_section_news")}
                    </h3>
                    <ProjectGalleryItem img={project.gallery[6]} index={6} title={t(project.titleKey)} onClick={() => setSelectedImgIndex(6)} />
                  </div>

                  {/* Tips */}
                  <div>
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-foreground">
                      <span className="w-6 h-px bg-primary" />
                      {t("work_section_tips")}
                    </h3>
                    <ProjectGalleryItem img={project.gallery[7]} index={7} title={t(project.titleKey)} onClick={() => setSelectedImgIndex(7)} />
                  </div>

                  {/* Scale */}
                  <div>
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-foreground">
                      <span className="w-6 h-px bg-primary" />
                      {t("work_section_scale")}
                    </h3>
                    <ProjectGalleryItem img={project.gallery[8]} index={8} title={t(project.titleKey)} onClick={() => setSelectedImgIndex(8)} />
                  </div>
                </div>
              </div>
            ) : project.id === 3 ? (
              <div className="space-y-16">
                <div>
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-8 h-px bg-primary" />
                    {language === "TH" ? "ขนาดสเกล" : "Scale"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.gallery.slice(0, 2).map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden border border-border group cursor-zoom-in relative aspect-[4/3]"
                        onClick={() => setSelectedImgIndex(index)}
                      >
                        <img 
                          src={img} 
                          alt={`Gallery ${index}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                             <ArrowRight className="w-6 h-6 text-white rotate-[-45deg]" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-8 h-px bg-primary" />
                    {language === "TH" ? "ดีไซน์" : "Design"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.gallery.slice(2, 6).map((img, index) => (
                      <motion.div
                        key={index + 2}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index + 2) * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden border border-border group cursor-zoom-in relative aspect-[4/3]"
                        onClick={() => setSelectedImgIndex(index + 2)}
                      >
                        <img 
                          src={img} 
                          alt={`Gallery ${index + 2}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                             <ArrowRight className="w-6 h-6 text-white rotate-[-45deg]" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {project.gallery.length > 6 && (
                  <div className="pt-8">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                      <span className="w-8 h-px bg-primary" />
                      {t("work_6_key_section")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 6 * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden border border-border group cursor-zoom-in relative md:col-span-2 aspect-[21/9]"
                        onClick={() => setSelectedImgIndex(6)}
                      >
                        <img 
                          src={project.gallery[6]} 
                          alt="Gallery 6" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                             <ArrowRight className="w-6 h-6 text-white rotate-[-45deg]" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            ) : project.id === 2 ? (
              <div className="space-y-16">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.gallery.slice(0, -1).map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`rounded-3xl overflow-hidden border border-border group cursor-zoom-in relative ${
                          index === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                        }`}
                        onClick={() => setSelectedImgIndex(index)}
                      >
                        <img 
                          src={img} 
                          alt={`Gallery ${index}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                             <ArrowRight className="w-6 h-6 text-white rotate-[-45deg]" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Section: LAW */}
                <div className="pt-8">
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-8 h-px bg-primary" />
                    {t("work_section_law")}
                  </h3>
                  <div className="grid grid-cols-1 gap-8">
                    <ProjectGalleryItem 
                      img={project.gallery[project.gallery.length - 1]} 
                      index={project.gallery.length - 1} 
                      title={t(project.titleKey)} 
                      onClick={() => setSelectedImgIndex(project.gallery.length - 1)} 
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`rounded-3xl overflow-hidden border border-border group cursor-zoom-in relative ${
                      index === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                    }`}
                    onClick={() => setSelectedImgIndex(index)}
                  >
                    <img 
                      src={img} 
                      alt={`Gallery ${index}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                         <ArrowRight className="w-6 h-6 text-white rotate-[-45deg]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImgIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImgIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-[110]"
              onClick={() => setSelectedImgIndex(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button 
              className="absolute left-4 md:left-10 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[110] bg-black/20 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeftIcon className="w-12 h-12" />
            </button>

            <button 
              className="absolute right-4 md:right-10 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[110] bg-black/20 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRightIcon className="w-12 h-12" />
            </button>

            <motion.div
              key={selectedImgIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative p-4 md:p-8 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={project.gallery[selectedImgIndex]} 
                alt={`Gallery detail ${selectedImgIndex}`}
                className="max-w-[92vw] max-h-[88vh] md:max-w-[1400px] md:max-h-[92vh] object-contain rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.6)] select-none transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Image Counter */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2 bg-black/40 backdrop-blur-xl rounded-full text-white/90 text-xs font-bold tracking-[0.25em] uppercase border border-white/10 z-[120]">
                {selectedImgIndex + 1} / {project.gallery.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectGalleryItem({ 
  img, 
  index, 
  title, 
  onClick, 
  linkTo, 
  linkLabel 
}: { 
  img: string; 
  index: number; 
  title: string; 
  onClick: () => void;
  linkTo?: string;
  linkLabel?: string;
}) {
  return (
    <div className="relative group">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="rounded-[2.5rem] overflow-hidden border border-border shadow-2xl cursor-zoom-in relative aspect-video"
        onClick={onClick}
      >
        <img 
          src={img} 
          alt={`${title} gallery ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="p-5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
             <ArrowRight className="w-8 h-8 text-white rotate-[-45deg]" />
          </div>
        </div>
      </motion.div>
      
      {linkTo && (
        <div className="mt-4 flex justify-end">
          <Link 
            to={linkTo}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
          >
            {linkLabel || "View More"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
