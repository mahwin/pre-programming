import styled from "styled-components";

interface Iprops {
  width?: string;
  height?: string;
  isCircle?: boolean;
  fillColor?: string;
}

export const FacebookSvg = ({
  width = "40",
  height = "40",
  fillColor = "white",
  isCircle = true,
}: Iprops) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      width={width}
      height={height}
    >
      {isCircle ? (
        <path
          fill="#0062e0"
          d="M16.7 39.8C7.2 38.1 0 29.9 0 20 0 9 9 0 20 0s20 9 20 20c0 9.9-7.2 18.1-16.7 19.8l-1.1-.9h-4.4l-1.1.9z"
        />
      ) : (
        ""
      )}
      <path
        fill={fillColor}
        d="m27.8 25.6.9-5.6h-5.3v-3.9c0-1.6.6-2.8 3-2.8H29V8.2c-1.4-.2-3-.4-4.4-.4-4.6 0-7.8 2.8-7.8 7.8V20h-5v5.6h5v14.1c1.1.2 2.2.3 3.3.3 1.1 0 2.2-.1 3.3-.3V25.6h4.4z"
      />
    </svg>
  );
};
