declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export const meta: { title: string; date: string?; description: string? };
  export default MDXComponent;
}
