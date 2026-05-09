import * as React from "react";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, ChevronDown, ExternalLink } from "lucide-react";

interface ExperienceItem {
  id: number;
  titleKey: string;
  roleKey: string;
  dateKey: string;
  descKey: string;
  link?: string;
  highlights?: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    titleKey: "exp_freelance_title",
    roleKey: "exp_freelance_role",
    dateKey: "exp_freelance_date",
    descKey: "exp_freelance_desc",
    link: "https://www.facebook.com/pokertalkth",
    highlights: ["exp_freelance_h1", "exp_freelance_h2", "exp_freelance_h3"],
  },
  {
    id: 2,
    titleKey: "internship_company",
    roleKey: "internship_role",
    dateKey: "internship_date",
    descKey: "internship_desc",
    link: "https://origin.co.th/",
    highlights: ["internship_h1", "internship_h2", "internship_h3"],
  },
];

export default function Experience() {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12"
        >
          <div className="p-2 md:p-3 bg-muted rounded-xl border border-border shadow-sm">
            <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            {t("exp_title")}
          </h2>
        </motion.div>

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div
                onClick={() => toggleExpand(exp.id)}
                className={`cursor-pointer p-5 md:p-8 rounded-2xl md:rounded-3xl border transition-all duration-300 ${
                  expandedId === exp.id
                    ? "bg-muted/50 border-primary/30 shadow-lg"
                    : "bg-muted/20 border-border hover:border-primary/30 hover:bg-muted/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2 md:gap-4">
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-lg md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors truncate sm:whitespace-normal">
                        {t(exp.titleKey)}
                      </h3>
                      <span className="inline-block self-start px-2 py-0.5 bg-background border border-border rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                        {t(exp.dateKey)}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground font-medium">{t(exp.roleKey)}</p>
                  </div>
                  <div className={`mt-1 md:mt-2 transition-transform duration-300 shrink-0 ${expandedId === exp.id ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === exp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-border">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                          <div className="flex-grow">
                            <p className="text-muted-foreground leading-relaxed max-w-3xl">
                              {t(exp.descKey)}
                            </p>
                          </div>
                          {exp.link && (
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-medium hover:bg-primary/20 transition-colors shrink-0"
                            >
                              {t("project_detail_visit")}
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        
                        {exp.highlights && (
                          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {exp.highlights.map((highlightKey, hIndex) => (
                              <div key={hIndex} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                <p className="text-sm text-muted-foreground">{t(highlightKey)}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
