## Why

为什么：

当前项目需要一个简单的个人链接主页，把常用社交账号和联系方式集中展示在一个适合移动端访问的页面里。这个需求本身是静态展示，使用普通 HTML/CSS 就足够，后续也方便直接编辑和部署。

## What Changes

变更内容：

- 新增一个类似 Linktree 的居中个人链接主页。
- 顶部展示首字母头像、姓名和一句个人简介。
- 添加 GitHub、Twitter、YouTube、WeChat、Bilibili、Email 六个明显的链接按钮。
- 页面在移动端和桌面端都保持居中、可读、易点击。
- 参考 `https://darshanbhuva.vercel.app/` 的极简开发者作品集风格：黑色背景、大号浅蓝灰标题、绿色强调、小号引导文字、灰蓝正文和克制的绿色描边链接按钮。
- 增加微信号复制、外链新标签打开、图片头像、本地访问次数和右上角风格切换控制。
- 页面排版、空间大小和交互组织参考 `E:\github\ai-coding-lab\vibe-coding\bio-link-page\src\index.html`：`max-width: 420px` 的居中容器、资料区、110px 头像环、纵向链接卡片、真实图标、右侧箭头、微信复制 toast 和底部信息。
- 链接左侧图标改用真实品牌或动作图标，替代 `GH`、`TW`、`BI`、`@`、`WX` 这类文字缩写。
- 移除音乐播放按钮；右上角按钮改为风格切换，在当前黑绿风格和参考页霓虹玻璃风格之间切换，不再切换到白色主题。

## Capabilities（能力范围）

### New Capabilities（新增能力）
- `personal-link-homepage`: 定义个人资料区和链接按钮主页的展示体验。

### Modified Capabilities（修改能力）

## Impact（影响范围）

- 在仓库根目录新增静态前端文件。
- 新增一个轻量结构测试，用于检查页面必需内容是否存在。
- 不涉及外部 API 或后端服务；新增交互使用浏览器原生能力和 localStorage，图标使用 Font Awesome CDN。
