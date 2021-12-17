import profileImg from './profile-img.jpg';
import Image from 'next/image';
import { Link } from '@/components/Link/Link';
import clsx from 'clsx';
import styles from './Bio.module.css';

const Bio = () => {
  return (
    <aside className="flex my-14">
      <div className={clsx('mb-8 mr-4', styles.avatar)}>
        <figure className={clsx('w-24 h-24', styles.mask, styles.maskSquircle)}>
          <Image src={profileImg} alt="Luke Clark" />
        </figure>
      </div>
      <div className="font-bold">
        <p className="max-w-sm mb-4">
          Personal site of Luke Clark. Links, snippets and sometimes words.
        </p>
        <p>
          <Link
            href="https://instagram.com/ljcl"
            target="_blank"
            rel="noopener noreferrer"
          >
            gram
          </Link>
          {/* {', '}
          <Link href="/rss.xml" target="_blank" rel="noopener noreferrer">
            rss
          </Link> */}
          {', '}
          <Link
            href="https://noot.space"
            target="_blank"
            rel="noopener noreferrer"
          >
            noot
          </Link>
          {', '}
          <Link
            href="https://mobile.twitter.com/lukejclark"
            target="_blank"
            rel="noopener noreferrer"
          >
            tweet
          </Link>
        </p>
      </div>
    </aside>
  );
};

export { Bio };
