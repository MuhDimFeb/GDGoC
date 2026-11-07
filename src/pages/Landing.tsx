import { useEffect, useState } from "react";
import { Async } from "../components/Async";
import { DevelopmentArtwork, ResearchArtwork, TrackArtwork, trackTint } from "../components/Artworks";
import { GlassTileArtwork } from "../components/GlassTileArtwork";
import { InvitationPanel } from "../components/InvitationPanel";
import { ScaleToFit } from "../components/ScaleToFit";
import { TrackModal } from "../components/TrackModal";
import { Button, Container, SectionLabel, Skeleton, TextLink } from "../components/ui";
import { asset } from "../lib/assets";
import { cn } from "../lib/cn";
import { instagramUrl } from "../lib/links";
import type { Faq, Track } from "../lib/types";
import { useEndpoint } from "../lib/useEndpoint";

// "Learning formats" and the 3-step "Getting started" journey are fixed copy from the design:
// the API's /formats (4 items) and /journey (4 steps) don't match the 3-column layouts.
const FORMATS = [
  {
    icon: "format-1.svg",
    title: "Study together",
    body: "Work through foundations in peer learning sessions. Bring your questions; leave with a next step.",
    detail: "Study groups & guided practice",
  },
  {
    icon: "format-2.svg",
    title: "Try it hands-on",
    body: "Explore a tool or technique in a workshop, then put it to work in a small experiment.",
    detail: "Workshops & technical sessions",
  },
  {
    icon: "format-3.svg",
    title: "Share the process",
    body: "Exchange feedback, explain your decisions, and learn from different ways of thinking.",
    detail: "Project circles & sharing sessions",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Follow your curiosity",
    body: "Explore the tracks and find a topic you want to understand better.",
  },
  {
    number: "02",
    title: "Learn alongside others",
    body: "Join a learning opportunity, ask a question, and share your perspective.",
  },
  {
    number: "03",
    title: "Turn learning into action",
    body: "Practice through a project, exchange feedback, and pass something on.",
  },
];

export default function Landing() {
  const tracks = useEndpoint<Track[]>("/tracks");
  const faqs = useEndpoint<Faq[]>("/faqs");
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  useEffect(() => {
    document.title = "GDGoC UGM • Big ideas. Built together.";
  }, []);

  return (
    <main>
      {/* Hero */}
      <section>
        <Container className="flex flex-col items-center gap-10 pb-16 pt-[72px] lg:flex-row xl:pr-16">
          <div className="flex w-full min-w-0 flex-col items-start gap-7 lg:flex-1">
            <SectionLabel>GDGoC UGM • 2026/2027</SectionLabel>
            <h1 className="text-t80 font-bold text-ink">
              Big ideas.
              <span className="block text-brand-blue-dark">Built together.</span>
            </h1>
            <p className="text-[21px] leading-[1.55] text-muted">
              A place for curious minds at <strong className="font-bold">Universitas Gadjah Mada</strong> to learn,
              connect, and build technology that matters.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button to="/#tracks">Find your learning track</Button>
              <Button to="/about" variant="secondary">
                Get to know us
              </Button>
            </div>
            <div className="flex items-center gap-[10px]">
              <img src={asset("community-colors.svg")} alt="" width={55} height={16} className="h-4 w-[55px]" />
              <p className="text-sm text-muted">Different backgrounds. A shared curiosity.</p>
            </div>
          </div>

          <div className="w-full min-w-0 lg:flex-1">
            <ScaleToFit width={620} height={530}>
              <GlassTileArtwork width={620} height={530} warmTop={318} blueLeft={341} />
              <ResearchArtwork prefix="hero-research" className="left-[18px] top-[2px] size-[242.873px]" />
              <DevelopmentArtwork prefix="hero-dev" className="left-[186px] top-[85px] size-[392.883px]" />
              <div className="absolute left-[300px] top-[455px] flex items-center gap-2 rounded-full bg-white px-4 py-[10px]">
                <img src={asset("status-marker.svg")} alt="" width={8} height={8} className="size-2" />
                <p className="whitespace-nowrap text-xs text-muted">
                  Built on <strong className="font-bold">curiosity.</strong> Rooted in{" "}
                  <strong className="font-bold">UGM.</strong>
                </p>
              </div>
              <div className="absolute left-[24px] top-[325.81px] flex h-[86.677px] w-[252.105px] items-center justify-center">
                <div className="-rotate-[7deg] rounded-lg border border-line bg-white px-5 py-[14px]">
                  <p className="whitespace-nowrap text-[23px] font-bold text-ink">hello, possibilities_</p>
                </div>
              </div>
            </ScaleToFit>
          </div>
        </Container>
      </section>

      {/* Community promise */}
      <section className="border-y border-line">
        <Container className="flex flex-col gap-4 py-[26px] md:flex-row md:justify-between">
          {[
            ["bg-brand-blue", "Learn by doing"],
            ["bg-brand-red", "Connect across disciplines"],
            ["bg-brand-green", "Build with purpose"],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center gap-[14px]">
              <span className={cn("size-2 shrink-0", color)} />
              <p className="text-[18px] font-medium text-ink">{label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Community introduction */}
      <section>
        <Container className="flex flex-col gap-10 py-[88px] lg:flex-row lg:gap-24">
          <div className="flex w-full flex-col items-start gap-5 lg:w-[490px] lg:shrink-0">
            <SectionLabel>A campus. A community.</SectionLabel>
            <h2 className="text-t48 font-bold text-ink">
              <span className="block">Not just learning tech.</span>
              <span className="block">Finding your people.</span>
            </h2>
            <TextLink to="/about">More about GDGoC UGM</TextLink>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
            <p className="text-[21px] leading-[1.55] text-muted">
              Google Developer Groups on Campus, Universitas Gadjah Mada brings students together around one simple
              idea: we can go <strong className="font-bold">further</strong> when we{" "}
              <strong className="font-bold">learn</strong> with each other.
            </p>
            <p className="text-[18px] leading-[1.55] text-muted">
              From your first line of code to your next product idea, there’s room to ask questions, share what you
              know, and try something new.
            </p>
            <ul className="flex flex-wrap gap-3">
              {["Student-led", "Peer-powered", "Curiosity-first"].map((label) => (
                <li key={label} className="rounded-full bg-surface px-[14px] py-2 text-[13px] font-bold text-muted">
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Learning tracks (API: /tracks) */}
      <section id="tracks">
        <Container className="flex flex-col gap-9 pb-[88px] pt-4">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="flex max-w-[800px] flex-col gap-[18px]">
              <SectionLabel>Find your starting point</SectionLabel>
              <h2 className="text-t48 font-bold text-ink">Many interests. One shared journey.</h2>
              <p className="text-[18px] leading-[1.55] text-muted">
                Follow what excites you. Explore a track, then connect the dots with others.
              </p>
            </div>
            <TextLink to="/#tracks" className="shrink-0">
              See the overview
            </TextLink>
          </div>

          <Async
            endpoint={tracks}
            skeleton={
              <div className="grid gap-6 lg:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-[539px] rounded-3xl" />
                ))}
              </div>
            }
          >
            {(data) => (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.map((track) => (
                  <article key={track.id} className="flex flex-col overflow-hidden rounded-3xl border border-line">
                    <div className={cn("relative h-[232px] shrink-0", trackTint(track.id))}>
                      <TrackArtwork id={track.id} />
                    </div>
                    <div className="flex flex-1 flex-col items-start gap-[18px] p-7">
                      <p className="text-[11px] font-medium uppercase text-brand-blue-dark">{track.tagline}</p>
                      <h3 className="text-[28px] font-bold leading-[1.12] text-ink">{track.name}</h3>
                      <p className="text-base leading-[1.55] text-muted">{track.description}</p>
                      <div className="h-px w-full bg-line" />
                      <p className="text-[13px] leading-[1.5] text-muted">{track.skills.join(" · ")}</p>
                      <TextLink onClick={() => setSelectedTrack(track)}>Explore this track</TextLink>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Async>
        </Container>
      </section>

      {/* Learning formats */}
      <section id="formats" className="bg-surface">
        <Container className="flex flex-col gap-10 py-20">
          <div className="flex max-w-[800px] flex-col gap-[18px]">
            <SectionLabel>More than a classroom</SectionLabel>
            <h2 className="text-t48 font-bold text-ink">Less watching. More making.</h2>
            <p className="text-[18px] leading-[1.55] text-muted">
              Learn in a way that turns a new concept into something you can actually use.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FORMATS.map((format) => (
              <article key={format.title} className="flex flex-col items-start gap-5 rounded-3xl bg-white p-8">
                <img src={asset(format.icon)} alt="" width={24} height={24} className="size-6" />
                <h3 className="text-[28px] font-bold leading-[1.12] text-ink">{format.title}</h3>
                <p className="text-base leading-[1.55] text-muted">{format.body}</p>
                <div className="h-px w-full bg-line" />
                <p className="text-[13px] font-medium text-brand-blue-dark">{format.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Project possibility */}
      <section>
        <Container className="flex flex-col items-center gap-10 py-[88px] lg:flex-row lg:gap-16">
          <div className="flex w-full flex-col gap-6 rounded-[32px] bg-tint-yellow p-6 sm:p-10 lg:w-[592px] lg:shrink-0">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted">IDEA → PROTOTYPE</p>
              <p className="text-2xl text-brand-blue-dark" aria-hidden="true">
                {"</>"}
              </p>
            </div>
            <div className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-[26px]">
              <img src={asset("browser-chrome.svg")} alt="" width={36} height={8} className="h-2 w-9" />
              <p className="text-[clamp(24px,2.3vw,32px)] font-bold leading-[1.12] text-ink">
                <span className="block">A little less friction.</span>
                <span className="block">A better campus day.</span>
              </p>
              <div className="flex gap-3">
                {[
                  ["bg-tint-blue", "Discover"],
                  ["bg-tint-green", "Connect"],
                  ["bg-tint-red", "Share"],
                ].map(([tint, label]) => (
                  <div key={label} className={cn("flex-1 rounded-xl p-4", tint)}>
                    <p className="text-[13px] font-bold text-black">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[13px] leading-[1.55] text-muted">
                Start with a student need. Build a small, useful solution.
              </p>
            </div>
            <p className="text-[11px] text-muted">EXAMPLE PROJECT BRIEF • NOT A LAUNCHED PRODUCT</p>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
            <SectionLabel>Build something that matters</SectionLabel>
            <h2 className="text-t48 font-bold text-ink">Your next project could start on campus.</h2>
            <p className="text-[18px] leading-[1.55] text-muted">
              What if finding a study partner, sharing resources, or navigating campus felt easier? Small, familiar
              problems can be the beginning of meaningful work.
            </p>
            <p className="text-base leading-[1.55] text-muted">
              Bring research, design, and development together. Try an idea, get feedback, and make the next version
              better.
            </p>
            <TextLink to="/#formats">Explore project-based learning</TextLink>
          </div>
        </Container>
      </section>

      {/* Getting started */}
      <section>
        <Container className="flex flex-col gap-10 pb-[88px] pt-2">
          <div className="flex max-w-[800px] flex-col gap-[18px]">
            <SectionLabel>Make your first move</SectionLabel>
            <h2 className="text-t48 font-bold text-ink">You don’t need to have it all figured out.</h2>
          </div>
          <ol className="grid gap-10 md:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.number} className="flex flex-col items-start gap-5">
                <p className="font-inter text-[44px] font-bold leading-none text-brand-blue-dark">{step.number}</p>
                <div className="h-px w-full bg-line" />
                <h3 className="text-[25px] font-bold leading-[1.12] text-ink">{step.title}</h3>
                <p className="text-base leading-[1.55] text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Belonging statement */}
      <section className="bg-tint-green">
        <Container className="flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:gap-16">
          <img src={asset("community-spark.svg")} alt="" width={100} height={100} className="size-[100px] shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h2 className="text-t40 font-bold text-ink">
              <span className="block">Different majors. Different starting points.</span>
              <span className="block">A place for all of them.</span>
            </h2>
            <p className="text-[18px] leading-[1.55] text-muted">
              You don’t have to be the most experienced person in the room. Curiosity, kindness, and a willingness to
              learn are a good place to start.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ (API: /faqs) */}
      <section>
        <Container className="flex flex-col gap-10 py-[88px] lg:flex-row lg:gap-24">
          <div className="flex w-full flex-col items-start gap-5 lg:w-[400px] lg:shrink-0">
            <SectionLabel>A few good questions</SectionLabel>
            <h2 className="text-t48 font-bold text-ink">
              <span className="block">Wondering where</span>
              <span className="block">to begin?</span>
            </h2>
            <TextLink href={instagramUrl()}>Ask us a question</TextLink>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <Async
              endpoint={faqs}
              skeleton={[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-[104px]" />
              ))}
            >
              {(data) => data.slice(0, 3).map((faq) => <FaqItem key={faq.id} faq={faq} />)}
            </Async>
          </div>
        </Container>
      </section>

      <InvitationPanel />

      {selectedTrack && <TrackModal track={selectedTrack} onClose={() => setSelectedTrack(null)} />}
    </main>
  );
}

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(true);
  const panelId = `faq-${faq.id}`;

  return (
    <div className="flex flex-col gap-[14px]">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center gap-6 text-left text-xl font-medium text-ink"
        >
          <span className="flex-1">{faq.question}</span>
          <img
            src={asset("disclosure.svg")}
            alt=""
            width={24}
            height={24}
            className={cn("size-6 shrink-0 transition-transform duration-300", !open && "rotate-180")}
          />
        </button>
      </h3>
      <div
        id={panelId}
        aria-hidden={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-300",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <p className="overflow-hidden text-base leading-[1.55] text-muted">{faq.answer}</p>
      </div>
      <div className="h-px w-full bg-line" />
    </div>
  );
}
