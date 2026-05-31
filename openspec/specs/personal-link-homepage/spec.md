# personal-link-homepage Specification

## Purpose
定义个人链接主页的稳定行为，包括资料展示、链接入口、响应式布局、视觉风格、微信号复制、风格切换、本地访问次数统计和参考 Bio Link 页面组织方式。

## Requirements
### Requirement: 显示个人资料头部
首页 SHALL 显示一个居中的个人资料头部，其中包含头像图片、姓名和一句简短个人简介。

#### Scenario: 访客打开首页
- **WHEN** 访客打开首页
- **THEN** 页面展示头像图片、个人姓名和一句个人简介

### Requirement: 提供必需链接按钮
首页 SHALL 提供 GitHub、Twitter、YouTube、WeChat、Bilibili 和 Email 的可见链接按钮。

#### Scenario: 访客查看链接区域
- **WHEN** 访客查看链接区域
- **THEN** GitHub、Twitter、YouTube、WeChat、Bilibili 和 Email 都以明显按钮形式出现

### Requirement: 布局适配常见视口
首页 SHALL 在移动端和桌面端视口中保持主要内容居中且可用。

#### Scenario: 访客使用移动端尺寸屏幕
- **WHEN** 视口宽度较窄
- **THEN** 个人资料和链接按钮仍然居中、可读，并且不会超出视口宽度

### Requirement: 呈现极简开发者作品集视觉风格
首页 SHALL 参考 Darshan Bhuva 个人站的极简开发者作品集风格，使用黑色背景、浅蓝灰大标题、绿色强调、灰蓝正文和克制的绿色描边链接按钮。

#### Scenario: 访客查看参考风格页面
- **WHEN** 访客打开首页
- **THEN** 页面展示黑色背景、浅蓝灰大标题、绿色强调文案和灰蓝正文

#### Scenario: 访客悬停链接按钮
- **WHEN** 访客将鼠标悬停在链接上
- **THEN** 链接按钮通过绿色边框、文字或阴影变化呈现克制的高亮状态

### Requirement: 支持个人主页交互增强
首页 SHALL 支持微信号复制、风格切换和本地访问次数统计。

#### Scenario: 访客复制微信号
- **WHEN** 访客点击「复制微信号」按钮
- **THEN** 页面将 `wamgjt1127` 写入剪贴板，并显示「已复制」提示

#### Scenario: 访客切换风格
- **WHEN** 访客点击右上角主题切换按钮
- **THEN** 页面在当前黑绿风格和参考页霓虹玻璃风格之间切换，并使用平滑过渡动画，不切换为白色主题

#### Scenario: 访客查看头像
- **WHEN** 访客打开首页
- **THEN** 头像区域展示 `头像1.png` 图片

#### Scenario: 访客查看访问次数
- **WHEN** 访客打开首页
- **THEN** 页面底部显示基于 localStorage 记录的访问次数

### Requirement: 参考本地 Bio Link 页面组织布局
首页 SHALL 参考本地 `bio-link-page/src/index.html` 的页面排版、空间大小和交互组织方式。

#### Scenario: 访客查看页面结构
- **WHEN** 访客打开首页
- **THEN** 页面使用接近参考页尺寸的居中容器包裹资料区、链接区、toast 和底部信息

#### Scenario: 访客查看链接卡片
- **WHEN** 访客查看链接区
- **THEN** 链接以纵向卡片列表展示，每项包含左侧 icon、中间文字和右侧箭头或操作符

#### Scenario: 访客查看链接图标
- **WHEN** 访客查看链接区
- **THEN** GitHub、Twitter、YouTube、Bilibili、Email 和 WeChat 使用真实品牌或动作图标，而不是文字缩写

#### Scenario: 访客复制微信号后的反馈
- **WHEN** 访客点击微信复制卡片
- **THEN** 页面显示浮层 toast 提示复制结果
