import profileImg from './profile-img.jpg';
import Image from 'next/image';
import { Link } from '#components/Link/Link';
import { cn } from '#util/cn';
import styles from './bio.module.css';

const Bio = () => {
  return (
    <aside className="flex my-14">
      <div className={cn('mb-8 mr-4', styles.avatar)}>
        <figure className={cn('w-24 h-24', styles.mask, styles.maskSquircle)}>
          <Image src={profileImg} alt="Luke Clark" />
        </figure>
      </div>
      <div className="font-bold">
        <p className="max-w-sm mb-4">
          Personal site of Luke Clark. Links, snippets and sometimes words.
        </p>
        <p>
          {'@ljcl — '}
          <Link
            href="https://github.com/ljcl"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </Link>
          {', '}
          <Link
            href="https://instagram.com/ljcl"
            target="_blank"
            rel="noopener noreferrer"
          >
            gram
          </Link>
        </p>
      </div>
    </aside>
  );
};

export { Bio };
