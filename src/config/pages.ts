import type { PagesConfig } from "../types";

export const PAGES: PagesConfig = {
    home: {
        title: "Jiacai Yi",
        subtitle: "",
        isActive: true,
    },
    blog: {
        title: "Blog",
        subtitle: "Notes on AI-enabled drug design, molecular modeling, and scientific platforms.",
        isActive: true,
    },
    publications: {
        title: "Publications",
        subtitle: "Peer-reviewed research on AI for drug discovery, ADMET prediction, and bioinformatics.",
        isActive: true,
    },
    talks: {
        title: "Talks & Presentations",
        subtitle: "Invited talks, conference presentations, and training lectures.",
        isActive: false,
    },
    projects: {
        title: "Projects & Platforms",
        subtitle: "Open scientific tools and platforms for AI-driven drug design.",
        isActive: true,
    },
    tags: {
        title: "Tags",
        subtitle: "Explore content by topic.",
        isActive: true,
    },
    cv: {
        title: "Curriculum Vitae",
        subtitle: "Academic and professional history.",
        isActive: true,
    },
};
