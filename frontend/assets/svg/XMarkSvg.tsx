interface IXMarkSvg {
  width: string;
  height: string;
  color: string;
}

export function XMarkSvg({ width, height, color }: IXMarkSvg) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={8}
      stroke="currentColor"
      width={width}
      height={height}
      color={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
