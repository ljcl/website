import { Link } from "#components/Link/Link";

export default function NotFound() {
  return (
    <section className="layout-container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p
        className="display-xl font-blackletter text-page-text-body leading-none"
        aria-hidden
      >
        {"404"}
      </p>
      <h1 className="eyebrow mt-8">{"Not found"}</h1>
      <p className="mt-4 max-w-prose text-page-text-muted">
        {"Sorry, couldn’t find that one"}
      </p>
      <Link href="/" className="mt-8 text-meta">
        {"Head on back home"}
      </Link>
    </section>
  );
}
