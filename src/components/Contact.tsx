import * as React from "react";
import { useLanguage } from "./LanguageProvider";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();
  const email = "banknote.thanakit@gmail.com";

  return (
    <section className="py-24 bg-background text-foreground dark:bg-zinc-950 dark:text-white overflow-hidden relative transition-colors duration-300">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 z-0 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              {t("contact_title_1")}<br />
              <span className="text-primary">{t("contact_title_2")}</span>
            </h2>
            
            <p className="text-muted-foreground dark:text-zinc-400 text-lg md:text-xl max-w-md mb-12 leading-relaxed">
              {t("contact_desc")}
            </p>

            {/* Social Icons - Only Email */}
            <div className="flex gap-4">
              <a 
                href={`mailto:${email}`}
                className="w-16 h-16 rounded-full border border-border dark:border-zinc-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-500 group cursor-pointer"
              >
                <Mail className="w-6 h-6 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            {/* Contact Details */}
            <div className="p-8 md:p-12 bg-muted/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-[3rem] border border-border dark:border-zinc-800/50">
              <p className="text-primary text-xs font-bold uppercase tracking-[0.4em] mb-8">
                {t("contact_details_label")}
              </p>
              <a 
                href={`mailto:${email}`}
                className="text-2xl md:text-4xl font-bold hover:text-primary transition-colors block mb-6 break-all leading-tight"
              >
                {email}
              </a>
              <div className="flex items-center gap-3 text-muted-foreground dark:text-zinc-500 font-medium">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{t("contact_location")}</span>
              </div>
            </div>

            {/* Current Status */}
            <div className="px-8 md:px-12">
              <p className="text-muted-foreground dark:text-zinc-500 text-xs font-bold uppercase tracking-[0.4em] mb-6">
                {t("contact_status_label")}
              </p>
              <div className="flex items-center gap-4">
                <div className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                </div>
                <span className="text-xl md:text-2xl font-bold text-foreground dark:text-zinc-100">
                  {t("contact_status_value")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
