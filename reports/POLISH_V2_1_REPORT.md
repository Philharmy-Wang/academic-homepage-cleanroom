# Polish v2.1 Final Report

Date: `2026-07-10`

Repository: `Philharmy-Wang/academic-homepage-cleanroom`

Preview: <https://philharmy-wang.github.io/academic-homepage-cleanroom/>

## 1. 本轮修改目标

在既有 cleanroom Astro 项目上进行小范围、高质量的视觉与信息架构精修，不重新初始化、不重新迁移、不接触旧正式仓库。重点是首页导航与 Hero、Research 图标、论文统计与卡片、OpenAlex 引用图、Projects 学术履历化、CV 网页/打印版式及中文姓名规则。

## 2. 首页导航与 Hero 改动

- 桌面端改为左侧姓名、真正居中的主导航、右侧独立语言胶囊按钮三列布局。
- 语言按钮不再混入导航列表；移动端始终可见，主导航由可访问菜单控制。
- Hero 仅保留 Email、Google Scholar、GitHub、CV 四个规整按钮。
- 英文 Hero 使用 `Guanbo Wang`；中文 Hero 使用 `王冠博`。
- 桌面与移动布局均无横向滚动。

## 3. 研究聚焦图标改动

- 使用站内原生 SVG 重绘研究聚焦轨道式图标，并增加双层圆环、节点与轻量卡片层次。
- 未引入外部图标库、外部字体或图片 CDN。

## 4. 关于区去重复与重构

- 左侧保留完整个人简介。
- 删除与简介重复的“当前工作”长段落。
- 右侧改为 At a glance / 概览卡片，显示当前岗位、6 条研究主线、10 篇唯一第一作者论文及 273 次 OpenAlex 总引用。

## 5. Research 模块视觉增强

- 六个方向分别使用重绘的灵长类、身份识别、姿态、多视角、边缘计算与森林火灾 SVG 图标。
- 去除弱信息量的 PR/ID/PO 小编码，改用图标、渐变引导线和顶部研究线条。
- 首页保持简洁；Research 页面完整展示科学问题、方法关注、状态及相关工作入口。

## 6. 代表性论文重排

- 新增 4 项 summary stats：16 篇论文、10 篇唯一第一作者论文、4 篇有来源的中科院一区 TOP 记录、273 次 OpenAlex 总引用。
- 论文卡片加入编号、年份、正式作者列表、本人姓名加粗、`Sole First Author / 唯一第一作者`、venue、审计指标、单篇引用、DOI、Google Scholar 与右侧主图。
- 删除所有公开页面中的“贡献说明”段落。
- 中文论文页的个人界面名为王冠博，但英文论文作者署名始终保持 `Guanbo Wang`。

## 7. 引用量与总引用量展示优化

- 总引用量上移到论文 summary，并作为深蓝强调项。
- 单篇 OpenAlex 引用改为紧凑的图标胶囊，并保留快照时间提示。
- Citation Trend 改为无依赖原生 SVG 面积折线图，显示总引用、匹配论文数、年度值和快照说明。
- 数据源明确为 OpenAlex，不描述为 Google Scholar 实时抓取；Google Scholar 仅保留外部入口。

## 8. 中科院/JCR/IF/5-Year IF 核验情况

页面仅显示带 `source` 且带指标年份或访问快照月份的记录：

- TCSVT：2023 JCR Q1、IF 8.3、5-Year IF 7.1；来源为 IEEE 2024-09 官方 Title List。
- TGRS：2023 JCR Q1、IF 7.5、5-Year IF 7.6；来源同上。
- Expert Systems with Applications：IF 7.5；Elsevier 页面 2026-07 快照。
- Digital Signal Processing：IF 3.0；Elsevier Insights 2026-07 快照。
- IET Image Processing：IF 2.4；Wiley/IET 页面 2026-07 快照。
- IET Computer Vision：IF 1.3；Wiley/IET 页面 2026-07 快照。
- DPMNet、RFWNet、M4SFWD、Fighting against Forest Fire：中科院一区 TOP；云南大学教师主页 2026-07 机构页面快照。

冲突处理：云南大学主页给出的部分 IF 与带日期的 IEEE 官方表不同，IEEE 论文采用较保守且可审计的 IEEE 2023 指标；机构主页只用于 CAS Zone 1 / TOP 快照。出版社没有公开明确 JCR 年份或 5-Year IF 的字段均不显示。详细来源见 `reports/ACADEMIC_METADATA_SOURCES.md`。

## 9. 哪些论文已使用真实图，哪些仍为占位图

本轮没有复制任何出版社/PDF/搜索引擎图片，也没有把不明版权图片标成真实主图。5 张主图均为第一阶段以来的站内原创抽象 SVG 临时占位：

- DPMNet：占位图。
- RFWNet：占位图。
- M4SFWD：占位图。
- Fighting against Forest Fire：占位图。
- Fighting against Terrorism：占位图。

作者自有 `Philharmy-Wang/M4SFWD` 仓库已核验：根目录没有可复用架构图，也没有声明许可证，因此未复制任何资产。论文卡片的真实主图布局已经就绪。

## 10. Projects 页面优化

- 改为正式学术履历式纵向时间线和项目卡片。
- 主持项目按开始时间倒序排列。
- 参与项目按“国家层面优先、云南大学其后”，各层级内部再按时间倒序。
- 项目名称作为主标题，项目类别、角色、时间和状态分层显示。
- 未增加经费、项目编号、内部路径或其他未授权信息。

## 11. CV 页面优化

- 新增正式个人信息头部、联系信息栏和论文 summary。
- 教育、工作和项目资助采用统一双栏履历行。
- 研究方向改为紧凑标签；代表作沿用编号、指标、引用与正式作者格式但隐藏大图，兼顾网页密度与打印。
- 中文 CV 使用王冠博；英文 CV 使用 Guanbo Wang。

## 12. 中文姓名规则调整

- 英文人物页面：`Guanbo Wang`。
- 中文 Hero、简介、Header、CV 主标题与中文元数据：`王冠博`。
- 中英文论文作者列表中的本人署名：统一保留论文正式英文形式 `Guanbo Wang`。
- 数据验证与 Playwright 已加入对应规则断言。

## 13. 本地测试结果

按指定顺序执行并通过：

| 命令 | 结果 |
|---|---|
| `npm ci` | 275 packages；0 vulnerabilities |
| `npm run check` | 52 files；0 errors / warnings / hints |
| `npm run validate:data` | 16 论文、5 代表作、11 项目、18 荣誉、2 专利、4 资源；通过 |
| `npm run check:links` | 14 页面、216 内部链接/资源；通过 |
| `npm run privacy:audit` | 未发现凭据、私网地址、私有路径或禁止公开字段 |
| `npm run safety:remote` | 仅允许的 origin；fork=false；parent/source=null；通过 |
| `npm run build` | 14 个静态页面；通过 |
| `npm run citations:update` | 数据未变化；13/16 匹配；3 条未匹配记录安全保留 |

## 14. Playwright 结果

- 最终命令：`npm run test:responsive`
- 结果：`56 passed`，覆盖 14 路由 × desktop/laptop/tablet/mobile 四档视口。
- 自动检查：HTTP 200、本地资源、无横向滚动、图片尺寸、图标边界、Header、导航居中、独立语言按钮、Hero、姓名规则、论文分组/主图/指标/引用图、项目字段、菜单交互、footer、console error 和失败响应。
- 早期预检曾有 4 个失败，原因仅为测试仍查找旧 `.citation-plot` 类；改为新 `.citation-chart-wrap` 后 4/4 复测通过，最终全量 56/56 通过。

人工检查的 12 张最终截图：

- 桌面 1440：英文首页、中文首页、英文 Research、中文 Research、英文 Publications、中文 Publications、英文 Projects、中文 CV。
- 移动 390：英文首页、中文首页、英文 Publications、中文 CV。
- 结论：导航、Hero、概览卡、Research 图标、论文卡片/主图/指标、引用折线、项目时间线与 CV 均无裁切、重叠、横向滚动或明显失衡；移动端信息按单列自然折叠。

## 15. GitHub Actions run ID

- Polish v2.1 实现提交：`551d5af08f788282ffd853ceb594bb374c66378e`。
- Quality：`29079505959`，`success`。
- Deploy to GitHub Pages：`29079505983`，`success`。
- Quality 的 Node 运行时提示来自 GitHub 对 `actions/checkout@v4` / `actions/setup-node@v4` 的平台级弃用迁移注释，不是项目测试失败；全部质量步骤均成功。

## 16. 线上回读结果

对 <https://philharmy-wang.github.io/academic-homepage-cleanroom/> 使用真实 Chromium 完成回读：

- 14/14 中英文路由 HTTP 200。
- 14/14 页面均存在 main、h1、可见桌面导航及独立语言按钮。
- 14/14 页面横向 overflow 为 0。
- 14/14 页面 console error 为 0、HTTP 失败资源为 0。
- 中英文 Publications 页面均显示 5 张代表作主图、4 项 summary stats 和可见引用折线图。
- 390px 复核英文首页、中文首页、英文 Publications、中文 CV：HTTP 200，overflow 0，语言按钮可见，移动菜单可打开，console error 0。

## 17. 尚待用户后续手动提供的论文主图清单

建议用户从本人有权使用的论文原稿/作者版本中手动提供以下网络架构图或方法总览截图：

1. DPMNet。
2. RFWNet。
3. M4SFWD（数据集构建流程或数据组成总览）。
4. Fighting against Forest Fire（轻量网络结构）。
5. Fighting against Terrorism（改进 YOLO v4 架构/流程）。

收到图片后应记录来源、使用权、裁剪范围与替换文件名，再移除相应 SVG 占位图。

## 18. 是否创建 PR

否。

## 19. 是否修改旧正式仓库

否。`Philharmy-Wang/Philharmy-Wang.github.io` 未被修改、未被添加为 remote、未接收任何 push。

## 20. 是否执行 cutover

否。未收到 `CUTOVER_APPROVED`，未重命名或替换正式仓库。
