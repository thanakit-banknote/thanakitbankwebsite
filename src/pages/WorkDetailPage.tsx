import * as React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../components/LanguageProvider";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Calendar, Tag, Wrench, X, ChevronLeft, ChevronRight, ArrowRight, PlayCircle, ExternalLink } from "lucide-react";
import { worksData } from "../constants/works";
import Navbar from "../components/Navbar";

export default function WorkDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const work = worksData.find((w) => w.id === Number(id));
  const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!work) {
      navigate("/works");
      return;
    }

    if (work.tiktokLinks && work.tiktokLinks.length > 0) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [work, navigate]);

  if (!work) return null;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImgIndex !== null) {
      setSelectedImgIndex((selectedImgIndex + 1) % work.gallery.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImgIndex !== null) {
      setSelectedImgIndex((selectedImgIndex - 1 + work.gallery.length) % work.gallery.length);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-kanit relative">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t("project_detail_back")}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                    {work.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                  {work.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                  {t(work.descriptionKey)}
                </p>

                {/* Gallery */}
                <div className="space-y-12">
                  <h2 className="text-2xl font-bold tracking-tight mb-8">
                    {t("project_detail_gallery")}
                  </h2>

                  {work.youtubeUrl && work.id !== 4 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="rounded-[2.5rem] overflow-hidden border border-border shadow-2xl aspect-video mb-12"
                    >
                      <iframe
                        src={work.youtubeUrl}
                        title={`${work.title} presentation`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </motion.div>
                  )}
                  
                  {work.id === 6 ? (
                    <div className="grid grid-cols-1 gap-8">
                      {work.gallery.map((img, index) => (
                        <WorkGalleryItem key={index} img={img} index={index} title={work.title} onClick={() => setSelectedImgIndex(index)} />
                      ))}
                    </div>
                  ) : work.id === 1 ? (
                    <div className="space-y-16">
                      {/* LAW Section */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                          <span className="w-8 h-px bg-primary" />
                          {t("work_section_law")}
                        </h3>
                        <p className="text-muted-foreground mb-8 pl-11">
                          {t("work_section_law_desc")}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {work.gallery.slice(0, 1).map((img, index) => (
                            <WorkGalleryItem key={index} img={img} index={index} title={work.title} onClick={() => setSelectedImgIndex(index)} />
                          ))}
                        </div>
                      </div>

                      {/* Content Creator & Storyboard Section */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                          <span className="w-8 h-px bg-primary" />
                          {t("work_section_content")}
                        </h3>
                        <p className="text-muted-foreground mb-8 pl-11">
                          {t("work_section_content_desc")}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {work.gallery.slice(1, 3).map((img, index) => (
                            <WorkGalleryItem key={index + 1} img={img} index={index + 1} title={work.title} onClick={() => setSelectedImgIndex(index + 1)} />
                          ))}
                        </div>
                      </div>

                      {/* MEME Section */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                          <span className="w-8 h-px bg-primary" />
                          {t("work_section_meme")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {work.gallery.slice(3, 5).map((img, index) => (
                            <WorkGalleryItem key={index + 3} img={img} index={index + 3} title={work.title} onClick={() => setSelectedImgIndex(index + 3)} />
                          ))}
                        </div>
                      </div>
                      
                      {/* NEWS Section */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                          <span className="w-8 h-px bg-primary" />
                          {t("work_section_news")}
                        </h3>
                        <div className="grid grid-cols-1 gap-8">
                          <WorkGalleryItem img={work.gallery[5]} index={5} title={work.title} onClick={() => setSelectedImgIndex(5)} />
                        </div>
                      </div>

                      {/* TIPS Section */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                          <span className="w-8 h-px bg-primary" />
                          {t("work_section_tips")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {work.gallery.slice(6, 9).map((img, index) => (
                            <WorkGalleryItem key={index + 6} img={img} index={index + 6} title={work.title} onClick={() => setSelectedImgIndex(index + 6)} />
                          ))}
                        </div>
                      </div>

                      {/* SCALE Section */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                          <span className="w-8 h-px bg-primary" />
                          {t("work_section_scale")}
                        </h3>
                        <div className="grid grid-cols-1 gap-8">
                          <WorkGalleryItem img={work.gallery[9]} index={9} title={work.title} onClick={() => setSelectedImgIndex(9)} />
                        </div>
                      </div>
                    </div>
                  ) : work.id === 3 ? (
                    <div className="space-y-16">
                      {/* Content Creator Section */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                          <span className="w-8 h-px bg-primary" />
                          {t("work_section_content")}
                        </h3>
                        <p className="text-muted-foreground mb-8 pl-11">
                          {t("work_section_content_desc")}
                        </p>
                        <div className="grid grid-cols-1 gap-8">
                          {work.gallery.slice(0, 2).map((img, index) => (
                            <WorkGalleryItem key={index} img={img} index={index} title={work.title} onClick={() => setSelectedImgIndex(index)} />
                          ))}
                        </div>
                      </div>
                      
                      {/* Report Section */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                          <span className="w-8 h-px bg-primary" />
                          {t("work_section_report")}
                        </h3>
                        <p className="text-muted-foreground mb-8 pl-11">
                          {t("work_section_report_desc")}
                        </p>
                        <div className="grid grid-cols-1 gap-8">
                          {work.gallery.slice(2).map((img, index) => (
                            <WorkGalleryItem key={index + 2} img={img} index={index + 2} title={work.title} onClick={() => setSelectedImgIndex(index + 2)} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : work.id === 2 ? (
                    <div className="space-y-12">
                      {work.gallery.map((img, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <WorkGalleryItem 
                            img={img} 
                            index={index} 
                            title={work.title} 
                            onClick={() => setSelectedImgIndex(index)} 
                          />
                          {work.videoLinks?.[index] && (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="h-full flex flex-col justify-center p-8 bg-muted/30 rounded-[2.5rem] border border-border"
                            >
                              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <PlayCircle className="w-6 h-6 text-primary" />
                                {t("work_video_title") || "Reference Video"}
                              </h4>
                              <p className="text-muted-foreground mb-8">
                                {t("work_video_desc") || "View the production result and interview session on Google Drive."}
                              </p>
                              <a 
                                href={work.videoLinks[index]} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
                              >
                                {t("work_video_button") || "WATCH VIDEO"}
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-8">
                      {work.gallery.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="rounded-[2.5rem] overflow-hidden border border-border shadow-2xl cursor-zoom-in group relative"
                          onClick={() => setSelectedImgIndex(index)}
                        >
                          <img 
                            src={img} 
                            alt={`${work.title} gallery ${index + 1}`}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="p-5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                               <ArrowRight className="w-8 h-8 text-white rotate-[-45deg]" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {work.youtubeUrl && work.id === 4 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="rounded-[2.5rem] overflow-hidden border border-border shadow-2xl aspect-video mt-12"
                    >
                      <iframe
                        src={work.youtubeUrl}
                        title={`${work.title} presentation`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </motion.div>
                  )}

                  {work.tiktokLinks && work.tiktokLinks.length > 0 && (
                    <div className="mt-16 space-y-12">
                      <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-center gap-3">
                        <span className="w-8 h-px bg-primary" />
                        {t("work_video_title") || "Reference Video"}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {work.tiktokLinks.map((link, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="w-full flex justify-center"
                          >
                            <blockquote 
                              className="tiktok-embed" 
                              cite={link} 
                              data-video-id={link.split("/").pop()}
                              style={{ maxWidth: "605px", minWidth: "325px" }}
                            >
                              <section></section>
                            </blockquote>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right: Sidebar Info */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-32 space-y-8"
              >
                <div className="p-10 bg-muted/30 rounded-[2.5rem] border border-border">
                  <h3 className="text-xl font-bold mb-8 pb-6 border-b border-border">
                    {t("works_info_title")}
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-background rounded-xl border border-border">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                          {t("project_detail_year")}
                        </p>
                        <p className="text-lg font-medium">{work.year}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-background rounded-xl border border-border">
                        <Tag className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                          {t("project_detail_category")}
                        </p>
                        <p className="text-lg font-medium">{work.category}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-background rounded-xl border border-border">
                        <Wrench className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                          {t("project_detail_tools")}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {work.tools.map((tool) => (
                            <span 
                              key={tool}
                              className="px-3 py-1 bg-background border border-border rounded-full text-xs font-medium"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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
              <ChevronLeft className="w-12 h-12" />
            </button>

            <button 
              className="absolute right-4 md:right-10 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[110] bg-black/20 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="w-12 h-12" />
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
                src={work.gallery[selectedImgIndex]} 
                alt={`${work.title} gallery detail ${selectedImgIndex + 1}`}
                className="max-w-[92vw] max-h-[88vh] md:max-w-[1400px] md:max-h-[92vh] object-contain rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.6)] select-none transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Image Counter */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2 bg-black/40 backdrop-blur-xl rounded-full text-white/90 text-xs font-bold tracking-[0.25em] uppercase border border-white/10 z-[120]">
                {selectedImgIndex + 1} / {work.gallery.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WorkGalleryItem({ 
  img, 
  index, 
  title, 
  onClick, 
  linkTo, 
  linkLabel 
}: { 
  key?: React.Key;
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
        className="rounded-[2.5rem] overflow-hidden border border-border shadow-2xl cursor-zoom-in relative"
        onClick={onClick}
      >
        <img 
          src={img} 
          alt={`${title} gallery ${index + 1}`}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
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
