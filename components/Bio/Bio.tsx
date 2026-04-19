import Image from "next/image";
import { Link } from "#components/Link/Link";
import profileImg from "./profile-img.jpg";

const Bio = () => (
  <aside className="border-page-rule border-t pt-8 pb-12">
    <span className="eyebrow">{"The Author"}</span>
    <div className="mt-4 flex max-w-prose font-sans text-page-text-body">
      <figure className="mr-4 mb-8 block h-24 w-24 overflow-hidden">
        <Image
          src={profileImg}
          alt="Luke Clark"
          className="h-full w-full object-cover"
        />
      </figure>
      <div>
        <p className="mb-4 max-w-sm">
          {"Personal site of Luke Clark. Links, snippets and sometimes words."}
        </p>
        <p>
          {"@ljcl — "}
          <Link href="https://github.com/ljcl">{"github"}</Link>
          {", "}
          <Link href="https://instagram.com/ljcl">{"gram"}</Link>
        </p>
      </div>
    </div>
  </aside>
);

export { Bio };
