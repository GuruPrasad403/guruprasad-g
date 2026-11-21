import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { portfolioData } from "../data/portfolioData";
import { hack0to100_1, hack0to100_2, hack0to100_3 } from "../assets/hackGallery";

/* ------------------------------ virtual FS -------------------------------- */

type FSNode =
  | { type: "dir"; children: Record<string, FSNode> }
  | { type: "file"; render: () => ReactNode }
  | { type: "image"; src: string; caption: string }
  | { type: "link"; url: string; label: string };

const info = portfolioData.personalInfo;

function bar(level: number) {
  const filled = Math.round(level / 5);
  return "█".repeat(filled) + "░".repeat(20 - filled);
}

function skillFile(group: (typeof portfolioData.skills)[number]): FSNode {
  return {
    type: "file",
    render: () => (
      <div>
        {group.skills.map((s) => (
          <p key={s.name}>
            <span className="text-[#e6e6e6]">{s.name.padEnd(28, " ")}</span>
            <span className="text-[#4ade80]">{bar(s.level)}</span>{" "}
            <span className="text-[#888]">{s.level}%</span>
          </p>
        ))}
      </div>
    ),
  };
}

function projectFile(p: (typeof portfolioData.projects)[number]): FSNode {
  return {
    type: "file",
    render: () => (
      <div className="max-w-3xl">
        <p className="font-bold text-[#e6e6e6]"># {p.title}</p>
        <p className="mt-1">{p.longDescription}</p>
        <p className="mt-2 text-[#fbbf24]">tech: {p.techStack.join(" · ")}</p>
        <ul className="mt-2">
          {p.features.map((f, i) => (
            <li key={i}>- {f}</li>
          ))}
        </ul>
        <p className="mt-2">
          github:{" "}
          <a className="text-[#22d3ee] underline" href={p.githubUrl} target="_blank" rel="noreferrer">
            {p.githubUrl}
          </a>
          {p.liveUrl && p.liveUrl !== "#" && (
            <>
              {"  "}live:{" "}
              <a className="text-[#22d3ee] underline" href={p.liveUrl} target="_blank" rel="noreferrer">
                {p.liveUrl}
              </a>
            </>
          )}
        </p>
      </div>
    ),
  };
}

const FS: FSNode = {
  type: "dir",
  children: {
    "about.txt": {
      type: "file",
      render: () => (
        <div className="max-w-3xl space-y-2">
          <p>{info.bio}</p>
          <p className="text-[#888]">
            stack_of_choice = React · Node.js · TypeScript · MongoDB · AEM · GenAI tooling
          </p>
        </div>
      ),
    },
    skills: {
      type: "dir",
      children: {
        "frontend.txt": skillFile(portfolioData.skills[0]),
        "backend.txt": skillFile(portfolioData.skills[1]),
        "enterprise-ai.txt": skillFile(portfolioData.skills[2]),
      },
    },
    "experience.log": {
      type: "file",
      render: () => (
        <div className="space-y-4">
          {portfolioData.experience.map((e) => (
            <div key={e.id}>
              <p>
                <span className="text-[#fbbf24]">[{e.period}]</span>{" "}
                <span className="font-bold text-[#e6e6e6]">{e.role}</span>{" "}
                <span className="text-[#888]">@ {e.company}</span>
              </p>
              {e.achievements.map((a, i) => (
                <p key={i} className="pl-4">
                  <span className="text-[#4ade80]">→</span> {a}
                </p>
              ))}
            </div>
          ))}
        </div>
      ),
    },
    projects: {
      type: "dir",
      children: {
        "banner-tool.md": projectFile(portfolioData.projects[0]),
        "second-brain.md": projectFile(portfolioData.projects[1]),
        "wealthflow.md": projectFile(portfolioData.projects[2]),
        "carebot.md": projectFile(portfolioData.projects[3]),
        "aem-projects.txt": {
          type: "file",
          render: () => (
            <div>
              <p className="text-[#888]">
                Production AEM sites I build and maintain at Indegene:
              </p>
              {portfolioData.aemProjects.map((a) => (
                <p key={a.id} className="mt-1">
                  {a.url ? (
                    <a className="text-[#22d3ee] underline" href={a.url} target="_blank" rel="noreferrer">
                      {a.title}
                    </a>
                  ) : (
                    <span className="text-[#e6e6e6]">{a.title}</span>
                  )}{" "}
                  <span className="text-[#888]">— {a.description}</span>
                </p>
              ))}
            </div>
          ),
        },
      },
    },
    hackathons: {
      type: "dir",
      children: Object.fromEntries(
        portfolioData.education.hackathons.map((h) => [
          h.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".txt",
          {
            type: "file",
            render: () => (
              <div className="max-w-3xl">
                <p className="font-bold text-[#e6e6e6]">{h.title}</p>
                <p className="text-[#fbbf24]">
                  {h.result}
                  {h.prize ? ` · ${h.prize}` : ""}
                </p>
                <p className="text-[#888]">{h.location}</p>
                <p className="mt-1">{h.description}</p>
                {h.image && (
                  <img
                    src={h.image}
                    alt={h.title}
                    className="mt-3 max-h-64 border border-[#333]"
                    loading="lazy"
                  />
                )}
                <p className="mt-2 flex gap-4">
                  {h.githubUrl && (
                    <a className="text-[#22d3ee] underline" href={h.githubUrl} target="_blank" rel="noreferrer">
                      [github]
                    </a>
                  )}
                  {h.videoUrl && (
                    <a className="text-[#22d3ee] underline" href={h.videoUrl} target="_blank" rel="noreferrer">
                      [demo video]
                    </a>
                  )}
                </p>
              </div>
            ),
          } as FSNode,
        ])
      ),
    },
    gallery: {
      type: "dir",
      children: {
        "img_01.jpg": { type: "image", src: hack0to100_1, caption: "locked in — code on both screens" },
        "img_02.jpg": { type: "image", src: hack0to100_2, caption: "team.exe — building together" },
        "img_03.jpg": { type: "image", src: hack0to100_3, caption: "0 to 100 — shipped under deadline" },
      },
    },
    certifications: {
      type: "dir",
      children: Object.fromEntries(
        portfolioData.certifications.map((c) => [
          c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".txt",
          {
            type: "file",
            render: () => (
              <div className="max-w-3xl">
                <p>
                  <span className="text-[#4ade80]">✓</span>{" "}
                  <span className="font-bold text-[#e6e6e6]">{c.title}</span>
                </p>
                <p className="text-[#888]">
                  issuer: {c.issuer} · date: {c.date}
                </p>
                {c.image && (
                  <img src={c.image} alt={c.title} className="mt-3 max-h-80 border border-[#333]" loading="lazy" />
                )}
              </div>
            ),
          } as FSNode,
        ])
      ),
    },
    "education.txt": {
      type: "file",
      render: () => (
        <div className="max-w-3xl space-y-2">
          <p>
            <span className="text-[#e6e6e6]">{portfolioData.education.degree}</span> —{" "}
            {portfolioData.education.institution} ({portfolioData.education.period})
          </p>
          <p className="text-[#888]">{portfolioData.education.concurrentWork}</p>
          <p>
            Currently pursuing <span className="text-[#e6e6e6]">MCA (2025–27)</span> —
            Bangalore University, VSIMS Bengaluru.
          </p>
        </div>
      ),
    },
    "contact.sh": {
      type: "file",
      render: () => (
        <div>
          <p>
            email →{" "}
            <a className="text-[#22d3ee] underline" href={`mailto:${info.email}`}>
              {info.email}
            </a>
          </p>
          <p>phone → {info.phone}</p>
          <p>
            github →{" "}
            <a className="text-[#22d3ee] underline" href={info.github} target="_blank" rel="noreferrer">
              github.com/GuruPrasad403
            </a>
          </p>
          <p>
            linkedin →{" "}
            <a className="text-[#22d3ee] underline" href={info.linkedin} target="_blank" rel="noreferrer">
              linkedin.com/in/guruprasad-g-react
            </a>
          </p>
          <p className="mt-2 text-[#888]"># fastest way to reach me: email or LinkedIn. I reply fast.</p>
        </div>
      ),
    },
    "resume.pdf": { type: "link", url: info.resumeUrl, label: "Guruprasad_G.pdf" },
  },
};

/* ------------------------------ shell bits -------------------------------- */

function Prompt({ path }: { path: string }) {
  return (
    <span className="shrink-0">
      <span className="font-bold text-[#4ade80]">guruprasad@ubuntu</span>
      <span className="text-[#e6e6e6]">:</span>
      <span className="font-bold text-[#5b8def]">{path}</span>
      <span className="text-[#e6e6e6]">$</span>
    </span>
  );
}

type Line = { id: number; node: ReactNode };

const NEOFETCH_ART = [
  " ██████╗  ██████╗ ",
  "██╔════╝ ██╔════╝ ",
  "██║  ███╗██║  ███╗",
  "██║   ██║██║   ██║",
  "╚██████╔╝╚██████╔╝",
  " ╚═════╝  ╚═════╝ ",
];

/* --------------------------------- shell ---------------------------------- */

export default function Home() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [cwd, setCwd] = useState<string[]>([]);
  const cwdRef = useRef<string[]>([]);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<string[]>([]);
  const histIdxRef = useRef(-1);
  const bootedRef = useRef(false);

  const pathStr = "~" + (cwd.length ? "/" + cwd.join("/") : "");

  const push = (node: ReactNode) =>
    setLines((prev) => [...prev.slice(-300), { id: idRef.current++, node }]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const nodeAt = (path: string[]): FSNode | null => {
    let node: FSNode = FS;
    for (const seg of path) {
      if (node.type !== "dir" || !node.children[seg]) return null;
      node = node.children[seg];
    }
    return node;
  };

  const resolve = (raw: string): string[] | null => {
    let parts = raw.replace(/^~\/?/, "").split("/").filter(Boolean);
    let base: string[] = raw.startsWith("~") || raw.startsWith("/") ? [] : [...cwdRef.current];
    for (const p of parts) {
      if (p === ".") continue;
      if (p === "..") base.pop();
      else base.push(p);
    }
    return base;
  };

  const renderImage = (node: Extract<FSNode, { type: "image" }>, name: string) => (
    <figure>
      <img src={node.src} alt={name} className="max-h-72 border border-[#333]" loading="lazy" />
      <figcaption className="mt-1 text-[#888]">
        {name} — {node.caption}
      </figcaption>
    </figure>
  );

  const lsOutput = (path: string[], node: Extract<FSNode, { type: "dir" }>) => {
    const names = Object.keys(node.children).sort((a, b) => {
      const da = node.children[a].type === "dir" ? 0 : 1;
      const db = node.children[b].type === "dir" ? 0 : 1;
      return da - db || a.localeCompare(b);
    });
    return (
      <p className="flex flex-wrap gap-x-5 gap-y-1">
        {names.map((name) => {
          const child = node.children[name];
          if (child.type === "dir")
            return (
              <button
                key={name}
                className="font-bold text-[#5b8def] hover:underline"
                onClick={() => {
                  runCmd(`cd ${name}`);
                  runCmd("ls");
                }}
              >
                {name}/
              </button>
            );
          if (child.type === "image")
            return (
              <button key={name} className="text-[#c586c0] hover:underline" onClick={() => runCmd(`view ${name}`)}>
                {name}
              </button>
            );
          if (child.type === "link")
            return (
              <button key={name} className="text-[#e6e6e6] hover:underline" onClick={() => runCmd(`open ${name}`)}>
                {name}
              </button>
            );
          return (
            <button key={name} className="text-[#e6e6e6] hover:underline" onClick={() => runCmd(`cat ${name}`)}>
              {name}
            </button>
          );
        })}
      </p>
    );
  };

  function runCmd(rawInput: string) {
    const raw = rawInput.trim();
    push(
      <p>
        <Prompt path={"~" + (cwdRef.current.length ? "/" + cwdRef.current.join("/") : "")} />{" "}
        <span className="text-[#e6e6e6]">{raw}</span>
      </p>
    );
    if (!raw) return;

    const tokens = raw.replace(/^\.\//, "").split(/\s+/);
    const cmd = tokens[0].toLowerCase();
    const arg = tokens.slice(1).join(" ");

    const err = (msg: string) => push(<p className="text-[#f87171]">{msg}</p>);
    const out = (node: ReactNode) => push(<div>{node}</div>);

    switch (cmd) {
      case "clear":
        setLines([]);
        return;
      case "pwd":
        out(<p>/home/guruprasad{cwdRef.current.length ? "/" + cwdRef.current.join("/") : ""}</p>);
        return;
      case "whoami":
        out(
          <div>
            <p className="font-bold text-[#e6e6e6]">guruprasad-g</p>
            <p>{info.headline}</p>
            <p>
              {info.title} @ {info.company} · AI Champion · {info.location}
            </p>
            <p className="text-[#4ade80]">status: open to new opportunities</p>
          </div>
        );
        return;
      case "neofetch": {
        const rows: [string, string][] = [
          ["OS", "Portfolio Linux 24.04 LTS x86_64"],
          ["Host", "Indegene Limited (virtual dev machine)"],
          ["Role", `${info.title} · AI Champion`],
          ["Shell", "bash 5.2 (powered by React)"],
          ["Stack", "React · Node.js · TypeScript · MongoDB · AEM"],
          ["Uptime", "3 years of building for the web"],
          ["Location", "Ballari, Karnataka, India"],
          ["Contact", info.email],
        ];
        out(
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <pre className="leading-tight text-[#4ade80]">{NEOFETCH_ART.join("\n")}</pre>
            <div>
              <p>
                <span className="font-bold text-[#4ade80]">guruprasad@ubuntu</span>
              </p>
              <p className="text-[#888]">-----------------</p>
              {rows.map(([k, v]) => (
                <p key={k}>
                  <span className="font-bold text-[#4ade80]">{k}</span>: {v}
                </p>
              ))}
            </div>
          </div>
        );
        return;
      }
      case "help":
        out(
          <div>
            <p>GNU bash — portfolio edition. Commands:</p>
            <p className="text-[#888]">
              ls · cd &lt;dir&gt; · cat &lt;file&gt; · view &lt;photo&gt; · open
              &lt;file&gt; · pwd · whoami · neofetch · clear
            </p>
            <p className="text-[#888]">
              shortcuts: about · skills · projects · gallery · experience ·
              certifications · contact · resume · github · linkedin
            </p>
            <p className="text-[#888]">Tip: files and folders above are clickable.</p>
          </div>
        );
        return;
      case "ls": {
        const target = arg ? resolve(arg) : cwdRef.current;
        const node = target ? nodeAt(target) : null;
        if (!node) return err(`ls: cannot access '${arg}': No such file or directory`);
        if (node.type !== "dir") return err(`ls: cannot list '${arg}': Not a directory`);
        out(lsOutput(target!, node));
        return;
      }
      case "cd": {
        if (!arg || arg === "~") {
          cwdRef.current = [];
          setCwd([]);
          return;
        }
        const target = resolve(arg);
        const node = target ? nodeAt(target) : null;
        if (!node) return err(`bash: cd: ${arg}: No such file or directory`);
        if (node.type !== "dir") return err(`bash: cd: ${arg}: Not a directory`);
        cwdRef.current = target!;
        setCwd(target!);
        return;
      }
      case "cat":
      case "view":
      case "open": {
        if (!arg) return err(`${cmd}: missing file operand`);
        const target = resolve(arg);
        const node = target ? nodeAt(target) : null;
        if (!node) return err(`${cmd}: ${arg}: No such file or directory`);
        if (node.type === "dir") return err(`${cmd}: ${arg}: Is a directory — try 'ls ${arg}'`);
        if (node.type === "image") {
          out(renderImage(node, arg.split("/").pop()!));
          return;
        }
        if (node.type === "link") {
          window.open(node.url, "_blank");
          out(<p>Opening {node.label}…</p>);
          return;
        }
        if (cmd === "open") {
          out(node.render());
          return;
        }
        out(node.render());
        return;
      }
      case "gallery":
        out(
          <div>
            <p className="text-[#888]">
              0 to 100 Online Global Hackathon — two developers, two laptops, one deadline:
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              {Object.entries(
                (nodeAt(["gallery"]) as Extract<FSNode, { type: "dir" }>).children
              ).map(([name, n]) =>
                n.type === "image" ? <div key={name}>{renderImage(n, name)}</div> : null
              )}
            </div>
          </div>
        );
        return;
      case "about":
        return runCmd("cat ~/about.txt");
      case "skills":
        out(
          <div>
            {portfolioData.skills.map((g) => (
              <div key={g.category} className="mb-2">
                <p className="text-[#22d3ee]">{g.category}:</p>
                {g.skills.map((s) => (
                  <p key={s.name} className="pl-4">
                    <span className="text-[#e6e6e6]">{s.name.padEnd(28, " ")}</span>
                    <span className="text-[#4ade80]">{bar(s.level)}</span>{" "}
                    <span className="text-[#888]">{s.level}%</span>
                  </p>
                ))}
              </div>
            ))}
          </div>
        );
        return;
      case "projects":
        cwdRef.current = ["projects"];
        setCwd(["projects"]);
        return runCmd("ls");
      case "experience":
        return runCmd("cat ~/experience.log");
      case "certifications":
        cwdRef.current = ["certifications"];
        setCwd(["certifications"]);
        return runCmd("ls");
      case "contact":
        return runCmd("cat ~/contact.sh");
      case "education":
        return runCmd("cat ~/education.txt");
      case "hackathons":
        cwdRef.current = ["hackathons"];
        setCwd(["hackathons"]);
        return runCmd("ls");
      case "resume":
        window.open(info.resumeUrl, "_blank");
        out(<p>Opening resume — Guruprasad_G.pdf…</p>);
        return;
      case "github":
        window.open(info.github, "_blank");
        out(<p>Opening {info.github}…</p>);
        return;
      case "linkedin":
        window.open(info.linkedin, "_blank");
        out(<p>Opening {info.linkedin}…</p>);
        return;
      case "email":
        window.location.href = `mailto:${info.email}`;
        out(<p>Opening mail to {info.email}…</p>);
        return;
      case "date":
        out(<p>{new Date().toString()}</p>);
        return;
      case "echo":
        out(<p>{arg}</p>);
        return;
      case "exit":
        out(<p>logout… just kidding. This portfolio never logs out. 😄</p>);
        return;
      case "sudo":
        if (arg.toLowerCase().startsWith("hire")) {
          out(
            <p>
              [sudo] permission granted. ✅ Reach me at{" "}
              <a className="text-[#22d3ee] underline" href={`mailto:${info.email}`}>
                {info.email}
              </a>{" "}
              — I reply fast.
            </p>
          );
        } else {
          out(<p>guruprasad is already root here. Try 'sudo hire-me'.</p>);
        }
        return;
      default:
        err(`bash: ${cmd}: command not found — type 'help'`);
    }
  }

  const execRef = useRef(runCmd);
  execRef.current = runCmd;

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    push(<p className="text-[#888]">Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-45-generic x86_64)</p>);
    push(
      <p className="text-[#888]">
        Last login: Sat Nov 21 18:15:04 IST 2026 from Ballari, Karnataka
      </p>
    );
    push(
      <p className="text-[#888]">
        Welcome to Guruprasad's machine. Everything here is a real, working shell — explore
        it like a VM.
      </p>
    );
    execRef.current("whoami");
    execRef.current("neofetch");
    execRef.current("ls");
    push(
      <p className="text-[#888]">
        Type <span className="text-[#e6e6e6]">help</span> to explore, or tap a command below.
      </p>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CHIPS = ["help", "ls", "cat about.txt", "projects", "skills", "gallery", "experience", "contact", "resume"];

  return (
    <div className="flex h-[100dvh] flex-col bg-[#050505] p-2 sm:p-4">
      <div className="term-scanlines mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col overflow-hidden border border-[#2a2a2a] bg-[#0c0c0c] shadow-[0_0_80px_rgba(74,222,128,0.07)]">
        {/* VM window chrome */}
        <header className="flex shrink-0 items-center gap-3 border-b border-[#2a2a2a] bg-[#161616] px-4 py-2.5">
          <span className="flex gap-2">
            <i className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
            <i className="block h-3 w-3 rounded-full bg-[#febc2e]" />
            <i className="block h-3 w-3 rounded-full bg-[#28c840]" />
          </span>
          <span className="truncate text-xs text-[#999]">
            guruprasad@ubuntu: {pathStr} — bash
          </span>
          <span className="ml-auto hidden shrink-0 text-[11px] text-[#4ade80] sm:block">
            ● VM running
          </span>
        </header>

        {/* scrollback */}
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4 text-[12.5px] leading-relaxed text-[#c9d1c9] sm:px-5 sm:text-[13.5px]"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l) => (
            <div key={l.id}>{l.node}</div>
          ))}
        </div>

        {/* quick commands */}
        <div className="flex shrink-0 flex-wrap gap-2 border-t border-[#2a2a2a] bg-[#101010] px-3 py-2 sm:px-5">
          {CHIPS.map((c) => (
            <button
              key={c}
              onClick={() => execRef.current(c)}
              className="border border-[#2a2a2a] px-2.5 py-1 text-[11px] text-[#9fb89f] transition-colors hover:border-[#4ade80] hover:text-[#e6e6e6] sm:text-xs"
            >
              $ {c}
            </button>
          ))}
        </div>

        {/* input */}
        <form
          className="flex shrink-0 items-center gap-2 border-t border-[#2a2a2a] bg-[#0c0c0c] px-3 py-3 sm:px-5"
          onSubmit={(e) => {
            e.preventDefault();
            const v = value;
            if (v.trim()) {
              historyRef.current.push(v);
              histIdxRef.current = historyRef.current.length;
            }
            setValue("");
            execRef.current(v);
          }}
        >
          <span className="text-[12.5px] sm:text-[13.5px]">
            <Prompt path={pathStr} />
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                if (histIdxRef.current > 0) {
                  histIdxRef.current--;
                  setValue(historyRef.current[histIdxRef.current] ?? "");
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (histIdxRef.current < historyRef.current.length) {
                  histIdxRef.current++;
                  setValue(historyRef.current[histIdxRef.current] ?? "");
                }
              }
            }}
            className="w-full bg-transparent text-[12.5px] text-[#e6e6e6] caret-[#4ade80] outline-none sm:text-[13.5px]"
            placeholder=""
            aria-label="Terminal input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>
      <p className="mx-auto w-full max-w-6xl pt-2 text-center text-[11px] text-[#555]">
        © 2026 Guruprasad G · guruprasad@ubuntu — no GUI was harmed in the making of this
        portfolio
      </p>
    </div>
  );
}
