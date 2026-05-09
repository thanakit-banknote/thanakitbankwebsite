import * as React from "react";
import { useLanguage } from "./LanguageProvider";
import { motion } from "motion/react";
import { User, Layout, GraduationCap } from "lucide-react";

const skills = [
  "AutoCAD",
  "SketchUp",
  "Photoshop",
  "Illustrator",
  "InDesign",
  "Premiere Pro",
  "After Effects",
  "Content Strategy",
  "UI/UX Design",
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] sm:aspect-square rounded-2xl md:rounded-3xl overflow-hidden group order-2 lg:order-1"
          >
            <img
              src="https://img2.pic.in.th/DWUSE5150.jpg"
              alt="About Thanakit"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </motion.div>

          {/* Right: Content */}
          <div className="flex flex-col space-y-6 md:space-y-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="p-1.5 md:p-2 bg-muted rounded-lg border border-border">
                <User className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                {t("about_title")}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              {t("about_desc")}
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="p-4 md:p-6 bg-muted/50 rounded-xl md:rounded-2xl border border-border hover:border-primary/50 transition-colors"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {t("about_exp_years")}
                </h3>
                <p className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-wider">
                  {t("about_exp_label")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="p-4 md:p-6 bg-muted/50 rounded-xl md:rounded-2xl border border-border hover:border-primary/50 transition-colors"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {t("about_projects_count")}
                </h3>
                <p className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-wider">
                  {t("about_projects_label")}
                </p>
              </motion.div>
            </div>

            {/* Skills Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 md:px-4 py-1 md:py-1.5 bg-muted border border-border rounded-full text-[10px] md:text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-20 md:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6 md:mb-10"
          >
            <div className="p-1.5 md:p-2 bg-muted rounded-lg border border-border">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {t("education_title")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 rounded-2xl md:rounded-3xl overflow-hidden border border-border bg-muted/30"
          >
            {/* Left side: Date/Uni Info */}
            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center bg-muted/50 border-b lg:border-b-0 lg:border-r border-border">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-background rounded-full flex items-center justify-center mb-4 md:6 shadow-inner border border-border">
                <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{t("education_date")}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{t("education_university")}</p>
            </div>

            {/* Right side: Degree & Details */}
            <div className="p-8 md:p-12 lg:col-span-2 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary">{t("education_degree")}</h3>
              <p className="text-base md:text-lg text-foreground font-medium mb-3 md:mb-4">
                {t("education_university")}
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t("education_desc")}
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
