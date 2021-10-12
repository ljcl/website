import Image from "next/image";
import { Link } from "#components/Link/Link";
import { cn } from "#util/cn";
import styles from "./bio.module.css";
import profileImg from "./profile-img.jpg";

const Bio = () => (
  <aside className="my-14 flex">
    <div className={cn("mr-4 mb-8", styles.avatar)}>
      <figure className={cn("h-24 w-24", styles.mask, styles.maskSquircle)}>
        <Image src={profileImg} alt="Luke Clark" />
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
