interface CodeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  children: React.ReactNode;
  block?: boolean;
}

export const Code = ({ block, children, ...codeProps }: CodeProps) => {
  if (block) return <code {...codeProps}>{children}</code>;
  return <code>{children}</code>;
};
