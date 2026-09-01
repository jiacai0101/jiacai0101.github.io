import type { Lang } from "../i18n/ui";
import scholar from "./scholar.json" with { type: "json" };

const citationLabel = scholar.citations.toLocaleString("en-US");

function proofLine(lang: Lang): string {
    if (lang === "zh") {
        return `${citationLabel} 次引用 · h-index ${scholar.hIndex} · ${scholar.articles} 篇论文 · 平台覆盖 100+ 个国家`;
    }
    return `${citationLabel} citations · h-index ${scholar.hIndex} · ${scholar.articles} papers · platforms used in 100+ countries`;
}

export interface ResearchArea {
    title: string;
    focus: string;
}
export interface Platform {
    name: string;
    description: string;
    url?: string;
}

interface ProfileData {
    name: string;
    role: string;
    statement: string;
    intro: string;
    proof: string;
    research: ResearchArea[];
    platforms: Platform[];
    email: string;
    location: string;
    cvUrl: string;
    office: string;
    status: string;
    scholarUrl: string;
    citations: number;
    hIndex: number;
}

const PROFILE: Record<Lang, ProfileData> = {
    en: {
        name: "Jiacai Yi",
        role: "Postdoctoral researcher · Hong Kong Baptist University",
        statement:
            "I work on AI-enabled drug design, and on the scientific platforms that make those methods usable.",
        intro:
            "I am a postdoctoral researcher at the School of Chinese Medicine, Hong Kong Baptist University. My research covers molecular property prediction, generative optimization, molecular docking, and large-scale virtual screening, with an emphasis on turning models into open tools for medicinal chemistry.",
        proof: proofLine("en"),
        research: [
            { title: "AI-enabled drug design", focus: "Molecular property prediction, generative optimization, molecular docking, and large-scale virtual screening." },
            { title: "Biomedical AI platforms", focus: "Deployable scientific software and databases for ADMET, drug–drug interaction, and decision support." },
            { title: "LLM-augmented scientific workflows", focus: "Language-model agents for drug-discovery pipelines." },
        ],
        platforms: [
            { name: "DeepCYP", description: "End-to-end CYP450 pathway–site–product metabolism prediction.", url: "https://deepcyp.scbdd.com/" },
            { name: "ADMETlab 3.0", description: "ADMET prediction platform with API access and decision support.", url: "https://admetlab3.scbdd.com/" },
            { name: "DDInter 2.0", description: "Drug–drug, drug–food, and drug–disease interaction resource.", url: "https://ddinter2.scbdd.com/" },
            { name: "ChemFH", description: "Screening for frequent false positives in chemical biology.", url: "https://chemfh.scbdd.com/" },
            { name: "OptADMET", description: "Substructure modification to improve ADMET properties of leads.", url: "https://cadd.nscc-tj.cn/deploy/optadmet/" },
            { name: "DrugStudio", description: "One-stop platform for molecular modeling and scientific workflows." },
        ],
        email: "yjc0101@hkbu.edu.hk",
        location: "Hong Kong",
        cvUrl: "/cv",
        office: "School of Chinese Medicine, HKBU · Kowloon Tong, Hong Kong",
        status: "Open to research collaborations",
        scholarUrl: scholar.url,
        citations: scholar.citations,
        hIndex: scholar.hIndex,
    },
    zh: {
        name: "蚁佳才",
        role: "博士后 · 香港浸会大学",
        statement: "我研究 AI 药物设计，并把它做成可以实际使用的科学平台。",
        intro:
            "我是香港浸会大学中医药学院博士后。研究方向包括分子性质预测、生成式优化、分子对接与大规模虚拟筛选，重点是把模型做成可供药物化学使用的开放工具。",
        proof: proofLine("zh"),
        research: [
            { title: "AI 药物设计", focus: "分子性质预测、生成式优化、分子对接与大规模虚拟筛选。" },
            { title: "生物医学 AI 平台", focus: "面向 ADMET、药物相互作用与决策支持的可部署科学软件与数据库。" },
            { title: "LLM 增强的科研工作流", focus: "面向药物发现流程的大语言模型智能体。" },
        ],
        platforms: [
            { name: "DeepCYP", description: "CYP450 代谢通路–位点–产物的端到端预测。", url: "https://deepcyp.scbdd.com/" },
            { name: "ADMETlab 3.0", description: "带 API 与决策支持的 ADMET 预测平台。", url: "https://admetlab3.scbdd.com/" },
            { name: "DDInter 2.0", description: "药物–药物、药物–食物与药物–疾病相互作用资源。", url: "https://ddinter2.scbdd.com/" },
            { name: "ChemFH", description: "化学生物学中的高频假阳性筛查。", url: "https://chemfh.scbdd.com/" },
            { name: "OptADMET", description: "通过子结构改造改善先导化合物 ADMET 性质。", url: "https://cadd.nscc-tj.cn/deploy/optadmet/" },
            { name: "DrugStudio", description: "面向分子建模与科研工作流的一站式平台。" },
        ],
        email: "yjc0101@hkbu.edu.hk",
        location: "香港",
        cvUrl: "/cv",
        office: "香港浸会大学中医药学院 · 香港九龙塘",
        status: "开放科研合作",
        scholarUrl: scholar.url,
        citations: scholar.citations,
        hIndex: scholar.hIndex,
    },
};

export const getProfile = (lang: Lang): ProfileData => PROFILE[lang];
