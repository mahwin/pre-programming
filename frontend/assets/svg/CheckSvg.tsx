interface ICheckSvg {
  width: string;
  height: string;
  color: string;
}

export function CheckSvg({ width, height, color }: ICheckSvg) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={8}
      stroke="currentColor"
      className="w-6 h-6"
      width={width}
      height={height}
      color={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}
