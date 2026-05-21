const svgModules = import.meta.glob<string>('/src/assets/svg/icon-*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

const Icon = ({ name, size = 24, className }: IconProps) => {
  const path = `/src/assets/svg/icon-${name}.svg`;
  const src = svgModules[path];

  if (!src) return null;

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className={className}
    />
  );
};

export default Icon;
