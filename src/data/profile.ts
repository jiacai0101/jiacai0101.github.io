import type { Lang } from "../i18n/ui";

export interface ResearchArea {
    title: string;
    focus: string;
}
export interface Platform {
    name: string;
    description: string;
    image: string;
    url?: string;
}

interface ProfileData {
    research: ResearchArea[];
    skills: string[];
    platforms: Platform[];
    keywords: string[];
    email: string;
    location: string;
}

// IDs from the publications collection to feature on the home page.
export const SELECTED_PUB_IDS = [
    "nar2024-admetlab3",
    "natprotoc2024-optadmet",
    "chemsci2025-docking-limits",
];

const PROFILE: Record<Lang, ProfileData> = {
    en: {
        research: [
            { title: "AI-Enabled Drug Design", focus: "Molecular property prediction, generative optimization, molecular docking, and large-scale virtual screening." },
            { title: "Biomedical AI Platforms", focus: "Deployable, one-stop scientific platforms for biomedicine and decision support." },
            { title: "LLM-Augmented Scientific Workflows", focus: "Large language model agents for drug-discovery workflows." },
        ],
        skills: ["AI + Science", "Diffusion Models", "Graph Neural Networks", "Large Language Models", "High-Performance Computing", "Scientific Platform Engineering"],
        platforms: [
            { name: "DrugStudio", description: "A one-stop intelligent drug design platform for molecular modeling and scientific workflows.", image: "/images/DrugStudio.svg" },
            { name: "MindDance", description: "WeChat official account sharing research notes, ideas, and updates on AI for drug discovery.", image: "/images/MindDance.jpg" },
        ],
        keywords: ["AI Drug Design", "Diffusion Models", "Graph Neural Networks", "LLMs for Science"],
        email: "yjc0101@hkbu.edu.hk",
        location: "Hong Kong",
    },
    zh: {
        research: [
            { title: "AI 药物设计", focus: "分子性质预测、生成式优化、分子对接与大规模虚拟筛选。" },
            { title: "生物医学 AI 平台", focus: "面向生物医学与决策支持的一站式、可部署科学平台。" },
            { title: "LLM 增强的科研工作流", focus: "面向药物发现工作流的大语言模型智能体。" },
        ],
        skills: ["AI + 科学", "扩散模型", "图神经网络", "大语言模型", "高性能计算", "科学平台工程"],
        platforms: [
            { name: "DrugStudio", description: "面向分子建模与科研工作流的一站式智能药物设计平台。", image: "/images/DrugStudio.svg" },
            { name: "MindDance", description: "微信公众号，分享 AI 药物发现的研究笔记、思考与动态。", image: "/images/MindDance.jpg" },
        ],
        keywords: ["AI 药物设计", "扩散模型", "图神经网络", "科学大语言模型"],
        email: "yjc0101@hkbu.edu.hk",
        location: "香港",
    },
};

export const getProfile = (lang: Lang): ProfileData => PROFILE[lang];
