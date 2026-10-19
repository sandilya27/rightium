"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { process } from "@/lib/services";

/** An open engagement brief: every stage and deliverable stays visible. */
export function Process() {
  const stages = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stages, offset: ["start 55%", "end 55%"] });

  return (
    <section className="engagement" aria-labelledby="engagement-title">
      <div className="shell engagement-layout">
        <div className="engagement-intro">
          <h2 id="engagement-title">Three steps.<br />No open-ended retainers.</h2>
          <p>You will always know what the question is, who is answering it, and when it lands.</p>
          <div className="engagement-agreement">
            <span>Written scope</span>
            <span>Fixed fee</span>
            <span>Agreed deadline</span>
          </div>
        </div>
        <ol ref={stages} className="engagement-stages">
          <li aria-hidden="true" className="engagement-rail"><motion.span style={{ scaleY: reduce ? 1 : scrollYProgress }} /></li>
          {process.map((stage, index) => (
            <ProcessStage key={stage.step} index={index} progress={scrollYProgress}>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
              <ul className="engagement-deliverables" aria-label={`${stage.title} deliverables`}>
                {stage.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
              </ul>
            </ProcessStage>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProcessStage({ children, index, progress }: { children: ReactNode; index: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const reached = useTransform(progress, [Math.max(0, (index - 0.45) / 3), Math.max(0.01, index / 3)], [0, 1]);
  return <li className="engagement-stage">
    <motion.span aria-hidden="true" className="engagement-marker" style={{ opacity: reduce ? 1 : reached, scale: reduce ? 1 : reached }} />
    {children}
  </li>;
}
