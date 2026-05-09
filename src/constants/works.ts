export interface WorkItem {
  id: number;
  category: "Design" | "Vdo" | "Marketing";
  image: string;
  title: string;
  descriptionKey: string;
  client: string;
  year: string;
  tools: string[];
  gallery: string[];
  videoLinks?: string[];
  youtubeUrl?: string;
  tiktokLinks?: string[];
}

export const worksData: WorkItem[] = [
  { 
    id: 1, 
    category: "Design", 
    image: "https://img2.pic.in.th/AW_WPT-Prime-thailand25_6F_Venue-Map_CRE-03.png", 
    title: "Graphic Design & Content Creator",
    descriptionKey: "work_1_desc",
    client: "THAILAND EXHIBITION",
    year: "2024",
    tools: ["Photoshop", "Management", "Content Strategy"],
    gallery: [
        "https://img2.pic.in.th/3807eb918d32ef16796635ffa176da90.jpg", // LAW (index 0)
        "https://img1.pic.in.th/images/Untitled-30fd7b0e8747a3ca5.jpg", // Storyboard 1 (index 2)
        "https://img2.pic.in.th/Untitled-4f7487fab3b3db0eb.jpg", // Storyboard 2 (index 3)
        "https://img2.pic.in.th/Untitled-693e5ee5843424828.jpg", // MEME 1 (index 4)
        "https://img2.pic.in.th/514096494_1244996780969901_4700945154043922374_n-copy.jpg", // MEME 2 (index 5)
        "https://img1.pic.in.th/images/Untitled-9.jpg", // NEWS (index 6)
        "https://img1.pic.in.th/images/Untitled-7.jpg", // TIPS 1 (index 7)
        "https://img1.pic.in.th/images/aaaa-100.jpg", // TIPS 2 (index 8)
        "https://img1.pic.in.th/images/Artboaraaaad-7-100.jpg", // TIPS 3 (index 9)
        "https://img1.pic.in.th/images/Untitled-83.jpg"  // SCALE (index 10)
    ]
  },
  { 
    id: 2, 
    category: "Vdo", 
    image: "https://img1.pic.in.th/images/Cover-FAQ-Part1.png", 
    title: "Interview",
    descriptionKey: "work_2_desc",
    client: "THAILAND EXHIBITION",
    year: "2024",
    tools: ["Briefing", "Camera Direction", "Interviewing"],
    gallery: [
        "https://img2.pic.in.th/zofirst.jpg",
        "https://img1.pic.in.th/images/INWZEE-1.png",
        "https://img2.pic.in.th/sian-ws_.png"
    ],
    videoLinks: [
        "https://drive.google.com/drive/folders/1ViiPoF8XPdACxPRPhFtz7uzj-gdpFi_T",
        "https://drive.google.com/drive/folders/1ViiPoF8XPdACxPRPhFtz7uzj-gdpFi_T",
        "https://drive.google.com/drive/folders/1ViiPoF8XPdACxPRPhFtz7uzj-gdpFi_T"
    ],
    tiktokLinks: [
        "https://www.tiktok.com/@user1/video/111111111",
        "https://www.tiktok.com/@user2/video/222222222",
        "https://www.tiktok.com/@user3/video/333333333"
    ]
  },
  { 
    id: 3, 
    category: "Marketing", 
    image: "https://img1.pic.in.th/images/-WPT-Prime-Thailand-T-shirt-GIVEAWAY-CAMPAIGN-UNTIL-EVENT-copy95f32be1f1a8f724.jpg", 
    title: "Report",
    descriptionKey: "work_3_desc",
    client: "THAILAND EXHIBITION",
    year: "2024",
    tools: ["Management", "Analytics", "Report"],
    gallery: [
        "https://img1.pic.in.th/images/Untitled-30fd7b0e8747a3ca5.jpg",
        "https://img2.pic.in.th/Untitled-4f7487fab3b3db0eb.jpg",
        "https://img2.pic.in.th/Untitled-54affcf3f15a5ba7d.jpg"
    ]
  },
  { 
    id: 4, 
    category: "Vdo", 
    image: "https://img1.pic.in.th/images/Enscape_2023-09-07-17-35-4642629032b5756a9b.png", 
    title: "VDO Editor & Motion",
    descriptionKey: "work_4_desc",
    client: "Eco Systems",
    year: "2023",
    tools: ["Adobe Premiere Pro", "After Effects"],
    youtubeUrl: "https://www.youtube.com/embed/iQ9Lj3xON3I",
    gallery: [
        "https://img1.pic.in.th/images/updates-timeline.jpg",
        "https://img1.pic.in.th/images/pre1724e99b08f0310d.jpg"
    ]
  },
  { 
    id: 5, 
    category: "Design", 
    image: "https://img1.pic.in.th/images/Untitled-1f20e2cf2a5e39f7a.jpg", 
    title: "DESIGN 3D",
    descriptionKey: "work_5_desc",
    client: "Flow Digital",
    year: "2022",
    tools: ["Next.js", "Framer Motion"],
    youtubeUrl: "https://www.youtube.com/embed/afnfJyNFpWs?autoplay=1&mute=1&playlist=afnfJyNFpWs&loop=1",
    gallery: [
        "https://img1.pic.in.th/images/32-copy.md.jpg",
        "https://img2.pic.in.th/35-copy.md.jpg",
        "https://img2.pic.in.th/34-copy.md.jpg",
        "https://img2.pic.in.th/33-copy.md.jpg",
        "https://img2.pic.in.th/36-copy.md.jpg",
        "https://img2.pic.in.th/39-copy.md.jpg",
        "https://img1.pic.in.th/images/38-copy.md.jpg",
        "https://img1.pic.in.th/images/37-copy.md.jpg",
        "https://img1.pic.in.th/images/40-copy.md.jpg"
    ]
  },
  { 
    id: 6, 
    category: "Design", 
    image: "https://img2.pic.in.th/Enscape_2023-08-30-17-48-51c605f5dd0329ac18.png", 
    title: "Architecture ORIGIN",
    descriptionKey: "work_6_desc",
    client: "ORIGIN",
    year: "2023",
    tools: ["AutoCAD", "Photoshop"],
    gallery: [
        "https://img2.pic.in.th/1-copyeabb0a4b762af0c4.jpg",
        "https://img2.pic.in.th/3-copy9708019a1c42437b.jpg",
        "https://img2.pic.in.th/4-copyb8ebcc1af4124964.jpg",
        "https://img1.pic.in.th/images/5-copyaa915d4f95c7c6f8.jpg",
        "https://img1.pic.in.th/images/6-copy1f226ae9ab5dc65a.jpg",
        "https://img2.pic.in.th/7-copy1dca14937776187a.jpg",
        "https://img2.pic.in.th/8-copy13b8dbf5ae58aea8.jpg",
        "https://img1.pic.in.th/images/Brixton-Sriracha--Exterior-Signage-Location--18-08-2023-23d72844ed5d0ccf3a.jpg",
        "https://img2.pic.in.th/gen67305b308796031f.jpg",
        "https://img1.pic.in.th/images/sizefd27a44496d71a97.jpg",
        "https://img2.pic.in.th/Enscape_2023-08-30-17-48-51c605f5dd0329ac18.png"
    ]
  },
];
