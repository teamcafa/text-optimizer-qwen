import type { Dimension } from "@/lib/types";

export const DIMENSIONS: Dimension[] = [
  { key: "zhuangbi", label: "装逼指数", emoji: "🪞", desc: "高级感·术语轰炸", color: "#C9A96E" },
  { key: "absurd", label: "荒诞指数", emoji: "🌀", desc: "卡夫卡式·荒谬", color: "#E85D75" },
  { key: "restrained", label: "克制指数", emoji: "🧊", desc: "惜字如金·冷峻", color: "#8BA4B0" },
  { key: "humor", label: "搞笑指数", emoji: "🎭", desc: "反差·段子手", color: "#F5A623" },
  { key: "academic", label: "学术指数", emoji: "📚", desc: "论文腔·引用感", color: "#7B8CDE" },
  { key: "philosophy", label: "哲学指数", emoji: "🗿", desc: "本体论·存在感", color: "#9B6DFF" },
  { key: "buddhism", label: "佛学指数", emoji: "🪷", desc: "空性·缘起", color: "#D4A574" },
  { key: "critical", label: "批判指数", emoji: "🔪", desc: "揭示结构·拆解权力", color: "#FF4444" },
  { key: "satire", label: "讽刺指数", emoji: "😏", desc: "反语·冷笑", color: "#2DD4BF" },
  { key: "poetic", label: "诗意指数", emoji: "🌫️", desc: "意象·通感", color: "#F472B6" },
  { key: "rage", label: "戾气指数", emoji: "🔥", desc: "愤怒·直球攻击", color: "#FF6B35" },
  { key: "nihilist", label: "虚无指数", emoji: "🕳️", desc: "一切无意义", color: "#6B7280" },
];

export const PRESETS = [
  // ===== 原有（保留）=====
  { name: "知乎高赞", values: { zhuangbi: 80, academic: 60, philosophy: 40, restrained: 30, critical: 50 } },
  { name: "鲁迅附体", values: { satire: 90, critical: 80, restrained: 60, rage: 40 } },
  { name: "佛系大师", values: { buddhism: 90, restrained: 70, philosophy: 60, nihilist: 30 } },
  { name: "学术民工", values: { academic: 95, zhuangbi: 40, restrained: 50, philosophy: 30 } },
  { name: "脱口秀", values: { humor: 90, satire: 60, absurd: 50, rage: 20 } },
  { name: "存在危机", values: { nihilist: 80, absurd: 60, philosophy: 50, restrained: 40 } },
  { name: "朋友圈装逼", values: { zhuangbi: 95, poetic: 50, restrained: 60, philosophy: 30 } },
  { name: "愤怒青年", values: { rage: 85, critical: 80, satire: 50, absurd: 30 } },

  { name: "小红书爆款", values: { zhuangbi: 45, humor: 35, poetic: 25, satire: 10, restrained: 10 } },
  { name: "微博锐评", values: { satire: 75, critical: 70, rage: 55, restrained: 35 } },
  { name: "公众号社论", values: { academic: 55, critical: 65, restrained: 50, zhuangbi: 35 } },
  { name: "播客嘉宾", values: { philosophy: 45, restrained: 55, humor: 25, academic: 35 } },

  { name: "冷刀判词", values: { restrained: 85, critical: 75, satire: 55, rage: 20 } },
  { name: "阴阳怪气", values: { satire: 95, humor: 35, critical: 45, restrained: 40 } },
  { name: "温柔诛心", values: { restrained: 70, satire: 50, critical: 60, poetic: 25 } },
  { name: "直接开喷", values: { rage: 95, critical: 80, satire: 30, restrained: 5 } },

  { name: "学术答辩", values: { academic: 90, restrained: 65, philosophy: 20, critical: 25 } },
  { name: "哲学黑话", values: { philosophy: 85, academic: 65, restrained: 50, critical: 30 } },
  { name: "后现代附体", values: { philosophy: 75, absurd: 60, critical: 60, restrained: 40 } },
  { name: "论文摘要", values: { academic: 98, restrained: 80, humor: 0, rage: 0 } },

  { name: "新诗体", values: { poetic: 90, restrained: 55, philosophy: 35, nihilist: 20 } },
  { name: "伤感夜话", values: { poetic: 65, nihilist: 45, restrained: 40, absurd: 20 } },
  { name: "空性降临", values: { buddhism: 95, philosophy: 55, restrained: 60, nihilist: 15 } },
  { name: "宇宙虚无", values: { nihilist: 95, philosophy: 55, poetic: 30, restrained: 35 } },

  // ===== 新增（好玩人格层）=====
  { name: "机智吐槽", values: { humor: 75, satire: 55, restrained: 35, critical: 25 } },
  { name: "高情商回怼", values: { satire: 45, restrained: 70, critical: 55, humor: 20 } },
  { name: "神评论区", values: { humor: 80, satire: 70, absurd: 35, rage: 10 } },
  { name: "脱口秀嘴替", values: { humor: 90, satire: 45, absurd: 40, restrained: 10 } },
  { name: "朋友局MVP", values: { humor: 65, zhuangbi: 20, restrained: 20, poetic: 10 } },

  { name: "笑着骂人", values: { humor: 50, satire: 80, rage: 25, restrained: 25 } },
  { name: "文明阴阳", values: { satire: 80, restrained: 75, critical: 35, humor: 10 } },
  { name: "有理有据地烦", values: { academic: 35, critical: 65, restrained: 55, satire: 20 } },

  { name: "轻微装逼", values: { zhuangbi: 65, restrained: 35, academic: 20, poetic: 15 } },
  { name: "高级废话", values: { zhuangbi: 75, humor: 25, restrained: 25, philosophy: 20 } },
  { name: "很会说话", values: { restrained: 55, humor: 25, poetic: 15, critical: 10 } },
  { name: "冷感高级", values: { restrained: 90, zhuangbi: 35, poetic: 10, academic: 10 } },
  { name: "毒舌文艺", values: { poetic: 35, satire: 55, restrained: 45, critical: 30 } },
  { name: "一句封神", values: { restrained: 60, humor: 30, satire: 30, poetic: 20 } },

  { name: "发疯文学", values: { absurd: 85, humor: 55, rage: 25, nihilist: 10 } },
  { name: "梗王附体", values: { humor: 95, absurd: 40, satire: 25, rage: 5 } },
  { name: "互联网嘴替", values: { humor: 70, satire: 45, restrained: 15, critical: 20 } },
  
  // ===== 极端人格（高能区）=====
{ name: "阴阳怪气MAX", values: { satire: 100, humor: 40, restrained: 20, rage: 10 } },
{ name: "笑里藏刀", values: { satire: 85, restrained: 80, critical: 60, humor: 20 } },
{ name: "礼貌但想骂人", values: { restrained: 85, satire: 70, rage: 30, critical: 50 } },
{ name: "高情商阴阳", values: { satire: 75, restrained: 80, humor: 30, critical: 40 } },

{ name: "嘴毒专家", values: { rage: 70, satire: 85, critical: 80, restrained: 10 } },
{ name: "纯纯开喷", values: { rage: 100, critical: 80, satire: 30, restrained: 0 } },
{ name: "文明但很狠", values: { restrained: 90, critical: 70, satire: 50, rage: 20 } },

{ name: "发疯文学MAX", values: { absurd: 100, humor: 70, rage: 40, nihilist: 30 } },
{ name: "互联网疯狗", values: { rage: 95, humor: 60, satire: 50, absurd: 30 } },
{ name: "崩溃但清醒", values: { nihilist: 85, absurd: 75, restrained: 30, rage: 20 } },

{ name: "梗王附体MAX", values: { humor: 100, absurd: 60, satire: 40, rage: 10 } },
{ name: "段子手失控", values: { humor: 95, absurd: 70, satire: 50, restrained: 0 } },
{ name: "评论区战神", values: { humor: 80, satire: 85, rage: 40, critical: 30 } },

{ name: "装逼到离谱", values: { zhuangbi: 100, philosophy: 60, academic: 40, restrained: 20 } },
{ name: "哲学过载", values: { philosophy: 100, academic: 70, restrained: 40, critical: 40 } },
{ name: "高级到没人懂", values: { zhuangbi: 90, restrained: 70, philosophy: 50, humor: 0 } },

{ name: "冷血旁观者", values: { restrained: 95, nihilist: 70, critical: 40, humor: 0 } },
{ name: "毫无同理心", values: { nihilist: 90, restrained: 80, satire: 40, rage: 10 } },
{ name: "宇宙级摆烂", values: { nihilist: 100, absurd: 50, restrained: 60, humor: 10 } }
];