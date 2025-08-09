import React from 'react';
const hiddenStyles = {
  display: 'inline-block',
  position: 'absolute',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  height: 1,
  width: 1,
  margin: -1,
  padding: 0,
  border: 0,
} as const;

const VisuallyHidden: React.FC<{ children: React.ReactElement }> = ({
  children,
  ...delegated
}) => {
  return (
    <span style={hiddenStyles} {...delegated}>
      {children}
    </span>
  );
};
export { VisuallyHidden };
