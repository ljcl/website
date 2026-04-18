import Link from "next/link";
import { VisuallyHidden } from "#components/VisuallyHidden/VisuallyHidden";

export const Masthead = () => (
  <header>
    <div className="layout-container flex items-center py-6">
      <Link href="/" className="hover:no-underline">
        <span
          aria-hidden
          className="font-blackletter text-[4rem] text-page-text-body leading-none tracking-[-0.02em]"
        >
          {"lc"}
          <span className="text-brand-primary">{"."}</span>
        </span>
        <VisuallyHidden>{"Luke Clark"}</VisuallyHidden>
      </Link>
    </div>
  </header>
);
