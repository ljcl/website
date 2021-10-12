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
  <pre {...preProps} className={`${className} ${styles.pre}`}>
    {lang && <div className={styles.languageIdClasses}>{lang}</div>}
    <div className="code-container">{children}</div>
  </pre>
);
