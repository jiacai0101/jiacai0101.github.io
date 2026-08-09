# Scholar Site

Jiacai Yi / 蚁佳才的个人学术主页，也是 `scholar-mind.com` 的正式源代码仓库。

它用于展示研究方向、论文、科研软件与数据库、研究写作，以及学术和产业合作入口。它与 MindDance 官网属于同一品牌家族，但两者是并列项目，不共享站点结构或发布流程。

## 技术栈

- Astro 6
- Tailwind CSS 4
- Markdown Content Collections
- KaTeX
- Pagefind
- GitHub Pages

## 常用命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 内容入口

- `src/content/`：论文、项目、文章、报告和个人资料
- `src/config/`：站点、导航、主题和社交链接配置
- `src/data/news.ts`：首页动态
- `public/`：照片、封面和静态资源

阶段性设计调研不放在本仓库中。工作区统一保存在 `docs/explorations/scholar-site/`，因此不会被误当成正式设计规范。

## 版本控制

本目录是独立 Git 仓库，远程仓库为 `jiacai0101/jiacai0101.github.io`。正式修改从这里提交和发布；已退役的 React/TermHub 版本不再作为开发入口。
