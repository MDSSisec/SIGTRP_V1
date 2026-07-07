"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import styles from "./statusStepper.module.css";

export type StatusItem = {
  title: string;
  icon: LucideIcon;
};

type StatusStepperProps = {
  steps: StatusItem[];
  currentStep: number;
  collapsible?: boolean;
  collapsibleLabel?: string;
};

function StepperContent({
  steps,
  currentStep,
}: {
  steps: StatusItem[];
  currentStep: number;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <React.Fragment key={index}>
              <div className={styles.stepItem}>
                <div className={styles.stepInner}>
                  <div
                    className={`${styles.circle} ${
                      isCompleted
                        ? styles.completed
                        : isActive
                        ? styles.active
                        : styles.inactive
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span
                    className={`${styles.label} ${
                      isCompleted || isActive
                        ? styles.labelActive
                        : styles.labelInactive
                    }`}
                    title={step.title}
                  >
                    {step.title}
                  </span>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`${styles.connector} ${
                    index < currentStep
                      ? styles.connectorActive
                      : styles.connectorInactive
                  }`}
                  aria-hidden
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default function StatusStepper({
  steps,
  currentStep,
  collapsible = false,
  collapsibleLabel = "Status do projeto",
}: StatusStepperProps) {
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const currentStepInfo = steps[currentStep];
  const CurrentIcon = currentStepInfo?.icon;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evita hydration mismatch: Radix Collapsible gera IDs diferentes no servidor e no cliente.
  // No primeiro render (SSR) mostramos conteúdo estático; após mount, o Collapsible.
  if (collapsible && !mounted) {
    return (
      <div className={styles.fullWidth}>
        <div className={styles.trigger} aria-hidden>
          <span className={styles.triggerContent}>
            {CurrentIcon && (
              <CurrentIcon size={18} className={styles.triggerIcon} />
            )}
            <span>{collapsibleLabel}</span>
            {currentStepInfo && (
              <span className={styles.triggerSubLabel}>
                — {currentStepInfo.title}
              </span>
            )}
          </span>
          <ChevronDown size={18} className={styles.chevron} />
        </div>
        <div className={styles.motionWrapper}>
          <StepperContent steps={steps} currentStep={currentStep} />
        </div>
      </div>
    );
  }

  if (collapsible) {
    return (
      <Collapsible open={open} onOpenChange={setOpen} className={styles.fullWidth}>
        <CollapsibleTrigger className={styles.trigger}>
          <span className={styles.triggerContent}>
            {CurrentIcon && (
              <CurrentIcon size={18} className={styles.triggerIcon} />
            )}
            <span>{collapsibleLabel}</span>
            {currentStepInfo && (
              <span className={styles.triggerSubLabel}>
                — {currentStepInfo.title}
              </span>
            )}
          </span>

          <ChevronDown
            size={18}
            className={`${styles.chevron} ${
              open ? styles.chevronOpen : ""
            }`}
          />
        </CollapsibleTrigger>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className={styles.motionWrapper}
            >
              <StepperContent
                steps={steps}
                currentStep={currentStep}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Collapsible>
    );
  }

  return <StepperContent steps={steps} currentStep={currentStep} />;
}
