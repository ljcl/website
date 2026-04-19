"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "#util/cn";
import { CheckIcon, CopyIcon } from "./Icons";

export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return (
    <button
      type="button"
      className={cn(
        "-m-1 hidden rounded p-1 hover:bg-gray-400/20 sm:block",
        className,
      )}
      aria-label="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), 1200);
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}
