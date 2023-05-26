import clsx from 'clsx';
import styles from './CodeBlock.module.css';

interface CodeBlockProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  > {
  children?: React.ReactNode;
  className?: string;
}

export const CodeBlock = ({
  children,
  className,
  ...preProps
}: CodeBlockProps) => {
  return (
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
      <div className="code-container">{children}</div>
    </pre>
  );
};
