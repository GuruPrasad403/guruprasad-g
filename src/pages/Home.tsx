import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { portfolioData } from "../data/portfolioData";
import { hack0to100_1, hack0to100_2, hack0to100_3 } from "../assets/hackGallery";

/* ---------------------------------- bits ---------------------------------- */

const PROMPT = "guruprasad@portfolio:~$";

function Cmd({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13px] sm:text-sm leading-relaxed">
      <span className="text-term-green font-semibold">{PROMPT}</span>{" "}
      <span className="text-term-bright">{children}</span>
    </p>
  );
}

function Section({
  id,
  command,
  children,
}: {
  id: string;
  command: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-term-border px-4 py-8 sm:px-8 sm:py-10">
      <Cmd>{command}</Cmd>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function bar(level: number) {
  const filled = Math.round(level / 5);
  return "█".repeat(filled) + "░".repeat(20 - filled);
}

const NAV = [
  ["about", "cat about.txt"],
  ["skills", "ls skills/"],
  ["experience", "cat experience.log"],
  ["projects", "ls projects/"],
  ["hackathons", "ls hackathons/"],
  ["gallery", "gallery --0-to-100"],
  ["certifications", "ls certifications/"],
  ["contact", "./contact.sh"],
] as const;

/* ------------------------------ interactive ------------------------------- */

type Line = { id: number; node: ReactNode };

const COMMANDS: Record<string, () => ReactNode> = {
  help: () => (
    <div>
      <p>Available commands:</p>
      <p className="text-term-muted">
        whoami · about · skills · experience · projects · hackathons · gallery ·
        certifications · education · contact · resume · github · linkedin · clear
      </p>
      <p className="text-term-muted">Tip: scroll down — the whole page is a terminal session.</p>
    </div>
  ),
  whoami: () => (
    <p>
      {portfolioData.personalInfo.name} — {portfolioData.personalInfo.headline}.{" "}
      {portfolioData.personalInfo.title} at {portfolioData.personalInfo.company},{" "}
      {portfolioData.personalInfo.location}.
    </p>
  ),
  about: () => <p>{portfolioData.personalInfo.bio}</p>,
  skills: () => (
    <div>
      {portfolioData.skills.map((g) => (
        <p key={g.category}>
          <span className="text-term-cyan">{g.category}:</span>{" "}
          {g.skills.map((s) => s.name).join(", ")}
        </p>
      ))}
    </div>
  ),
  experience: () => (
    <div>
      {portfolioData.experience.map((e) => (
        <p key={e.id}>
          <span className="text-term-amber">{e.period}</span> — {e.role} @ {e.company}
        </p>
      ))}
    </div>
  ),
  projects: () => (
    <div>
      {portfolioData.projects.map((p) => (
        <p key={p.id}>
          <span className="text-term-cyan">{p.title}</span> — {p.description}
        </p>
      ))}
      <p className="text-term-muted">Full details in the projects section below.</p>
    </div>
  ),
  hackathons: () => (
    <div>
      {portfolioData.education.hackathons.map((h) => (
        <p key={h.id}>
          <span className="text-term-cyan">{h.title}</span> — {h.result}
        </p>
      ))}
    </div>
  ),
  gallery: () => <p>Photos from the 0 to 100 hackathon — see the gallery section below. 📸</p>,
  certifications: () => (
    <div>
      {portfolioData.certifications.map((c) => (
        <p key={c.id}>
          {c.title} — {c.issuer} ({c.date})
        </p>
      ))}
    </div>
  ),
  education: () => (
    <p>
      {portfolioData.education.degree}, {portfolioData.education.institution} (
      {portfolioData.education.period}). Currently pursuing MCA (2025–27), Bangalore
      University.
    </p>
  ),
  contact: () => (
    <p>
      email: {portfolioData.personalInfo.email} · phone: {portfolioData.personalInfo.phone}{" "}
      · Ballari, Karnataka. Or use the contact section at the bottom.
    </p>
  ),
  resume: () => (
    <p>
      Opening resume…{" "}
      <a className="text-term-cyan underline" href={portfolioData.personalInfo.resumeUrl} target="_blank" rel="noreferrer">
        Guruprasad_G.pdf
      </a>
    </p>
  ),
  github: () => (
    <p>
      <a className="text-term-cyan underline" href={portfolioData.personalInfo.github} target="_blank" rel="noreferrer">
        {portfolioData.personalInfo.github}
      </a>
    </p>
  ),
  linkedin: () => (
    <p>
      <a className="text-term-cyan underline" href={portfolioData.personalInfo.linkedin} target="_blank" rel="noreferrer">
        {portfolioData.personalInfo.linkedin}
      </a>
    </p>
  ),
};

function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>([
    {
      id: 0,
      node: (
        <p className="text-term-muted">
          Interactive shell — type <span className="text-term-bright">help</span> and press
          Enter. Try <span className="text-term-bright">sudo hire-me</span>.
        </p>
      ),
    },
  ]);
  const [value, setValue] = useState("");
  const idRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const echo: Line = {
      id: idRef.current++,
      node: (
        <p>
          <span className="text-term-green font-semibold">{PROMPT}</span>{" "}
          <span className="text-term-bright">{raw}</span>
        </p>
      ),
    };
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    let out: ReactNode;
    if (cmd === "") {
      out = null;
    } else if (cmd === "sudo hire-me" || cmd === "sudo hire me") {
      out = (
        <p>
          Permission granted. ✅ Reach me at{" "}
          <span className="text-term-cyan">{portfolioData.personalInfo.email}</span> — I
          reply fast.
        </p>
      );
    } else if (COMMANDS[cmd]) {
      out = COMMANDS[cmd]();
      if (cmd === "resume") window.open(portfolioData.personalInfo.resumeUrl, "_blank");
    } else {
      out = (
        <p>
          command not found: {cmd}. Type <span className="text-term-bright">help</span> to
          see what I can do.
        </p>
      );
    }
    setLines((prev) => [...prev, echo, ...(out ? [{ id: idRef.current++, node: out }] : [])]);
  };

  return (
    <div
      className="border border-term-border bg-black/40"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="h-56 space-y-2 overflow-y-auto px-4 py-3 text-[13px] leading-relaxed sm:text-sm"
      >
        {lines.map((l) => (
          <div key={l.id}>{l.node}</div>
        ))}
      </div>
      <form
        className="flex items-center gap-2 border-t border-term-border px-4 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
          setValue("");
        }}
      >
        <span className="shrink-0 text-[13px] font-semibold text-term-green sm:text-sm">
          {PROMPT}
        </span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent text-[13px] text-term-bright caret-term-green outline-none sm:text-sm"
          placeholder="type a command…"
          aria-label="Terminal input"
          autoComplete="off"
          spellCheck={false}
        />
        <span className="term-cursor inline-block h-4 w-2 shrink-0 bg-term-green" />
      </form>
    </div>
  );
}

/* --------------------------------- page ----------------------------------- */

const GALLERY = [
  { src: hack0to100_1, caption: "locked in — code on both screens" },
  { src: hack0to100_2, caption: "team.exe — building together" },
  { src: hack0to100_3, caption: "0 to 100 — shipped under deadline" },
];

export default function Home() {
  const info = portfolioData.personalInfo;

  return (
    <div className="min-h-screen bg-term-bg px-2 py-3 sm:px-4 sm:py-6">
      <div className="term-scanlines mx-auto w-full max-w-5xl border border-term-border bg-term-panel shadow-[0_0_60px_rgba(34,197,94,0.08)]">
        {/* window chrome */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-term-border bg-[#0d1110]/95 px-4 py-3 backdrop-blur">
          <span className="flex gap-2">
            <i className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
            <i className="block h-3 w-3 rounded-full bg-[#febc2e]" />
            <i className="block h-3 w-3 rounded-full bg-[#28c840]" />
          </span>
          <span className="truncate text-xs text-term-muted sm:text-[13px]">
            guruprasad@portfolio: ~/home — bash
          </span>
          <span className="ml-auto hidden shrink-0 items-center gap-2 text-[11px] text-term-green sm:flex">
            <i className="block h-2 w-2 rounded-full bg-term-green term-cursor" />
            session live
          </span>
        </header>

        {/* nav as commands */}
        <nav className="flex flex-wrap gap-x-5 gap-y-2 border-b border-term-border px-4 py-3 text-xs sm:px-8 sm:text-[13px]">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-term-muted transition-colors hover:text-term-bright">
              <span className="text-term-green">$</span> {label}
            </a>
          ))}
        </nav>

        {/* hero */}
        <div className="px-4 py-10 sm:px-8 sm:py-14">
          <div className="term-rise">
            <Cmd>whoami</Cmd>
          </div>
          <h1
            className="term-glow term-rise mt-5 font-extrabold uppercase leading-none tracking-tight text-term-green"
            style={{ fontSize: "clamp(2rem, 8.5vw, 4.8rem)", animationDelay: "80ms" }}
          >
            {info.name}
          </h1>
          <p className="term-rise mt-4 text-sm text-term-bright sm:text-lg" style={{ animationDelay: "160ms" }}>
            {info.headline}
          </p>
          <div className="term-rise mt-6 space-y-1.5 text-[13px] text-term-muted sm:text-sm" style={{ animationDelay: "240ms" }}>
            <p>
              <span className="text-term-cyan">role</span> → {info.title} @ {info.company}
            </p>
            <p>
              <span className="text-term-cyan">also</span> → AI Champion, Indegene (mentoring
              30+ teammates on AI workflows)
            </p>
            <p>
              <span className="text-term-cyan">base</span> → {info.location}, India
            </p>
            <p>
              <span className="text-term-cyan">status</span> →{" "}
              <span className="text-term-green">open to new opportunities</span>
            </p>
          </div>
          <div className="term-rise mt-8 flex flex-wrap gap-3 text-xs sm:text-[13px]" style={{ animationDelay: "320ms" }}>
            <a
              href={info.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-term-green bg-term-green px-4 py-2 font-semibold text-black transition-colors hover:bg-term-bright"
            >
              $ download resume.pdf
            </a>
            <a
              href={info.github}
              target="_blank"
              rel="noreferrer"
              className="border border-term-border px-4 py-2 text-term-bright transition-colors hover:border-term-green"
            >
              $ open github
            </a>
            <a
              href={info.linkedin}
              target="_blank"
              rel="noreferrer"
              className="border border-term-border px-4 py-2 text-term-bright transition-colors hover:border-term-green"
            >
              $ open linkedin
            </a>
          </div>
          <div className="term-rise mt-10" style={{ animationDelay: "400ms" }}>
            <InteractiveTerminal />
          </div>
        </div>

        {/* about */}
        <Section id="about" command="cat about.txt">
          <p className="max-w-3xl text-[13px] leading-relaxed text-[#b9d4be] sm:text-sm">
            {info.bio}
          </p>
          <p className="mt-4 text-[13px] text-term-muted sm:text-sm">
            <span className="text-term-amber">stack_of_choice</span> = React · Node.js ·
            TypeScript · MongoDB · AEM · GenAI tooling
          </p>
        </Section>

        {/* skills */}
        <Section id="skills" command="ls skills/ && cat levels.txt">
          <div className="grid gap-8 md:grid-cols-3">
            {portfolioData.skills.map((group) => (
              <div key={group.category}>
                <p className="text-term-cyan">
                  {group.category.toLowerCase().replace(/[^a-z]+/g, "_")}/
                </p>
                <ul className="mt-3 space-y-2.5 text-[12px] sm:text-[13px]">
                  {group.skills.map((s) => (
                    <li key={s.name}>
                      <span className="text-term-bright">{s.name}</span>
                      <br />
                      <span className="text-term-dim">{bar(s.level)}</span>{" "}
                      <span className="text-term-muted">{s.level}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[12px] leading-loose text-term-muted sm:text-[13px]">
            <span className="text-term-cyan">also_in_path:</span>{" "}
            {portfolioData.techStack.join(" · ")}
          </p>
        </Section>

        {/* experience */}
        <Section id="experience" command="cat experience.log">
          <div className="space-y-8">
            {portfolioData.experience.map((e) => (
              <article key={e.id}>
                <p className="text-[13px] sm:text-sm">
                  <span className="text-term-amber">[{e.period}]</span>{" "}
                  <span className="font-semibold text-term-bright">{e.role}</span>{" "}
                  <span className="text-term-muted">@ {e.company}</span>
                </p>
                <ul className="mt-2.5 space-y-1.5 text-[13px] leading-relaxed text-[#b9d4be] sm:text-sm">
                  {e.achievements.map((a, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0 text-term-green">→</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* projects */}
        <Section id="projects" command="ls projects/">
          <div className="grid gap-5 md:grid-cols-2">
            {portfolioData.projects.map((p) => (
              <article key={p.id} className="border border-term-border bg-black/30 p-4 sm:p-5">
                <p className="text-term-cyan">
                  ./{p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                </p>
                <h3 className="mt-2 font-semibold text-term-bright">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#b9d4be]">{p.description}</p>
                <ul className="mt-3 space-y-1 text-[12px] text-term-muted sm:text-[13px]">
                  {p.features.slice(0, 3).map((f, i) => (
                    <li key={i}>· {f}</li>
                  ))}
                </ul>
                <p className="mt-3 text-[12px] text-term-amber sm:text-[13px]">
                  [{p.techStack.join(" · ")}]
                </p>
                <p className="mt-4 flex gap-4 text-[13px]">
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-term-green underline-offset-4 hover:underline">
                    [github]
                  </a>
                  {p.liveUrl && p.liveUrl !== "#" && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-term-green underline-offset-4 hover:underline">
                      [live demo]
                    </a>
                  )}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-[13px] text-term-muted sm:text-sm">
            <span className="text-term-cyan">enterprise_aem_work/</span> — production AEM
            sites I build and maintain at Indegene:
          </p>
          <ul className="mt-3 grid gap-2 text-[13px] sm:grid-cols-2 sm:text-sm">
            {portfolioData.aemProjects.map((a) => (
              <li key={a.id} className="border border-term-border bg-black/20 px-3 py-2">
                {a.url ? (
                  <a href={a.url} target="_blank" rel="noreferrer" className="text-term-bright hover:text-term-green">
                    {a.title}
                  </a>
                ) : (
                  <span className="text-term-bright">{a.title}</span>
                )}{" "}
                <span className="text-term-muted">— {a.description}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* education + hackathons */}
        <Section id="hackathons" command="cat education.txt && ls hackathons/">
          <p className="text-[13px] leading-relaxed text-[#b9d4be] sm:text-sm">
            <span className="text-term-bright">{portfolioData.education.degree}</span> —{" "}
            {portfolioData.education.institution} ({portfolioData.education.period})
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-term-muted sm:text-sm">
            {portfolioData.education.concurrentWork}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-[#b9d4be] sm:text-sm">
            Currently pursuing <span className="text-term-bright">MCA (2025–27)</span> —
            Bangalore University, VSIMS Bengaluru.
          </p>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {portfolioData.education.hackathons.map((h) => (
              <article key={h.id} className="border border-term-border bg-black/30">
                {h.image && (
                  <img src={h.image} alt={h.title} className="h-36 w-full object-cover opacity-90" loading="lazy" />
                )}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-term-bright">{h.title}</h3>
                  <p className="mt-1 text-[12px] text-term-amber">
                    {h.result}
                    {h.prize ? ` · ${h.prize}` : ""}
                  </p>
                  <p className="mt-1 text-[12px] text-term-muted">{h.location}</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#b9d4be]">{h.description}</p>
                  <p className="mt-3 flex gap-4 text-[12px]">
                    {h.githubUrl && (
                      <a href={h.githubUrl} target="_blank" rel="noreferrer" className="text-term-green hover:underline">
                        [github]
                      </a>
                    )}
                    {h.videoUrl && (
                      <a href={h.videoUrl} target="_blank" rel="noreferrer" className="text-term-green hover:underline">
                        [demo video]
                      </a>
                    )}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* gallery — the new pics */}
        <Section id="gallery" command="gallery --hack '0 to 100'">
          <p className="text-[13px] text-term-muted sm:text-sm">
            From the <span className="text-term-bright">0 to 100 Online Global Hackathon</span>{" "}
            — two developers, two laptops, one deadline. Shot on the floor, mid-build.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {GALLERY.map((g, i) => (
              <figure key={g.src} className="border border-term-border bg-black/30">
                <img
                  src={g.src}
                  alt={`0 to 100 hackathon — ${g.caption}`}
                  className={`w-full object-cover ${i === 0 ? "aspect-[3/4]" : "aspect-[4/3] sm:mt-10"}`}
                  loading="lazy"
                />
                <figcaption className="px-3 py-2 text-[12px] text-term-muted">
                  <span className="text-term-green">img_{String(i + 1).padStart(2, "0")}.jpg</span>{" "}
                  — {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        {/* certifications */}
        <Section id="certifications" command="ls certifications/">
          <ul className="space-y-2.5 text-[13px] sm:text-sm">
            {portfolioData.certifications.map((c) => (
              <li key={c.id}>
                <span className="text-term-green">✓</span>{" "}
                <span className="text-term-bright">{c.title}</span>{" "}
                <span className="text-term-muted">
                  — {c.issuer} · {c.date}
                </span>
              </li>
            ))}
          </ul>
          {portfolioData.certifications
            .filter((c) => c.image)
            .map((c) => (
              <figure key={c.id} className="mt-6 max-w-xl border border-term-border bg-black/30 p-3">
                <img src={c.image} alt={c.title} className="w-full" loading="lazy" />
                <figcaption className="pt-2 text-[12px] text-term-muted">
                  {c.title} — {c.issuer}, {c.date}
                </figcaption>
              </figure>
            ))}
        </Section>

        {/* contact */}
        <Section id="contact" command="./contact.sh">
          <div className="space-y-1.5 text-[13px] sm:text-sm">
            <p>
              <span className="text-term-cyan">email</span> →{" "}
              <a href={`mailto:${info.email}`} className="text-term-bright hover:text-term-green">
                {info.email}
              </a>
            </p>
            <p>
              <span className="text-term-cyan">phone</span> → {info.phone}
            </p>
            <p>
              <span className="text-term-cyan">github</span> →{" "}
              <a href={info.github} target="_blank" rel="noreferrer" className="text-term-bright hover:text-term-green">
                github.com/GuruPrasad403
              </a>
            </p>
            <p>
              <span className="text-term-cyan">linkedin</span> →{" "}
              <a href={info.linkedin} target="_blank" rel="noreferrer" className="text-term-bright hover:text-term-green">
                linkedin.com/in/guruprasad-g-react
              </a>
            </p>
          </div>
          <p className="mt-6 text-[13px] text-term-muted sm:text-sm">
            # fastest way to reach me: email or LinkedIn. I reply fast.
          </p>
          <a
            href={`mailto:${info.email}?subject=Opportunity%20for%20Guruprasad%20G`}
            className="mt-4 inline-block border border-term-green bg-term-green px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-term-bright sm:text-[13px]"
          >
            $ send_message --now
          </a>
        </Section>

        {/* footer */}
        <footer className="border-t border-term-border px-4 py-6 sm:px-8">
          <Cmd>
            exit <span className="term-cursor ml-1 inline-block h-4 w-2 translate-y-0.5 bg-term-green" />
          </Cmd>
          <p className="mt-3 text-[12px] text-term-muted">
            © 2026 Guruprasad G · built with React + TypeScript · rendered in a terminal,
            because GUIs are optional.
          </p>
        </footer>
      </div>
    </div>
  );
}
