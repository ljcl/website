import Image from "next/image";
import { Link } from "#components/Link/Link";
import styles from "./bio.module.css";
import profileImg from "./profile-img.jpg";

const Bio = () => (
  <aside className="my-14 flex">
    <div className="relative mr-4 mb-8 inline-flex">
      <figure className={`block h-24 w-24 overflow-hidden ${styles.mask}`}>
        <Image
          src={profileImg}
          alt="Luke Clark"
          className="h-full w-full object-cover"
        />
      </figure>
    </div>
    <div className="font-bold">
      <p className="mb-4 max-w-sm">
        {"Personal site of Luke Clark. Links, snippets and sometimes words."}
      </p>
      <p>
        {"@ljcl — "}
        <Link
          href="https://github.com/ljcl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"github"}
        </Link>
        {", "}
        <Link
          href="https://instagram.com/ljcl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"gram"}
        </Link>
      </p>
    </div>
  </aside>
);

export { Bio };
