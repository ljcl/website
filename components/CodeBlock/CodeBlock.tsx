import clsx from 'clsx';
import styles from './CodeBlock.module.css';

interface CodeBlockProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  > {
  children: React.ReactNode;
  className?: string;
  lang?: string;
}

export const CodeBlock = ({
  children,
  className,
  lang,
  ...preProps
}: CodeBlockProps) => (
  <pre
    {...preProps}
    className={clsx(
      className,
      styles.pre,
      '!leading-normal',
      'not-prose',
      '!p-4',
      '!mb-12'
    )}
  >
    {lang && <div className={styles.languageIdClasses}>{lang}</div>}
    <div className="code-container">{children}</div>
  </pre>
);
