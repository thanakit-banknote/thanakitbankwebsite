const isDark = theme === "dark";

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
