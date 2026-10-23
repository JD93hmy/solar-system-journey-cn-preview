import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "@phosphor-icons/react";

const worlds = [
  ["sun", "太阳", "SUN", "恒星", "太阳系中心", "1,392,700 公里", "约 25–35 个地球日", "约 5,500°C", "约 73% 氢、25% 氦", "光到地球约 8 分 20 秒", "太阳集中了太阳系约 99.8% 的质量。它释放的光与热塑造了每颗行星的环境，也维系着地球上的生命。", "太阳每秒把约 6 亿吨氢聚变成氦。", "https://science.nasa.gov/sun/facts/"],
  ["mercury", "水星", "MERCURY", "第一颗行星", "5,800 万公里", "4,879 公里", "88 个地球日", "昼夜约 430°C 至 −180°C", "岩石外壳与巨大的金属核心", "阳光抵达约需 3.2 分钟", "水星是离太阳最近、也是最小的行星。它几乎没有大气保存热量，因此白昼炽热、黑夜严寒。", "水星的一天比它的一年还长。", "https://science.nasa.gov/mercury/facts/"],
  ["venus", "金星", "VENUS", "第二颗行星", "1.08 亿公里", "12,104 公里", "224.7 个地球日", "约 464°C", "浓厚二氧化碳与硫酸云", "太阳系最强烈的温室效应", "金星大小与地球相近，却拥有炙热、厚重而腐蚀性的环境。浓密大气让它成为太阳系最热的行星。", "金星自转方向与多数行星相反。", "https://science.nasa.gov/venus/venus-facts/"],
  ["earth", "地球", "EARTH", "第三颗行星", "1.496 亿公里", "12,756 公里", "365.25 天", "全球平均约 15°C", "岩石行星，表面约 71% 为海洋", "已知唯一孕育生命的世界", "液态水、稳定的大气与磁场共同塑造了我们的蓝色家园。地球是目前已知唯一拥有生命的天体。", "地球并不是完美球体，赤道略微隆起。", "https://science.nasa.gov/earth/facts/"],
  ["mars", "火星", "MARS", "第四颗行星", "2.279 亿公里", "6,779 公里", "687 个地球日", "平均约 −65°C", "岩石表面与稀薄二氧化碳大气", "拥有太阳系最大的火山", "氧化铁让火星呈现红色。干涸河谷与极地冰盖提示我们：这颗行星过去可能拥有更温暖湿润的环境。", "奥林帕斯山高度约为珠穆朗玛峰的三倍。", "https://science.nasa.gov/mars/facts/"],
  ["jupiter", "木星", "JUPITER", "第五颗行星", "7.78 亿公里", "142,984 公里", "11.86 个地球年", "云顶约 −110°C", "以氢和氦为主的气态巨行星", "太阳系最大的行星", "木星拥有汹涌的云带、强大的磁场和众多卫星。大红斑是一场延续了数百年的巨型风暴。", "若木星是空心的，内部大约能容纳 1,000 个地球。", "https://science.nasa.gov/jupiter/facts/"],
  ["saturn", "土星", "SATURN", "第六颗行星", "14 亿公里", "120,536 公里", "29.45 个地球年", "云顶约 −140°C", "氢、氦与冰尘组成的环", "拥有最壮观复杂的行星环", "土星的环由无数冰粒、岩石与尘埃组成。它本身密度极低，若有足够大的海洋，理论上甚至可以漂浮。", "土星北极有一条巨大的六边形急流。", "https://science.nasa.gov/saturn/facts/"],
  ["uranus", "天王星", "URANUS", "第七颗行星", "29 亿公里", "51,118 公里", "84 个地球年", "约 −195°C", "水、甲烷与氨构成的冰巨星", "几乎横躺着绕太阳运行", "天王星淡青色来自大气中的甲烷。一次远古碰撞可能让它的自转轴倾斜到近乎躺倒。", "它的一个季节可持续约 21 个地球年。", "https://science.nasa.gov/uranus/facts/"],
  ["neptune", "海王星", "NEPTUNE", "第八颗行星", "45 亿公里", "49,528 公里", "164.8 个地球年", "约 −200°C", "富含水、甲烷与氨的冰巨星", "太阳系风速最快的世界", "在太阳系已知行星的最外侧，海王星依然拥有活跃而猛烈的天气。深蓝云层中，风速可超过每小时 2,000 公里。", "自 1846 年被发现后，海王星只完成过一次公转。", "https://science.nasa.gov/neptune/facts/"],
].map(([id, name, english, order, distance, diameter, year, temperature, composition, light, intro, fact, source], index) => ({ id, name, english, order, distance, diameter, year, temperature, composition, light, intro, fact, source, image: `/assets/planets/${id}.png`, number: String(index + 1).padStart(2, "0") }));

const facts = [
  ["距太阳", "distance"], ["直径", "diameter"], ["公转周期", "year"], ["温度", "temperature"],
];

const cardArt = Object.fromEntries(worlds.map((world) => [world.id, `/assets/cards/${world.id}-holo-card.png`]));

function CardArtwork({ world, className = "" }) {
  return (
    <span className={`card-artwork ${className} card-art-${world.id}`} aria-hidden="true">
      <img className="card-composite-image" src={cardArt[world.id]} alt="" />
      {world.id !== "saturn" && <span className="description-layer"><b>{world.english}</b><em>{world.name}</em><small>{world.order} <i>·</i> SOLAR SYSTEM</small></span>}
      <span className="card-holo-glint" />
    </span>
  );
}

function PlanetCard({ world, index, onOpen }) {
  return (
    <button
      className={`planet-card planet-${world.id}`}
      style={{ "--card-index": index, "--fan-angle": `${(index - 4) * 4}deg`, "--fan-lift": `${Math.abs(index - 4) * 13}px` }}
      onClick={() => onOpen(world)}
      aria-label={`翻开${world.name}卡牌，查看知识`}
    >
      <span className="card-inner">
        <span className="card-face card-back" aria-hidden="true">
          <img src="/assets/cards/saturn-card-back.png" alt="" />
          <span className="back-index">SOLAR ATLAS · {world.number}</span>
          <span className="back-caption">太阳系星图</span>
        </span>
        <span className="card-face card-front"><CardArtwork world={world} /></span>
      </span>
    </button>
  );
}

function LearningCard({ world, onClose, onMove }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [idleMotion, setIdleMotion] = useState({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, scale: 1 });
  const dragRef = useRef(null);
  const movedRef = useRef(false);
  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);
  useEffect(() => {
    setRotation({ x: 0, y: 0 });
    dragRef.current = null;
    movedRef.current = false;
    setDragging(false);
    setIdleMotion({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, scale: 1 });
  }, [world.id]);
  useEffect(() => {
    if (dragging) return undefined;
    let timer;
    let cancelled = false;
    const drift = () => {
      if (cancelled) return;
      setIdleMotion({
        x: (Math.random() - 0.5) * 18,
        y: (Math.random() - 0.5) * 18,
        z: (Math.random() - 0.5) * 34,
        rx: (Math.random() - 0.5) * 11,
        ry: (Math.random() - 0.5) * 15,
        rz: (Math.random() - 0.5) * 4,
        scale: 0.975 + Math.random() * 0.05,
      });
      timer = window.setTimeout(drift, 1700 + Math.random() * 1700);
    };
    timer = window.setTimeout(drift, 450);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [dragging, world.id]);
  const normalizedRotation = ((rotation.y % 360) + 360) % 360;
  const showingBack = normalizedRotation > 90 && normalizedRotation < 270;

  return (
    <div className="learning-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className={`learning-card learn-${world.id}`} role="dialog" aria-modal="true" aria-labelledby="learning-title">
        <div className="learning-art">
          <button
            className={`learning-card-preview${dragging ? " is-dragging" : ""}`}
            style={{ "--tilt-x": `${rotation.x}deg`, "--card-turn": `${rotation.y}deg`, "--drift-x": `${idleMotion.x}px`, "--drift-y": `${idleMotion.y}px`, "--drift-z": `${idleMotion.z}px`, "--drift-rx": `${idleMotion.rx}deg`, "--drift-ry": `${idleMotion.ry}deg`, "--drift-rz": `${idleMotion.rz}deg`, "--drift-scale": idleMotion.scale }}
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;
              dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, baseX: rotation.x, baseY: rotation.y };
              movedRef.current = false;
              setIdleMotion({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, scale: 1 });
              setDragging(true);
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty("--light-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
              event.currentTarget.style.setProperty("--light-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
              const drag = dragRef.current;
              if (drag?.pointerId === event.pointerId) {
                const dx = event.clientX - drag.startX;
                const dy = event.clientY - drag.startY;
                if (Math.abs(dx) + Math.abs(dy) > 5) movedRef.current = true;
                setRotation({ x: Math.max(-32, Math.min(32, drag.baseX - dy * 0.62)), y: drag.baseY + dx * 0.95 });
              }
            }}
            onPointerUp={(event) => {
              if (dragRef.current?.pointerId !== event.pointerId) return;
              dragRef.current = null;
              setDragging(false);
              setRotation({ x: 0, y: 0 });
            }}
            onPointerCancel={() => { dragRef.current = null; movedRef.current = false; setDragging(false); setRotation({ x: 0, y: 0 }); }}
            onPointerLeave={(event) => {
              if (!dragRef.current) {
                setRotation((value) => ({ ...value, x: 0 }));
                event.currentTarget.style.setProperty("--light-x", "50%");
                event.currentTarget.style.setProperty("--light-y", "38%");
              }
            }}
            onClick={() => {
              if (movedRef.current) { movedRef.current = false; return; }
              setRotation((value) => ({ x: 0, y: value.y + 180 }));
            }}
            aria-label="按住并拖动卡片，沿鼠标轨迹旋转观察；松手后两秒回到正面，点击可翻转卡背"
            aria-pressed={showingBack}
          >
            <span className="learning-card-3d-inner">
              <span className="learning-card-face learning-card-front"><CardArtwork world={world} /></span>
              <span className="learning-card-face learning-card-back"><img src="/assets/cards/saturn-card-back.png" alt="" /><span>SOLAR ATLAS · {world.number}</span><b>太阳系星图</b></span>
            </span>
          </button>
          <span className="learning-art-count">{world.number} / 09</span>
        </div>
        <div className="learning-copy">
          <button className="close-learning" onClick={onClose} aria-label="关闭知识卡"><X size={20} /></button>
          <p className="eyebrow">{world.order} <span>·</span> {world.english}</p>
          <h2 id="learning-title">{world.name}</h2>
          <p className="learning-intro">{world.intro}</p>
          <div className="learning-facts">{facts.map(([label, key]) => <div key={key}><span>{label}</span><b>{world[key]}</b></div>)}</div>
          <blockquote><span>值得记住</span><p>{world.fact}</p></blockquote>
          <p className="composition-note">{world.composition} <span>·</span> {world.light}</p>
          <a className="source-link" href={world.source} target="_blank" rel="noreferrer">NASA 科学资料 <ArrowUpRight size={15} /></a>
          <div className="learn-controls">
            <button onClick={() => onMove(-1)} aria-label="上一张"><ArrowLeft size={18} /> 上一张</button>
            <button onClick={() => onMove(1)} aria-label="下一张">下一张 <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function App() {
  const [selected, setSelected] = useState(null);
  const currentIndex = useMemo(() => selected ? worlds.findIndex((world) => world.id === selected.id) : -1, [selected]);
  const moveCard = (step) => setSelected(worlds[(currentIndex + step + worlds.length) % worlds.length]);

  return (
    <main className="atlas-shell">
      <header className="atlas-header">
        <a className="atlas-wordmark" href="#top" aria-label="太阳系星图首页"><span className="wordmark-sun">✳</span> SOLAR ATLAS</a>
        <p>一场穿越八颗行星的收藏之旅</p>
        <span className="header-edition">FIELD GUIDE <i>·</i> 2026</span>
      </header>
      <section className="deck-scene" id="top" aria-labelledby="hero-title">
        <div className="scene-orbit orbit-one" /><div className="scene-orbit orbit-two" />
        <div className="scene-star star-a">✦</div><div className="scene-star star-b">✧</div><div className="scene-star star-c">✦</div>
        <div className="hero-copy">
          <h1 id="hero-title">认识太阳系</h1>
        </div>
        <div className="card-fan" role="group" aria-label="太阳与八颗行星卡牌">
          {worlds.map((world, index) => <PlanetCard key={world.id} world={world} index={index} onOpen={setSelected} />)}
        </div>
        <div className="deck-count"><b>09</b><span> CELESTIAL BODIES</span></div>
      </section>
      <footer className="atlas-footer"><span>从太阳开始，依次认识每个世界</span><span>探索太阳系 <i>·</i> NASA FACTS</span></footer>
      {selected && <LearningCard world={selected} onClose={() => setSelected(null)} onMove={moveCard} />}
    </main>
  );
}
