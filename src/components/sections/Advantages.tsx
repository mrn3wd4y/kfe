import Image from "next/image";

const stats = {
  zh: [
    {
      value: "01",
      label: "GIA LAI 原产地基础",
      body: "扎根 Gia Lai，一个让越南罗布斯塔拥有强劲性格的高原产区",
      image: "/images/products/solterra-real-robusta-green.jpg",
    },
    {
      value: "3+",
      label: "高原供应区域",
      body: "以 Gia Lai 为核心，延伸至周边高原产区，形成更稳定的供货基础",
      image: "/images/products/solterra-real-hero-warehouse.jpg",
    },
    {
      value: "100%",
      label: "批次责任",
      body: "每批围绕质量、分级、包装与交付节奏进行确认",
      image: "/images/products/solterra-grainpro-packaging.jpg",
    },
  ],
  en: [
    {
      value: "01",
      label: "GIA LAI ORIGIN BASE",
      body: "Rooted in Gia Lai, a Highlands origin that shapes Vietnam Robusta's bold character.",
      image: "/images/products/solterra-real-robusta-green.jpg",
    },
    {
      value: "3+",
      label: "CENTRAL HIGHLANDS SUPPLY AREAS",
      body: "Built around Gia Lai and surrounding Highlands areas for a more stable supply base.",
      image: "/images/products/solterra-real-hero-warehouse.jpg",
    },
    {
      value: "100%",
      label: "LOT RESPONSIBILITY",
      body: "Each lot is confirmed around quality, grading, packing and delivery rhythm.",
      image: "/images/products/solterra-grainpro-packaging.jpg",
    },
  ],
};

export function Advantages({
  locale,
}: {
  title: string;
  items: { title: string; body: string }[];
  locale: string;
}) {
  const isEnglish = locale === "en";
  const localizedStats = isEnglish ? stats.en : stats.zh;

  return (
    <section id="advantages" className="scroll-mt-20 bg-paper">
      <div className="gutter bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.9),transparent_34%),linear-gradient(180deg,#fbfaf6,#f4efe6)] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-[clamp(2.25rem,4.8vw,4.2rem)] font-medium leading-[1.05] text-signal">
            Solterra Coffee Export
          </h2>
          <p className="mt-4 text-[1.05rem] font-semibold italic text-ink">
            Trusted Vietnam green coffee supplier rooted in Gia Lai and the Highlands
          </p>

          <div className="mt-6 max-w-6xl space-y-5 text-[1rem] leading-8 text-ink">
            {isEnglish ? (
              <>
                <p>
                  Solterra is a Vietnam green coffee supplier rooted in Gia Lai.
                  Located in the heart of the Highlands, Gia Lai is one of Vietnam&apos;s
                  important Robusta origins, where red soil, highland climate and
                  mature harvest seasons create a bold and curious coffee character.
                </p>
                <p>
                  With Gia Lai and surrounding Highlands areas as our supply base,
                  we participate in raw material selection, lot grading, quality
                  confirmation and export packing preparation for roasters, importers
                  and coffee companies.
                </p>
                <p>
                  Solterra is not simply introducing sources. As the supplier, we are
                  responsible for lot information, quality standards, supply stability,
                  packing requirements and delivery coordination.
                </p>
              </>
            ) : (
              <>
                <p>
                  Solterra 是一家扎根于越南 Gia Lai 的咖啡生豆供应商。Gia Lai 位于高原腹地，是越南重要的罗布斯塔产区之一。这里的红土、高原气候与成熟产季，让咖啡呈现出浓郁、强劲、令人好奇的风味基础。
                </p>
                <p>
                  我们以 Gia Lai 及周边高原产区为供应基础，直接参与原料筛选、批次分级、质量确认与出口包装准备，为中国烘焙商、进口商和咖啡企业持续供应可信赖的越南咖啡生豆。
                </p>
                <p>
                  Solterra 的角色不是简单介绍货源，而是作为供应方对批次信息、质量标准、供货稳定性、包装要求和交付协调负责。我们希望客户在每一次询价、样品和合同中，都能感受到稳定、透明与长期合作的信任。
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-3">
          {localizedStats.map((stat) => (
            <article
              key={stat.label}
              className="overflow-hidden rounded-[8px] bg-white shadow-[0_16px_40px_rgba(43,33,27,0.08)]"
            >
              <div className="relative aspect-[1.8] overflow-hidden bg-surface-raised">
                <Image
                  src={stat.image}
                  alt=""
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.035]"
                />
              </div>
              <div className="flex flex-col items-center px-6 py-8 text-center sm:px-8">
                <div className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-semibold leading-none text-signal">
                  {stat.value}
                </div>
                <div className="mx-auto mt-5 max-w-[18rem] text-center text-small font-medium uppercase text-muted">
                  {stat.label}
                </div>
                <p className="mx-auto mt-3 max-w-[18rem] text-center text-small leading-6 text-ink/75">
                  {stat.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}
