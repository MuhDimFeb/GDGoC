import { useEffect } from "react";
import { Async } from "../components/Async";
import { GlassTileArtwork } from "../components/GlassTileArtwork";
import { InvitationPanel } from "../components/InvitationPanel";
import { ScaleToFit } from "../components/ScaleToFit";
import { Container, SectionLabel, Skeleton, TextLink } from "../components/ui";
import { asset } from "../lib/assets";
import { instagramUrl } from "../lib/links";
import type { Role, Value } from "../lib/types";
import { useEndpoint } from "../lib/useEndpoint";

// The API sends emoji icons; the design uses its own line icons, matched by value id.
const VALUE_ICONS: Record<string, string> = {
  "stay-curious": "value-icon-1.svg",
  "make-room": "value-icon-2.svg",
  "learn-by-building": "value-icon-3.svg",
  "give-something-back": "value-icon-4.svg",
};

export default function About() {
  const values = useEndpoint<Value[]>("/values");
  const roles = useEndpoint<Role[]>("/roles");

  useEffect(() => {
    document.title = "About • GDGoC UGM";
  }, []);

  return (
    <main>
      {/* Introduction */}
      <section>
        <Container className="flex flex-col items-center gap-10 py-20 lg:flex-row lg:gap-16">
          <div className="flex w-full min-w-0 flex-col items-start gap-[26px] lg:w-[720px] lg:shrink">
            <SectionLabel>About GDGoC UGM</SectionLabel>
            <h1 className="text-t72 font-bold text-ink">
              <span className="block">Built by students.</span>
              <span className="block text-brand-blue-dark">For what’s next.</span>
            </h1>
            <p className="text-[clamp(18px,1.6vw,22px)] leading-[1.55] text-muted">
              We’re a community of learners and makers at Universitas Gadjah Mada, connected by curiosity and the
              belief that technology can do good.
            </p>
            <p className="text-[13px] text-muted">UNIVERSITAS GADJAH MADA • 2026/2027</p>
          </div>

          <div className="w-full min-w-0 lg:w-[464px] lg:shrink-0">
            <ScaleToFit width={464} height={400}>
              <GlassTileArtwork width={464} height={400} warmTop={240} blueLeft={255.2} />
              <div className="absolute left-[52px] top-[54.37px] flex h-[252.447px] w-[380.606px] items-center justify-center">
                <div className="flex h-[216px] w-[360px] -rotate-6 items-center justify-center rounded-3xl bg-white">
                  <img
                    src={asset("about-gdgoc-mark.png")}
                    alt="Google Developer Groups on Campus logo mark"
                    width={272}
                    height={150.4}
                    className="h-[150.4px] w-[272px]"
                  />
                </div>
              </div>
            </ScaleToFit>
          </div>
        </Container>
      </section>

      {/* Our purpose */}
      <section className="bg-surface">
        <Container className="flex flex-col gap-10 py-20 lg:flex-row lg:gap-24">
          <div className="flex w-full flex-col items-start gap-5 lg:w-[400px] lg:shrink-0">
            <SectionLabel>Why we come together</SectionLabel>
            <h2 className="text-t48 font-bold text-ink">
              <span className="block">A bridge from</span>
              <span className="block">
                <span className="text-brand-blue-dark">“I wonder”</span> to
              </span>
              <span className="block bg-gradient-to-b from-brand-blue-dark from-[58.654%] to-[#6facff] bg-clip-text text-transparent">
                “I made this.”
              </span>
            </h2>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-6 leading-[1.55]">
            <p className="text-[clamp(20px,1.7vw,24px)] text-ink">
              Learning feels different when there’s someone to exchange ideas with, a problem you care about, and the
              space to give it a try.
            </p>
            <p className="text-[18px] text-muted">
              That’s the spirit of Google Developer Groups on Campus at UGM. We create room for students to explore
              technology, develop practical skills, and learn from one another.
            </p>
            <p className="text-[18px] text-muted">
              Our campus is the starting point. The questions we ask and the things we build can reach beyond it.
            </p>
          </div>
        </Container>
      </section>

      {/* Community values (API: /values) */}
      <section>
        <Container className="flex flex-col gap-10 py-[88px]">
          <div className="flex max-w-[800px] flex-col gap-[18px]">
            <SectionLabel>What guides us</SectionLabel>
            <h2 className="text-t48 font-bold text-ink">Good technology starts with good company.</h2>
          </div>
          <Async
            endpoint={values}
            skeleton={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[0, 1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[248px] rounded-3xl" />
                ))}
              </div>
            }
          >
            {(data) => (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.map((value, index) => (
                  <article
                    key={value.id}
                    className="flex flex-col items-start gap-[22px] rounded-3xl border border-line p-[26px]"
                  >
                    <div className="h-1 w-9 rounded-[2px]" style={{ backgroundColor: value.color }} />
                    <img
                      src={asset(VALUE_ICONS[value.id] ?? `value-icon-${(index % 4) + 1}.svg`)}
                      alt=""
                      width={24}
                      height={24}
                      className="size-6"
                    />
                    <h3 className="text-2xl font-bold leading-[1.12] text-ink">{value.title}</h3>
                    <p className="text-base leading-[1.55] text-muted">{value.description}</p>
                  </article>
                ))}
              </div>
            )}
          </Async>
        </Container>
      </section>

      {/* Ways to belong (API: /roles) */}
      <section>
        <Container className="flex flex-col gap-10 pb-[88px] lg:flex-row lg:gap-24">
          <div className="flex w-full flex-col items-start gap-[22px] lg:w-[400px] lg:shrink-0">
            <SectionLabel>People, not labels</SectionLabel>
            <h2 className="text-t48 font-bold text-ink">There’s more than one way to contribute.</h2>
            <p className="text-[18px] leading-[1.55] text-muted">
              You can be learning one day and helping someone else the next. A community grows through both.
            </p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-7">
            <Async
              endpoint={roles}
              skeleton={
                <div className="flex w-full flex-col gap-7">
                  {[0, 1, 2].map((i) => (
                    <Skeleton key={i} className="h-[86px]" />
                  ))}
                </div>
              }
            >
              {(data) => (
                <>
                  {data.map((role) => (
                    <div key={role.id} className="flex w-full flex-col gap-[14px]">
                      <h3 className="text-[28px] font-bold leading-[1.12] text-ink">{role.title}</h3>
                      <p className="text-[17px] leading-[1.55] text-muted">{role.description}</p>
                      <div className="h-px w-full bg-line" />
                    </div>
                  ))}
                </>
              )}
            </Async>
            <TextLink href={instagramUrl()}>Let’s talk about getting involved</TextLink>
          </div>
        </Container>
      </section>

      {/* Community commitment */}
      <section className="bg-tint-yellow">
        <Container className="flex flex-col items-start gap-8 py-14 md:flex-row md:items-center md:gap-16">
          <img src={asset("commitment-spark.svg")} alt="" width={72} height={72} className="size-[72px] shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col gap-[14px]">
            <h2 className="text-t32 font-bold text-ink">A space to learn. A responsibility to care.</h2>
            <p className="text-[18px] leading-[1.55] text-muted">
              We want every conversation and learning experience to be respectful, inclusive, and constructive. Be
              kind, give credit, and make room for people who are just getting started.
            </p>
          </div>
        </Container>
      </section>

      <InvitationPanel />
    </main>
  );
}
