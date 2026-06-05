---
title: AI+Drug Snapshot | 250402 |
date: "2025-04-01"
description: "**期刊**: arxiv"
author: Jiacai Yi
tags:
  - AI+Drug
  - Snapshot
  - Drug Design
---

> 关注**`MindDance`**微信公众号，每日推送**AI+Drug**的最新文章和资讯，获取领域最新的技术进展


### 1. Towards Scientific Intelligence: A Survey of LLM-based Scientific Agents
**期刊**: arxiv

**链接**: 
https://arxiv.org/abs/2503.24047

**简介**: 该论文聚焦基于大语言模型（LLM）的科学智能体，阐述其架构、设计、评估、应用及伦理考量等方面内容。论文通过剖析规划器、记忆和工具集等组件设计，对比通用智能体与科学智能体差异，探讨其在多学科研究中的应用。实验方面，利用多种基准测试评估智能体能力，涉及数学推理、文献理解等任务。结果显示，基于LLM的科学智能体在各领域应用广泛，但目前存在如规划器依赖、记忆机制局限等问题。总体而言，该研究为科学智能体的发展提供了全面综述，对推动其在科研中的应用有重要意义。 

---

### 2. E(3) Invariant Representations of Biomolecules
**期刊**: bioRxiv 

**链接**: 
https://doi.org/10.1101/2025.03.26.645520

**简介**: 本文提出一种基于锚点三边测量法的生物分子结构编码方法，能在尊重欧几里得对称性的同时避免距离矩阵的O(N^2)缩放问题。该方法通过构建E(3)不变编码来表示生物分子结构，并可重构距离矩阵和坐标。实验应用于多种蛋白质结构及YiiP膜蛋白的分子动力学轨迹，使用Protein-Data-Base（PDB）中1DLL、1DYL等数据集。结果表明，该算法可近乎完美地重构蛋白质结构，且能有效捕捉分子轨迹中的构象动力学。此方法为生物分子结构分析提供了高效且严谨的手段。 

---

### 3. Graph Network-Based Analysis of Disease-Gene-Drug Associations: Zero-Shot Disease-Drug Prediction and Analysis Strategies
**期刊**: bioRxiv 

**链接**: 
https://doi.org/10.1101/2024.12.30.630746

**代码**: 
https://github.com/yinboliu-git/ZS-GNT

**简介**: 论文提出ZS-GNT这一创新的零样本药物重利用工作流程，通过构建图数据元路径网络，利用疾病-基因关联和基因-药物相互作用来推断疾病-药物关系。实验收集DisGeNET、DGIdb和ChEMBL数据库数据构建网络，运用GNT算法进行训练和预测。在对乙肝相关肝癌等三种疾病的研究中，GNT算法在交互链接预测上准确率较高；随机选取100种疾病测试，推荐药物的临床验证率可观。这一研究为零样本药物发现等提供了新视角，有助于推动精准医学发展。

---

### 4. Addressing Model Overcomplexity in Drug-Drug Interaction Prediction with Molecular Fingerprints
**期刊**: arxiv

**链接**: 
https://arxiv.org/abs/2503.23550v1

**简介**: 该论文提出用分子指纹等简单表示方法预测药物相互作用，以解决深度学习模型计算成本高和泛化性差的问题。研究利用摩根指纹、图卷积网络嵌入和MoLFormer嵌入，将其融入简单神经网络进行实验。使用DrugBank DDI数据集和FDA的药物亲和力数据集，结果显示摩根指纹和预训练的GCN嵌入在多个任务中表现出色，且能通过梯度分析识别关键分子基序和结构模式。这为药物相互作用预测提供了有效基线，同时表明数据集的局限性影响模型评估，强调需要更好的数据集整理和合理的复杂度扩展。 

---

### 5. A Large-Scale Vision-Language Dataset Derived from Open Scientific Literature to Advance Biomedical Generalist AI
**期刊**: arxiv

**链接**: 
https://arxiv.org/abs/2503.22727v1

**简介**: 论文介绍了BIOMEDICA这个开源数据集，它源于PubMed Central开放获取子集，包含超600万篇科学文章和2400万图像文本对，推动了生物医学通用人工智能发展。研究人员通过从相关资源下载数据、进行序列化和注释等操作构建数据集，并提供数据访问工具。在该数据集上训练嵌入模型、聊天模型和检索增强聊天代理，结果显示这些模型在各自类别中超越先前开源系统。BIOMEDICA为生物医学AI研究提供了重要资源，有助于高性能多模态系统的开发。 

---

### 6. MolGround: A Benchmark for Molecular Grounding
**期刊**: arxiv

**链接**: 
https://arxiv.org/abs/2503.23668v1

**简介**: 该论文提出分子基础基准测试，以评估模型将分子概念与特定结构组件关联的能力，构建了含79k问答对的大型基准数据集，并开发了多智能体基础原型。研究定义化学命名实体识别等5类任务，采用基于螺旋模型的交互式方法构建基准，使用多智能体系统收集和处理数据。实验对比8个大语言模型等基线，结果表明现有模型在多数任务上表现不佳，多智能体原型在部分任务上优于其他模型，且能提升分子字幕和分类任务性能。这为分子理解研究提供了新方向和基准。 

---

### 7. In-silico biological discovery with large perturbation models
**期刊**: arxiv

**链接**: 
https://arxiv.org/abs/2503.23535v1

**简介**: 论文提出大扰动模型（LPM），通过将扰动、读数和背景表示为解耦维度，整合多个异质扰动实验，解决生物发现任务，在预测扰动后转录组等任务上优于现有方法。研究构建LPM，将其用于预测未观察到的扰动实验结果等任务。实验使用来自多个实验的单细胞和批量数据，结果显示LPM在不同实验设置、扰动类型和背景下，预测性能显著优于基线方法，还能发现潜在治疗药物。该研究为生物发现提供了新方向，但LPM存在无法外推到未见背景等局限性。 
 
---

### 8. A Retrieval-Augmented Knowledge Mining Method with Deep Thinking LLMs for Biomedical Research and Clinical Support
**期刊**: arxiv

**链接**: 
https://arxiv.org/abs/2503.23029v1

**简介**: 该论文提出利用大语言模型构建生物医学知识图谱和跨文档问答数据集，并通过集成渐进检索增强推理（IP-RAR）框架提升知识挖掘能力。研究先构建BioStrataKG知识图谱和BioCDQA数据集，再用IP-RAR框架进行知识检索和推理。在多个数据集上的实验显示，IP-RAR在文档检索和答案生成方面表现出色，如在BioCDQA数据集上，文档检索F1得分比现有方法提高20%，答案生成准确率提高25%。这一框架为生物医学研究和临床支持提供了有效工具，但处理复杂多模态数据等方面仍面临挑战。 
 
---

### 9. WHERE and WHICH: Iterative Debate for Biomedical Synthetic Data Augmentation
**期刊**: arxiv

**链接**: 
https://arxiv.org/abs/2503.23673v1

**简介**: 文章提出BioRDA方法，通过测量生物关系相似性和多智能体反思机制，解决生物医学自然语言处理中合成数据增强的问题，提高模型性能。该方法将数据增强过程分为“WHERE”和“WHICH”两个步骤，分别用于确定替换位置和选择合适词汇。在BLURB和BigBIO基准的9个常用数据集上进行实验，结果表明BioRDA在关系提取、命名实体识别等多个任务上均优于基线模型，平均提升2.98%。这表明BioRDA能有效缓解反事实问题，增强模型在生物医学NLP任务中的性能。 
 
---

### 10. Agentic Large Language Models, a survey
**期刊**: arxiv

**链接**: 
https://arxiv.org/abs/2503.23037v1

**简介**: 该综述对智能体大语言模型（Agentic LLMs）的研究进行梳理，将相关工作分为推理、行动和交互三类，探讨其应用并提出研究议程。研究通过对大量文献的调研，分析各类研究的方法和成果。在推理方面提升决策能力，行动方面实现与世界交互，交互方面用于多智能体模拟。许多实验展示了Agentic LLMs在医疗诊断、金融分析等领域的应用潜力。研究认为Agentic LLMs发展前景良好，但在训练数据、幻觉问题、安全等方面存在挑战，未来需进一步研究。 

---
