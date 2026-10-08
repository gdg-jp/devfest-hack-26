"use client";

import type { KeyboardEvent, ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { Check, CodeXml, KeyRound, Mail, Palette, Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { ApplyButton } from "@/components/application-modal";
import { Brace, People } from "@/components/brand-shapes";
import { useI18n } from "@/components/i18n-provider";
import { Magnetic, ScrambleText } from "@/components/motion-kit";
import { easeOut } from "@/components/motion-presets";
import { SectionHeading } from "@/components/section-heading";
import { venueOrder } from "@/lib/event";

type PathId = "team" | "solo";

const pathOrder: PathId[] = ["team", "solo"];

const pathTone: Record<PathId, { soft: string; core: string }> = {
  team: { soft: "#ffe7a5", core: "#f9ab00" },
  solo: { soft: "#c3ecf6", core: "#4285f4" },
};

const INK = "#1e1e1e";
const LAST_STEP = 2;
const STEP_SECONDS = 3.6;

// Autoplay walks through the steps once, then rests on the formed team.
type Mode = "idle" | "playing" | "paused" | "manual" | "done";

/* ---------- Stage ---------- */

// Stage coordinates are offsets from the stage centre in `cqw`, so the scene
// scales with the stage width and stays centred at any height.
const cq = (value: number) => `${value}cqw`;

type Pose = { x: number; y: number; on: boolean; delay?: number; rotate?: number };

const actorSpring = { type: "spring" as const, stiffness: 190, damping: 21 };

function Actor({ pose, className, children }: { pose: Pose; className: string; children?: ReactNode }) {
  const target = {
    x: cq(pose.x),
    y: cq(pose.y),
    rotate: pose.rotate ?? 0,
    scale: pose.on ? 1 : 0.6,
    opacity: pose.on ? 1 : 0,
  };

  return (
    <motion.div
      className={`stage-actor ${className}`}
      initial={{ ...target, scale: 0.6, opacity: 0 }}
      animate={target}
      exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.25 } }}
      transition={{ ...actorSpring, delay: pose.on ? (pose.delay ?? 0) : 0 }}
    >
      {children}
    </motion.div>
  );
}

function PersonGlyph({ fill, dashed = false, fillDelay = 0 }: { fill: string; dashed?: boolean; fillDelay?: number }) {
  const dash = dashed ? "5 6" : undefined;
  return (
    <svg viewBox="0 0 48 72" fill="none" overflow="visible">
      <motion.circle
        cx="24"
        cy="18"
        r="13"
        stroke={INK}
        strokeWidth="3"
        strokeDasharray={dash}
        initial={false}
        animate={{ fill }}
        transition={{ duration: 0.35, delay: fillDelay }}
      />
      <path d="M5 68A19 19 0 0 1 43 68" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeDasharray={dash} />
    </svg>
  );
}

type PersonProps = {
  pose: Pose;
  color: string;
  lit?: boolean;
  litDelay?: number;
  label?: string;
  chip?: ReactNode;
  bob?: number;
};

function StagePerson({ pose, color, lit = true, litDelay = 0, label, chip, bob = 0 }: PersonProps) {
  return (
    <Actor pose={pose} className="stage-person">
      <motion.div
        className="stage-person-body"
        animate={pose.on ? { y: ["0%", "-5%", "0%"] } : { y: "0%" }}
        transition={pose.on ? { duration: 2.4, ease: "easeInOut", repeat: Infinity, delay: bob } : { duration: 0.2 }}
      >
        <PersonGlyph fill={lit ? color : "#ffffff"} fillDelay={litDelay} />
        {label ? <span className="stage-label">{label}</span> : null}
        <AnimatePresence initial={false}>
          {chip ? (
            <motion.span
              key="chip"
              className="stage-chip"
              initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 16, delay: pose.delay ?? 0 }}
            >
              {chip}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </Actor>
  );
}

function StageBraces({ left, right }: { left: Pose; right: Pose }) {
  return (
    <>
      <Actor pose={left} className="stage-brace">
        <Brace fill="#ffffff" side="open" />
      </Actor>
      <Actor pose={right} className="stage-brace">
        <Brace fill="#ffffff" side="close" />
      </Actor>
    </>
  );
}

const memberColors = ["#4285f4", "#ea4335", "#34a853"];
const waitingY = [-21, -1.5, 18];
const TEAM_Y = 4;
const TICKET_Y = -24;
const WAITING_X = 40;

/** Team path: the lead opens a team, shares an invite code, and the members join. */
function TeamCast({ step, labels }: { step: number; labels: { leader: string; invite: string } }) {
  const centred = step >= 2;
  const originX = centred ? 0 : -11;
  const slotX = (slot: number) => originX + (slot - 1.5) * 12;
  const on = step >= 0;

  return (
    <>
      <StageBraces
        left={{ x: originX - 30, y: TEAM_Y, on }}
        right={{ x: originX + 30, y: TEAM_Y, on, delay: 0.06 }}
      />

      {[1, 2, 3].map((slot) => (
        <Actor key={slot} pose={{ x: slotX(slot), y: TEAM_Y, on: step === 0 || step === 1, delay: 0.24 + slot * 0.06 }} className="stage-person is-slot">
          <PersonGlyph fill="rgba(255, 255, 255, .6)" dashed />
        </Actor>
      ))}

      <StagePerson pose={{ x: slotX(0), y: TEAM_Y, on, delay: 0.16 }} color="#f9ab00" label={labels.leader} />

      {memberColors.map((color, index) => (
        <StagePerson
          key={color}
          pose={
            centred
              ? { x: slotX(index + 1), y: TEAM_Y, on: true, delay: 0.1 + index * 0.1 }
              : { x: WAITING_X, y: waitingY[index], on: step === 1, delay: 0.12 + index * 0.08 }
          }
          color={color}
          lit={step >= 1}
          litDelay={step === 1 ? 1.05 + index * 0.14 : 0}
          bob={0.2 + index * 0.25}
        />
      ))}

      <Actor pose={{ x: originX, y: TICKET_Y, on: step === 1, delay: 0.05, rotate: step === 1 ? -3 : 0 }} className="stage-ticket">
        <span className="stage-ticket-key">
          <KeyRound aria-hidden="true" />
        </span>
        <span className="stage-ticket-copy">
          <small>{labels.invite}</small>
          <ScrambleText key={step === 1 ? "shown" : "hidden"} className="stage-ticket-code" text="DF26-8K4Q" />
        </span>
      </Actor>

      {/* Own presence so the chips animate on mount; the cast's presence starts with initial={false}. */}
      <AnimatePresence>
        {step === 1
          ? waitingY.map((targetY, index) => (
            <motion.span
              key={index}
              className="stage-actor stage-code"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              initial={{ x: cq(originX), y: cq(TICKET_Y), scale: 0.4, opacity: 0 }}
              animate={{
                x: [cq(originX), cq((originX + WAITING_X) / 2 + 4), cq(WAITING_X)],
                y: [cq(TICKET_Y), cq(Math.min(TICKET_Y, targetY) - 9), cq(targetY - 6)],
                scale: [0.4, 1, 0.7],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 0.9,
                delay: 0.45 + index * 0.14,
                ease: easeOut,
                times: [0, 0.5, 1],
                opacity: { duration: 0.9, delay: 0.45 + index * 0.14, times: [0, 0.15, 0.85, 1] },
              }}
            >
              <KeyRound aria-hidden="true" />
            </motion.span>
          ))
          : null}
      </AnimatePresence>
    </>
  );
}

const skillRows = [
  { icon: CodeXml, level: 0.82 },
  { icon: Sparkles, level: 0.58 },
  { icon: Palette, level: 0.36 },
];

/** Solo path: self-assess, get matched into a balanced team, hear back by email. */
function SoloCast({ step, labels }: { step: number; labels: { you: string; skills: string; mailKicker: string; mailSubject: string } }) {
  const teamY = step >= 2 ? TEAM_Y + 4 : TEAM_Y;
  const formed = step >= 1;

  return (
    <>
      <StageBraces left={{ x: -27, y: teamY, on: formed, delay: 0.05 }} right={{ x: 27, y: teamY, on: formed, delay: 0.1 }} />

      <StagePerson
        pose={{ x: formed ? 0 : -16, y: teamY, on: step >= 0, delay: 0.12 }}
        color="#4285f4"
        label={labels.you}
        chip={formed ? <CodeXml aria-hidden="true" /> : null}
      />
      <StagePerson
        pose={formed ? { x: -13.5, y: teamY, on: true, delay: 0.3 } : { x: -46, y: teamY, on: false }}
        color="#ea4335"
        chip={formed ? <Sparkles aria-hidden="true" /> : null}
        bob={0.3}
      />
      <StagePerson
        pose={formed ? { x: 13.5, y: teamY, on: true, delay: 0.42 } : { x: 46, y: teamY, on: false }}
        color="#34a853"
        chip={formed ? <Palette aria-hidden="true" /> : null}
        bob={0.6}
      />

      <Actor pose={{ x: 20, y: 0, on: step === 0, delay: 0.24 }} className="stage-skills">
        <span className="stage-skills-head">{labels.skills}</span>
        {skillRows.map(({ icon: Icon, level }, index) => (
          <span className="stage-skills-row" key={index}>
            <span className="stage-skills-icon">
              <Icon aria-hidden="true" />
            </span>
            <span className="stage-skills-track">
              <motion.i
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step === 0 ? level : 0 }}
                transition={{ duration: 0.8, ease: easeOut, delay: step === 0 ? 0.55 + index * 0.14 : 0 }}
              />
            </span>
          </span>
        ))}
      </Actor>

      <Actor pose={{ x: 0, y: step >= 2 ? -22 : -38, on: step >= 2, delay: 0.1, rotate: step >= 2 ? -2 : -8 }} className="stage-mail">
        <span className="stage-mail-icon">
          <Mail aria-hidden="true" />
          <i>1</i>
        </span>
        <span className="stage-mail-copy">
          <small>{labels.mailKicker}</small>
          <b>{labels.mailSubject}</b>
        </span>
      </Actor>
    </>
  );
}

// Who is in the team at each step, in seat order.
const teamSeats: Record<PathId, string[][]> = {
  team: [["#f9ab00"], ["#f9ab00"], ["#f9ab00", ...memberColors]],
  solo: [["#4285f4"], ["#ea4335", "#4285f4", "#34a853"], ["#ea4335", "#4285f4", "#34a853"]],
};

function TeamMeter({ path, step }: { path: PathId; step: number }) {
  const seats = step < 0 ? [] : teamSeats[path][step];
  return (
    <div className="apply-stage-meter" aria-hidden="true">
      <span>TEAM</span>
      <span className="apply-stage-meter-seats">
        {[0, 1, 2, 3].map((seat) => (
          <motion.i
            key={seat}
            className={seat < seats.length ? undefined : "is-empty"}
            initial={false}
            animate={{ backgroundColor: seats[seat] ?? "#ffffff", scale: seat < seats.length ? 1 : 0.8 }}
            transition={{ type: "spring", stiffness: 380, damping: 18, delay: seat * 0.06 }}
          />
        ))}
      </span>
      <span>2–4</span>
    </div>
  );
}

type StageProps = {
  path: PathId;
  step: number;
  mode: Mode;
  status: string;
  controlLabel: string;
  onControl: () => void;
  onFirstView: () => void;
  stageRef: RefObject<HTMLDivElement | null>;
};

function ApplyStage({ path, step, mode, status, controlLabel, onControl, onFirstView, stageRef }: StageProps) {
  const { t } = useI18n();
  const labels = t.howToApply.stage;
  const ControlIcon = mode === "playing" ? Pause : mode === "paused" ? Play : RotateCcw;

  return (
    <motion.div
      ref={stageRef}
      className="apply-stage"
      variants={{
        hidden: { clipPath: "inset(6% 6% 6% 6% round 28px)", opacity: 0 },
        visible: { clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1, transition: { duration: 1, ease: easeOut } },
      }}
      onViewportEnter={onFirstView}
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div className="apply-stage-bg" initial={false} animate={{ backgroundColor: pathTone[path].soft }} transition={{ duration: 0.5 }} />

      <div className="apply-stage-scene" aria-hidden="true">
        <AnimatePresence initial={false}>
          {path === "team" ? <TeamCast key="team" step={step} labels={labels} /> : <SoloCast key="solo" step={step} labels={labels} />}
        </AnimatePresence>
      </div>

      <TeamMeter path={path} step={step} />

      <div className="apply-stage-status" aria-hidden="true">
        <span className="apply-stage-status-no">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={Math.max(step, 0)} initial={{ y: "-110%" }} animate={{ y: "0%" }} exit={{ y: "110%" }} transition={{ duration: 0.35, ease: easeOut }}>
              0{Math.max(step, 0) + 1}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="apply-stage-status-text">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={status} initial={{ y: "-110%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "110%", opacity: 0 }} transition={{ duration: 0.35, ease: easeOut }}>
              {status}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      <motion.button type="button" className="apply-stage-control" aria-label={controlLabel} onClick={onControl} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mode === "playing" ? "pause" : mode === "paused" ? "play" : "replay"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <ControlIcon aria-hidden="true" />
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

/* ---------- Path picker ---------- */

function SoloGlyph({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 48 72" fill="none" overflow="visible">
      <circle cx="24" cy="18" r="13" fill={fill} stroke={INK} strokeWidth="3" />
      <path d="M5 68A19 19 0 0 1 43 68" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PathPicker({ path, onSelect }: { path: PathId; onSelect: (next: PathId) => void }) {
  const { t } = useI18n();
  const copy = t.howToApply;
  const tabRefs = useRef<Record<PathId, HTMLButtonElement | null>>({ team: null, solo: null });

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    const index = pathOrder.indexOf(path);
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? pathOrder[(index + 1) % pathOrder.length]
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? pathOrder[(index + pathOrder.length - 1) % pathOrder.length]
      : event.key === "Home" ? pathOrder[0]
      : event.key === "End" ? pathOrder[pathOrder.length - 1]
      : null;
    if (!next) return;
    event.preventDefault();
    onSelect(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <motion.div
      className="apply-picker"
      role="tablist"
      aria-label={copy.pickerLabel}
      onKeyDown={handleKey}
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }}
    >
      {pathOrder.map((id) => {
        const active = id === path;
        const option = copy.paths[id];
        return (
          <motion.button
            key={id}
            ref={(element) => {
              tabRefs.current[id] = element;
            }}
            type="button"
            role="tab"
            id={`apply-tab-${id}`}
            aria-selected={active}
            aria-controls="apply-panel"
            tabIndex={active ? 0 : -1}
            className={`apply-picker-tab${active ? " is-active" : ""}`}
            onClick={() => onSelect(id)}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            {active ? (
              <motion.span
                layoutId="apply-path-pill"
                className="apply-picker-pill"
                initial={false}
                animate={{ backgroundColor: pathTone[id].soft }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
            <motion.span
              className={`apply-picker-glyph is-${id}`}
              aria-hidden="true"
              variants={{ hover: { rotate: id === "team" ? -6 : 8, scale: 1.08 } }}
              transition={{ type: "spring", stiffness: 320, damping: 14 }}
            >
              {id === "team" ? <People fill={active ? pathTone.team.core : "#ffffff"} wave={active} /> : <SoloGlyph fill={active ? pathTone.solo.core : "#ffffff"} />}
            </motion.span>
            <span className="apply-picker-copy">
              <span className="apply-picker-title">{option.title}</span>
              <span className="apply-picker-meta">{option.meta}</span>
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* ---------- Steps and venues ---------- */

type StepsProps = {
  path: PathId;
  step: number;
  mode: Mode;
  progress: MotionValue<number>;
  onPick: (index: number) => void;
};

function ApplySteps({ path, step, mode, progress, onPick }: StepsProps) {
  const { t } = useI18n();
  const steps = t.howToApply.paths[path].steps;
  const timed = mode === "playing" || mode === "paused";

  return (
    <ol className={`apply-steps tone-${path === "team" ? "yellow" : "blue"}`}>
      {steps.map((text, index) => {
        const active = index === step;
        return (
          <motion.li
            key={index}
            className={`apply-step${active ? " is-active" : ""}${index < step ? " is-past" : ""}`}
            aria-current={active ? "step" : undefined}
            onClick={() => onPick(index)}
            variants={{ hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } } }}
            whileHover={active ? undefined : { x: 6 }}
          >
            {active ? (
              <motion.span layoutId="apply-step-highlight" className="apply-step-highlight" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <motion.span className="apply-step-progress" style={{ scaleX: timed ? progress : 1 }} />
              </motion.span>
            ) : null}
            <span className="apply-step-no" aria-hidden="true">
              <motion.span initial={false} animate={{ scale: active || index < step ? 1 : 0 }} transition={{ type: "spring", stiffness: 420, damping: 20 }} />
              <b>0{index + 1}</b>
            </span>
            <span className="apply-step-text">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={path}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.4, ease: easeOut, delay: index * 0.06 }}
                >
                  {text}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.li>
        );
      })}
    </ol>
  );
}

function ApplyVenues({ path }: { path: PathId }) {
  const { t } = useI18n();
  const solo = path === "solo";

  return (
    <motion.div
      className="apply-venues"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.05 } } }}
    >
      <p className="apply-venues-label">{t.venues.regionalTag}</p>
      <ul className="apply-venue-chips">
        {venueOrder.map((id) => {
          const available = !solo || id === "online";
          const picked = solo && id === "online";
          return (
            <motion.li
              key={id}
              layout
              className={`apply-venue-chip${available ? "" : " is-off"}${picked ? " is-picked" : ""}`}
              animate={{ opacity: available ? 1 : 0.4 }}
              transition={{ layout: { type: "spring", stiffness: 380, damping: 30 }, opacity: { duration: 0.3 } }}
            >
              <AnimatePresence initial={false}>
                {picked ? (
                  <motion.span
                    key="check"
                    className="apply-venue-check"
                    initial={{ scale: 0, width: 0 }}
                    animate={{ scale: 1, width: "auto" }}
                    exit={{ scale: 0, width: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  >
                    <Check aria-hidden="true" />
                  </motion.span>
                ) : null}
              </AnimatePresence>
              {t.venues.list[id].region}
            </motion.li>
          );
        })}
      </ul>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.p
          key={path}
          className="apply-venues-note"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: easeOut }}
        >
          {t.howToApply.paths[path].venue}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Section ---------- */

export function HowToApply() {
  const { t } = useI18n();
  const copy = t.howToApply;
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const visible = useInView(stageRef, { amount: 0.2 });
  const progress = useMotionValue(0);
  const [path, setPath] = useState<PathId>("team");
  const [step, setStep] = useState(-1);
  const [mode, setMode] = useState<Mode>("idle");

  useEffect(() => {
    if (mode !== "playing" || !visible) return;
    const controls = animate(progress, 1, {
      duration: STEP_SECONDS * (1 - progress.get()),
      ease: "linear",
      onComplete: () => {
        if (step < LAST_STEP) {
          progress.set(0);
          setStep(step + 1);
        } else {
          setMode("done");
        }
      },
    });
    return () => controls.stop();
  }, [mode, visible, step, progress]);

  function play(from = 0) {
    if (reduceMotion) {
      setStep(LAST_STEP);
      setMode("done");
      return;
    }
    progress.set(0);
    setStep(from);
    setMode("playing");
  }

  function selectPath(next: PathId) {
    if (next === path) return;
    setPath(next);
    play();
  }

  function pickStep(index: number) {
    progress.set(1);
    setStep(index);
    setMode("manual");
  }

  function control() {
    if (mode === "playing") setMode("paused");
    else if (mode === "paused") setMode("playing");
    else play();
  }

  const controlLabel = mode === "playing" ? copy.controls.pause : mode === "paused" ? copy.controls.play : copy.controls.replay;

  return (
    <section className="section how-to-apply" id="how-to-apply">
      <div className="container">
        <SectionHeading index="02" kicker={copy.kicker} title={copy.title} description={copy.description} />

        <motion.div
          className="apply-board tab-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut, staggerChildren: 0.1 } } }}
        >
          <span className="tab-card-tab">{copy.tab}</span>

          <ApplyStage
            path={path}
            step={step}
            mode={mode}
            status={copy.paths[path].status[Math.max(step, 0)]}
            controlLabel={controlLabel}
            onControl={control}
            onFirstView={() => {
              if (mode === "idle") play();
            }}
            stageRef={stageRef}
          />

          <div className="apply-side">
            <PathPicker path={path} onSelect={selectPath} />
            <motion.div
              className="apply-panel"
              id="apply-panel"
              role="tabpanel"
              aria-labelledby={`apply-tab-${path}`}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }}
            >
              <ApplySteps path={path} step={step} mode={mode} progress={progress} onPick={pickStep} />
              <ApplyVenues path={path} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="apply-cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div className="apply-cta-copy" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
            <p className="apply-cta-entry">
              <span className="live-dot" aria-hidden="true" />
              {t.common.entryUntil}
            </p>
            <p className="apply-cta-note">{copy.note}</p>
          </motion.div>
          <span className="brand-arrow apply-cta-arrow" aria-hidden="true">
            <motion.span
              className="brand-arrow-line"
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.9, ease: easeOut } } }}
            />
            <motion.svg
              className="brand-arrow-head"
              viewBox="0 0 14 24"
              fill="none"
              variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut, delay: 0.55 } } }}
            >
              <path d="M2 2L12 12L2 22" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </span>
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } } }}>
            <Magnetic>
              <ApplyButton className="btn btn-apply btn-lg">{t.common.applyLong}</ApplyButton>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
