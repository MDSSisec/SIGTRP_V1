"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import styles from "./statusStepper.module.css";

export type StatusItem = {
  /** Título completo exibido no stepper e no trigger. */
  title: string;
  icon: LucideIcon;
};

/** Alias semântico: steps = etapas do projeto (SIGTRP_TB_PROJECT_STAGES). */
export type EtapaItem = StatusItem;

type StatusStepperProps = {
  steps: StatusItem[];
  currentStep: number;
  collapsible?: boolean;
  collapsibleLabel?: string;
  forceExpanded?: boolean;
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
      <div className={styles.track}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <React.Fragment key={index}>
              <div className={styles.stepColumn}>
                <div className={styles.iconRow}>
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

function StepperTrigger({
  collapsibleLabel,
  currentStepInfo,
  CurrentIcon,
  open,
  hideChevron,
}: {
  collapsibleLabel: string;
  currentStepInfo?: StatusItem;
  CurrentIcon?: LucideIcon;
  open?: boolean;
  hideChevron?: boolean;
}) {
  return (
    <>
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

      {!hideChevron && (
        <ChevronDown
          size={18}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      )}
    </>
  );
}

export default function StatusStepper({
  steps,
  currentStep,
  collapsible = false,
  collapsibleLabel = "Etapa do projeto",
  forceExpanded = false,
}: StatusStepperProps) {
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const currentStepInfo = steps[currentStep];
  const CurrentIcon = currentStepInfo?.icon;
  const isOpen = forceExpanded || open;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evita hydration mismatch: Radix Collapsible gera IDs diferentes no servidor e no cliente.
  if (collapsible && !mounted) {
    return (
      <div className={styles.fullWidth}>
        <div className={styles.trigger} aria-hidden>
          <StepperTrigger
            collapsibleLabel={collapsibleLabel}
            currentStepInfo={currentStepInfo}
            CurrentIcon={CurrentIcon}
          />
        </div>
        <div className={styles.motionWrapper}>
          <StepperContent steps={steps} currentStep={currentStep} />
        </div>
      </div>
    );
  }

  if (collapsible && forceExpanded) {
    return (
      <div className={styles.fullWidth}>
        <div className={styles.trigger}>
          <StepperTrigger
            collapsibleLabel={collapsibleLabel}
            currentStepInfo={currentStepInfo}
            CurrentIcon={CurrentIcon}
            open
            hideChevron
          />
        </div>
        <div className={styles.motionWrapper}>
          <StepperContent steps={steps} currentStep={currentStep} />
        </div>
      </div>
    );
  }

  if (collapsible) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setOpen}
        className={styles.fullWidth}
      >
        <CollapsibleTrigger className={styles.trigger}>
          <StepperTrigger
            collapsibleLabel={collapsibleLabel}
            currentStepInfo={currentStepInfo}
            CurrentIcon={CurrentIcon}
            open={isOpen}
          />
        </CollapsibleTrigger>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className={styles.motionWrapper}
            >
              <StepperContent steps={steps} currentStep={currentStep} />
            </motion.div>
          )}
        </AnimatePresence>
      </Collapsible>
    );
  }

  return <StepperContent steps={steps} currentStep={currentStep} />;
}
