import type {
  AnnotationHandler,
  BlockAnnotation,
  InlineAnnotation,
} from "codehike/code";
import { InnerLine } from "codehike/code";
import { FocusHandlerPreWithRef } from "./FocusHandlerPreWithRef";

/**
 * Focus Annotation - Dim non-focused lines (great for tutorials)
 *
 * Usage:
 * ```js
 * // !focus(2:3)
 * const setup = true  // dimmed
 * const important = 5 // focused
 * const cleanup = 0   // dimmed
 * ```
 */
export const focusHandler: AnnotationHandler = {
  name: "focus",
  onlyIfAnnotated: true,
  Line: (props) => (
    <InnerLine
      merge={props}
      className="px-2 opacity-50 data-focus:opacity-100"
    />
  ),
  AnnotatedLine: ({ annotation, ...props }) => (
    <InnerLine merge={props} data-focus={true} />
  ),
  PreWithRef: FocusHandlerPreWithRef,
};

/**
 * Mark Annotation - Simple marker for important lines
 *
 * Usage:
 * ```js
 * // !mark(2)
 * // !mark(1:2) gold
 * // !mark[/important/] pink
 * const important = true
 * ```
 */
export const markHandler: AnnotationHandler = {
  name: "mark",
  Line: ({ annotation, ...props }) => {
    const color = annotation?.query || "rgb(14 165 233)";
    return (
      <div
        className="flex"
        style={{
          borderLeft: "solid 2px transparent",
          borderLeftColor: annotation && color,
          backgroundColor: annotation && `rgb(from ${color} r g b / 0.1)`,
        }}
      >
        <InnerLine merge={props} className="flex-1 px-2" />
      </div>
    );
  },
  Inline: ({ annotation, children }) => {
    const color = annotation?.query || "rgb(14 165 233)";
    return (
      <span
        className="-mx-0.5 rounded px-0.5 py-0"
        style={{
          outline: `solid 1px rgb(from ${color} r g b / 0.5)`,
          background: `rgb(from ${color} r g b / 0.13)`,
        }}
      >
        {children}
      </span>
    );
  },
};

/**
 * Callout Annotation - Add tooltips/notes to specific code
 *
 * Usage:
 * ```js
 * // !callout[greeting] "This is the greeting variable"
 * const greeting = "Hello"
 * ```
 */
export const calloutHandler: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation;
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { ...data, column: (fromColumn + toColumn) / 2 },
    };
  },
  Block: ({ annotation, children }) => {
    const { column } = annotation.data;
    return (
      <>
        {children}
        <div
          style={{ minWidth: `${column + 4}ch` }}
          className="relative prose-p:mx-2 my-1 prose-p:my-1 w-fit select-none whitespace-break-spaces rounded border border-code-mark bg-code-bg px-0"
        >
          <div
            style={{ left: `${column}ch` }}
            className="-translate-y-1/2 -top-px absolute h-2 w-2 rotate-45 border-code-mark border-t border-l bg-code-bg"
          />
          <p>{annotation.query}</p>
        </div>
      </>
    );
  },

  Inline: ({ annotation, children }) => (
    <span
      className="group relative cursor-help underline decoration-accent decoration-dotted"
      title={annotation.query}
    >
      {children}
      {annotation.query && (
        <span className="absolute top-full left-0 z-10 mt-2 hidden whitespace-nowrap rounded border border-code-border bg-code-bg p-2 text-code-fg text-sm shadow-lg group-hover:block">
          {annotation.query}
        </span>
      )}
    </span>
  ),
};

/**
 * Diff Annotation - Show added/removed lines
 *
 * Usage:
 * ```js
 * // !diff(1) +
 * const newLine = true
 * // !diff(2) -
 * const oldLine = false
 * ```
 */
export const diffHandler: AnnotationHandler = {
  name: "diff",
  onlyIfAnnotated: true,
  transform: (annotation: BlockAnnotation) => {
    const color = annotation.query === "-" ? "#f85149" : "#3fb950";
    return [annotation, { ...annotation, name: "mark", query: color }];
  },
  Line: ({ annotation, ...props }) => {
    const innerLineClassName = annotation?.query === "-" ? "select-none" : "";
    return (
      <>
        <div className="box-content min-w-[1ch] select-none pl-2 opacity-70">
          {annotation?.query}
        </div>
        <InnerLine className={innerLineClassName} merge={props} />
      </>
    );
  },
};

export const lineNumbers: AnnotationHandler = {
  name: "line-numbers",
  Line: (props) => {
    const width = props.totalLines.toString().length + 1;
    return (
      <div className="flex">
        <span
          className="select-none text-right opacity-30"
          style={{ minWidth: `${width}ch` }}
        >
          {props.lineNumber}
        </span>
        <InnerLine merge={props} className="flex-1 pl-4" />
      </div>
    );
  },
};

// ============================================
// Export All Handlers
// ============================================

export const handlers: AnnotationHandler[] = [
  focusHandler,
  markHandler,
  calloutHandler,
  diffHandler,
  lineNumbers,
];
