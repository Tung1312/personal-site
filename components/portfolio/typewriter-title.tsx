"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

const TYPING_SPEED = 95;
const DELETING_SPEED = 60;
const HOLD_DURATION = 3100;

type TypewriterTitleProps = {
  words: readonly string[];
  className?: string;
  cycle?: boolean;
  variants?: Variants;
};

export function TypewriterTitle({
  words,
  className = "text-3xl font-semibold leading-tight md:text-4xl",
  cycle = true,
  variants,
}: TypewriterTitleProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const isHolding = !isDeleting && typedLength === words[wordIndex].length;
  const typedWord = words[wordIndex].slice(0, typedLength);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const finishedTyping = typedLength === currentWord.length;
    const finishedDeleting = typedLength === 0;

    if (!cycle && finishedTyping && !isDeleting) {
      return;
    }

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && !finishedTyping) {
          setTypedLength((value) => value + 1);
          return;
        }

        if (!isDeleting && finishedTyping) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && !finishedDeleting) {
          setTypedLength((value) => value - 1);
          return;
        }

        setIsDeleting(false);
        setWordIndex((value) => (value + 1) % words.length);
      },
      isDeleting
        ? DELETING_SPEED
        : finishedTyping
          ? HOLD_DURATION
          : TYPING_SPEED,
    );

    return () => window.clearTimeout(timeout);
  }, [cycle, isDeleting, typedLength, wordIndex, words]);

  return (
    <motion.h1 className={className} variants={variants}>
      <span className="inline-block align-middle gradient-title">{typedWord || "\u00A0"}</span>
      <span
        aria-hidden
        className={
          isHolding
            ? "typing-caret ml-1 inline-block align-middle font-mono typing-caret-blink"
            : "typing-caret ml-1 inline-block align-middle font-mono"
        }
      >
        _
      </span>
    </motion.h1>
  );
}
