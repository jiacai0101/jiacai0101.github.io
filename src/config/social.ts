import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
    {
        name: "Github",
        href: "https://github.com/jiacai0101",
        linkTitle: `Jiacai Yi on GitHub`,
        isActive: true,
    },
    {
        name: "Mail",
        href: "mailto:yjc0101@hkbu.edu.hk",
        linkTitle: `Email Jiacai Yi`,
        isActive: true,
    },
    {
        name: "Google Scholar",
        href: "https://scholar.google.com.hk/citations?user=jkrVys8AAAAJ",
        linkTitle: `Jiacai Yi on Google Scholar`,
        isActive: true,
    },
    {
        name: "ORCID",
        href: "https://orcid.org/0000-0001-6823-1882",
        linkTitle: `Jiacai Yi on ORCID`,
        isActive: true,
    },
    {
        name: "ResearchGate",
        href: "https://www.researchgate.net/profile/Jiacai-Yi",
        linkTitle: `Jiacai Yi on ResearchGate`,
        isActive: true,
    },
    {
        name: "Twitter",
        href: "https://x.com/MindDanceX",
        linkTitle: `Jiacai Yi on X`,
        isActive: true,
    },
    {
        name: "Bilibili",
        href: "https://space.bilibili.com/99441269",
        linkTitle: `Jiacai Yi on Bilibili`,
        isActive: true,
    },
];

export const SOCIAL_ICONS: Record<string, string> = {
    Github: "Github",
    Mail: "Mail",
    Linkedin: "LinkedIn",
    "Google Scholar": "GoogleScholar",
    ORCID: "ORCID",
    ResearchGate: "ResearchGate",
    Twitter: "Twitter",
    Bilibili: "Bilibili",
    WeChat: "WeChat",
    RSS: "RSS",
};
