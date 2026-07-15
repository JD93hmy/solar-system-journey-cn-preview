import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Circle, Clock, Planet, Thermometer } from "@phosphor-icons/react";

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
].map(([id, name, english, order, distance, diameter, year, temperature, composition, light, intro, fact, source]) => ({ id, name, english, order, distance, diameter, year, temperature, composition, light, intro, fact, source, image: `/assets/planets/${id}.png` }));

function FactRow({ icon: Icon, label, value }) {
  return <div className="fact-row"><Icon aria-hidden="true" weight="light" /><span>{label}</span><strong>{value}</strong></div>;
}

function WorldSection({ world, index }) {
  const next = worlds[index + 1];
  return (
    <section className={`world-section world-${world.id}`} id={world.id} data-world={world.id}>
      <div className="world-copy">
        <p className="eyebrow">{world.order} · {world.english}</p>
        <h1>{index === 0 ? <>从太阳出发，<br />穿越八颗行星</> : world.name}</h1>
        <p className="intro">{world.intro}</p>
        {index === 0 && <button className="primary-action" onClick={() => document.querySelector("#mercury")?.scrollIntoView({ behavior: "smooth" })}>开始太阳系之旅 <ArrowRight weight="light" /></button>}
        <div className="facts" aria-label={`${world.name}关键数据`}>
          <FactRow icon={Planet} label="距太阳" value={world.distance} />
          <FactRow icon={Circle} label="直径" value={world.diameter} />
          <FactRow icon={Clock} label={world.id === "sun" ? "自转" : "公转周期"} value={world.year} />
          <FactRow icon={Thermometer} label="温度" value={world.temperature} />
        </div>
        <div className="memory-fact"><span>值得记住</span><p>{world.fact}</p></div>
        <a className="source-link" href={world.source} target="_blank" rel="noreferrer">查看 NASA 科学资料 <ArrowRight weight="light" /></a>
      </div>
      <div className="world-stage" aria-label={`${world.name}天体图像`}>
        <img src={world.image} alt={`${world.name}真实质感天体图像`} />
        <div className="stage-caption"><span>{world.composition}</span><strong>{world.light}</strong></div>
        <div className="distance-scale" aria-label="与太阳的距离示意"><span>与太阳的距离</span><div className="scale-line"><i style={{ width: `${Math.max(4, ((index + 1) / worlds.length) * 100)}%` }} /></div><b>{world.distance}</b></div>
      </div>
      {next && <button className="next-world" onClick={() => document.querySelector(`#${next.id}`)?.scrollIntoView({ behavior: "smooth" })}><span>下一站</span><strong>{next.name}</strong><ArrowDown weight="light" /></button>}
    </section>
  );
}

export function App() {
  const [active, setActive] = useState("sun");
  const [progress, setProgress] = useState(0);
  const activeIndex = useMemo(() => worlds.findIndex((world) => world.id === active), [active]);
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll("[data-world]")];
    observerRef.current = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.dataset.world);
    }, { threshold: [0.35, 0.55, 0.75] });
    sections.forEach((section) => observerRef.current.observe(section));
    const onScroll = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? window.scrollY / max : 0); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observerRef.current?.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const jumpTo = (id) => document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="app-shell">
      <aside className="journey-rail" aria-label="太阳系旅程导航">
        <button className="brand" onClick={() => jumpTo("sun")}>太阳系</button>
        <div className="rail-progress" aria-hidden="true"><i style={{ height: `${progress * 100}%` }} /></div>
        <nav>{worlds.map((world) => <button key={world.id} className={active === world.id ? "active" : ""} onClick={() => jumpTo(world.id)} aria-current={active === world.id ? "step" : undefined}><img src={world.image} alt="" /><span>{world.name}</span></button>)}</nav>
        <div className="rail-count"><b>{String(activeIndex + 1).padStart(2, "0")}</b><span>/ 09</span></div>
      </aside>
      <main>{worlds.map((world, index) => <WorldSection key={world.id} world={world} index={index} />)}</main>
    </div>
  );
}
