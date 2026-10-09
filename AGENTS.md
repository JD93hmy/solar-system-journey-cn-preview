# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## 用户设计方向

- 太阳系首页使用收藏卡牌交互：九张卡牌在视口中心呈牌扇排列，初始显示统一卡背；悬停或键盘聚焦时翻到正面，点击后显示该天体科普详情。
- 卡牌视觉采用深空、古金雕纹、青蓝全息反光；卡面结构包含边框装饰、描述、行星与光照层。
- 用户认可土星正面与对应星盘式卡背的设计方向，优先延展这套风格。
- 详情卡加入 The Ashen One 的暗黑奇幻氛围作为风格灵感：烛火暖光、余烬、暗金金属雕边与克制的全息反射；保留真实对应的行星主体和清晰科普信息，不要求复用 Three.js 原项目源码或二进制资源。

