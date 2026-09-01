export interface NewsItem {
    date: string;        // display date, e.g. "Apr 2026"
    sortDate: string;    // ISO for sorting
    badge: string;
    title: string;
    description: string;
    link?: { text: string; url: string };
}

// Migrated from TermHub content/news.json. Sorted newest-first at render time.
export const NEWS: NewsItem[] = [
    {
        date: "May 2026",
        sortDate: "2026-05-19",
        badge: "Paper",
        title:
            "DeepCYP: an integrated deep learning web server for the holistic “pathway–site–product” prediction of CYP450 metabolism",
        description:
            "Paper published in Nucleic Acids Research presenting DeepCYP, a deep learning web server that jointly predicts the metabolic pathway, site of metabolism, and resulting product for CYP450-mediated drug metabolism.",
        link: { text: "Paper", url: "/publications/nar2026-deepcyp" },
    },
    {
        date: "Apr 2026",
        sortDate: "2026-04-07",
        badge: "Release",
        title: "Launched MindDance AIDD Brief — a bilingual daily research briefing site",
        description:
            "Released AIDD Brief (brief.minddanceai.com), a bilingual (EN/ZH) daily briefing site covering AI-driven drug discovery, with automated paper fetching, LLM-powered scoring, and curated digests.",
        link: { text: "Visit", url: "https://brief.minddanceai.com" },
    },
    {
        date: "Mar 2026",
        sortDate: "2026-03-14",
        badge: "Paper",
        title: "Expert-Inspired Multi-Agent Coordination for Multi-Objective Molecular Optimization",
        description:
            "AAAI-26 paper introducing MAMO, a multi-agent molecular design framework in which specialized agents and a central scheduler balance conflicting optimization objectives.",
        link: { text: "Paper", url: "/publications/aaai2026-multiagent-molopt" },
    },
    {
        date: "Mar 2026",
        sortDate: "2026-03-01",
        badge: "Career",
        title: "Started postdoctoral research at Hong Kong Baptist University",
        description:
            "Joined the School of Chinese Medicine, Hong Kong Baptist University, as a postdoctoral researcher.",
    },
    {
        date: "Dec 2025",
        sortDate: "2025-12-08",
        badge: "Milestone",
        title: "Successfully defended Ph.D. dissertation",
        description:
            "Defended the dissertation \"Research on Key Technologies for Deep Learning-based Small Molecule Drug Design\" at the National University of Defense Technology.",
    },
    {
        date: "Aug 2025",
        sortDate: "2025-08-19",
        badge: "Paper",
        title: "Decoding the limits of deep learning in molecular docking for drug discovery",
        description:
            "Co-first authored paper published in Chemical Science (RSC), systematically decoding the boundaries and failure modes of deep learning-based molecular docking.",
        link: { text: "Paper", url: "https://pubs.rsc.org/en/content/articlelanding/2025/sc/d5sc05395a" },
    },
    {
        date: "Sep 2025",
        sortDate: "2025-09-01",
        badge: "Talk",
        title: "Delivered a report at the CAST Young Scientific Talent Pilot Program",
        description:
            "Presented at the CAST Young Scientific Talent Pilot Program in Hunan and exchanged ideas with fellow early-career researchers.",
        link: { text: "News", url: "https://news.qq.com/rain/a/20250924A01T5000" },
    },
    {
        date: "Jan 2025",
        sortDate: "2025-01-01",
        badge: "Award",
        title: "Selected for the inaugural CAST Youth Talent Support Program for doctoral students",
        description:
            "Selected for the inaugural doctoral-student track of the CAST Youth Talent Support Program.",
    },
];
