import type { CSSProperties, ElementType, ReactNode } from 'react';

type SafeAreaEdge = 'top' | 'bottom' | 'left' | 'right';

interface SafeAreaProps {
  children?: ReactNode;
  edges?: SafeAreaEdge[];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

const edgeToPaddingKey = {
  top: 'paddingTop',
  bottom: 'paddingBottom',
  left: 'paddingLeft',
  right: 'paddingRight',
} as const satisfies Record<SafeAreaEdge, keyof CSSProperties>;

const SafeArea = ({
  children,
  edges = ['top', 'bottom'],
  as,
  className,
  style,
}: SafeAreaProps) => {
  const Tag = (as ?? 'div') as ElementType;

  const safePadding: CSSProperties = edges.reduce((acc, edge) => {
    acc[edgeToPaddingKey[edge]] = `env(safe-area-inset-${edge})`;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Tag className={className} style={{ ...safePadding, ...style }}>
      {children}
    </Tag>
  );
};

export default SafeArea;
