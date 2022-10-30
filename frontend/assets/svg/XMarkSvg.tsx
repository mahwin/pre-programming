interface IXMarkSvg {
  width: string;
  height: string;
  color: string;
  stroke?: number;
}

export function XMarkSvg({ width, height, color, stroke = 8 }: IXMarkSvg) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={stroke}
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
