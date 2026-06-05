export const languages = { en: "English", zh: "中文" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

type Dict = Record<string, string>;

export const ui: Record<Lang, Dict> = {
    en: {
        "nav.about": "About",
        "nav.publications": "Publications",
        "nav.talks": "Talks",
        "nav.projects": "Projects",
        "nav.blog": "Blog",
        "nav.tags": "Tags",
        "nav.cv": "CV",
        "nav.search": "Search",
        "nav.archives": "Archives",
        "btt.label": "Back to Top",
        "footer.copyright": "Copyright",
        "footer.rights": "All rights reserved.",
        "page.archives.title": "Archives",
        "page.archives.subtitle": "All blog posts, by year.",
        "news.title": "News",
        "home.research": "Research",
        "home.skills": "Skills & Methods",
        "home.platforms": "Platforms",
        "home.selected": "Selected Publications",
        "detail.back": "Back to",
        "detail.external": "View external",
        "list.newer": "Newer",
        "list.older": "Older",
        "list.prev": "Prev",
        "list.next": "Next",
        "page.home.title": "About Me",
        "page.publications.title": "Publications",
        "page.publications.subtitle": "Peer-reviewed research on AI for drug discovery, ADMET prediction, and bioinformatics.",
        "page.projects.title": "Projects & Platforms",
        "page.projects.subtitle": "Open scientific tools and platforms for AI-driven drug design.",
        "page.blog.title": "Blog",
        "page.blog.subtitle": "Notes on AI-enabled drug design, molecular modeling, and scientific platforms.",
        "page.talks.title": "Talks & Presentations",
        "page.talks.subtitle": "Invited talks, conference presentations, and training lectures.",
        "page.cv.title": "Curriculum Vitae",
        "page.cv.subtitle": "Academic and professional history.",
        "page.tags.title": "Tags",
        "page.tags.subtitle": "Explore content by topic.",
        "page.search.title": "Search",
        "page.search.subtitle": "Search across publications, projects, and blog posts.",
    },
    zh: {
        "nav.about": "关于",
        "nav.publications": "论文",
        "nav.talks": "报告",
        "nav.projects": "项目",
        "nav.blog": "博客",
        "nav.tags": "标签",
        "nav.cv": "简历",
        "nav.search": "搜索",
        "nav.archives": "归档",
        "btt.label": "回到顶部",
        "footer.copyright": "版权所有",
        "footer.rights": "保留所有权利。",
        "page.archives.title": "归档",
        "page.archives.subtitle": "全部博客文章，按年份归档。",
        "news.title": "动态",
        "home.research": "研究方向",
        "home.skills": "技能与方法",
        "home.platforms": "平台与产品",
        "home.selected": "代表论文",
        "detail.back": "返回",
        "detail.external": "查看原文",
        "list.newer": "较新",
        "list.older": "较旧",
        "list.prev": "上一页",
        "list.next": "下一页",
        "page.home.title": "关于我",
        "page.publications.title": "论文发表",
        "page.publications.subtitle": "围绕 AI 药物发现、ADMET 预测与生物信息学的同行评审研究。",
        "page.projects.title": "项目与平台",
        "page.projects.subtitle": "面向 AI 药物设计的开放科学工具与平台。",
        "page.blog.title": "博客",
        "page.blog.subtitle": "关于 AI 药物设计、分子建模与科学平台的笔记。",
        "page.talks.title": "学术报告",
        "page.talks.subtitle": "受邀报告、会议演讲与培训讲座。",
        "page.cv.title": "个人简历",
        "page.cv.subtitle": "学术与职业经历。",
        "page.tags.title": "标签",
        "page.tags.subtitle": "按主题浏览内容。",
        "page.search.title": "搜索",
        "page.search.subtitle": "在论文、项目与博客中检索。",
    },
};

export function getLangFromUrl(url: URL): Lang {
    const seg = url.pathname.split("/").filter(Boolean)[0];
    if (seg && seg in ui) return seg as Lang;
    return defaultLang;
}

export function useTranslations(lang: Lang) {
    return function t(key: string): string {
        return ui[lang][key] ?? ui[defaultLang][key] ?? key;
    };
}

/** Prefix a root-relative path with the locale segment (en = no prefix). */
export function localizePath(path: string, lang: Lang): string {
    const clean = path.startsWith("/") ? path : `/${path}`;
    if (lang === defaultLang) return clean;
    return clean === "/" ? "/zh" : `/zh${clean}`;
}

/** Remove a leading `zh/` from a content entry id to get its bare slug. */
export function stripLocaleId(id: string): string {
    return id.replace(/^zh\//, "");
}
