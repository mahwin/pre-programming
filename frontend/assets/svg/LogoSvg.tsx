import Icon from "./Icon";
import styled from "styled-components";

interface ILogo {
  width: string;
  height: string;
}

const Svg = styled.svg`
  display: block;
  max-width: 100%;
  height: auto;

  path {
    width: 100%;
    height: 100%;
  }
`;

function LogoSvg({ width, height }: ILogo) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 78 110"
      fill="none"
    >
      <g clip-path="url(#clip0_102_178)">
        <path
          d="M1.1704 29.7875C1.14442 25.8786 5.38163 23.4323 8.71847 25.4296L72.3486 63.5176C75.6214 65.4766 75.5731 70.2598 72.2614 72.1718L40.6941 90.3972L9.12678 108.623C5.81498 110.535 1.69143 108.16 1.66594 104.326L1.1704 29.7875Z"
          fill="#004445"
        />
        <path
          d="M1.1704 25.0874C1.14442 21.1785 5.38163 18.7321 8.71847 20.7295L72.3486 58.8174C75.6214 60.7765 75.5731 65.5596 72.2614 67.4717L40.6941 85.697L9.12678 103.922C5.81498 105.834 1.69143 103.46 1.66594 99.6261L1.1704 25.0874Z"
          fill="#F1F0F4"
        />
        <path
          d="M1.16558 20.2614C1.13959 16.3525 5.37681 13.9062 8.71364 15.9036L72.3438 53.9915C75.6165 55.9505 75.5683 60.7337 72.2565 62.6457L40.6892 80.8711L9.12196 99.0965C5.81016 101.009 1.68661 98.634 1.66112 94.8001L1.16558 20.2614Z"
          fill="#E6E6E6"
        />
        <path
          d="M1.16558 15.2614C1.13959 11.3525 5.37681 8.90618 8.71364 10.9036L72.3438 48.9915C75.6165 50.9505 75.5683 55.7337 72.2565 57.6457L40.6892 75.8711L9.12196 94.0965C5.81016 96.0086 1.68661 93.634 1.66112 89.8001L1.16558 15.2614Z"
          fill="#F1F0F4"
        />
        <path
          d="M1.16558 11.5542C1.13959 7.64534 5.37681 5.199 8.71364 7.19637L72.3438 45.2843C75.6165 47.2433 75.5683 52.0265 72.2565 53.9385L40.6892 72.1639L9.12196 90.3893C5.81016 92.3014 1.68661 89.9268 1.66112 86.093L1.16558 11.5542Z"
          fill="#E6E6E6"
        />
        <path
          d="M0.948404 5.92391C0.959031 2.05708 5.13674 -0.354921 8.45603 1.58939L72.9544 39.37C76.2636 41.3084 76.2376 46.1257 72.9077 48.0482L8.20285 85.4056C4.87291 87.3281 0.731319 84.9169 0.741913 81.0619L0.948404 5.92391Z"
          fill="#004445"
        />
        <g filter="url(#filter0_d_102_178)">
          <path
            d="M52.8786 73.3566C53.0109 77.0569 51.0084 80.4336 51.141 84.1397C51.2591 87.4424 52.5441 89.6823 54.616 92.254"
            stroke="#004445"
            stroke-width="2"
            stroke-linecap="round"
          />
        </g>
        <path
          d="M54.1779 91.2664C54.9916 92.105 55.6889 93.0874 56.4344 93.9691C56.9585 94.589 57.5165 95.1702 58.0871 95.7583"
          stroke="#004445"
          stroke-width="0.7"
          stroke-linecap="round"
        />
        <path
          d="M54.9706 91.838C55.7842 92.6767 56.899 93.1582 57.8239 93.8245C58.4742 94.293 59.0417 94.8628 59.6123 95.451"
          stroke="#004445"
          stroke-width="0.7"
          stroke-linecap="round"
        />
        <path
          d="M54.4041 92.4328C54.4258 92.7586 54.5053 93.2357 54.5456 93.5266C54.5756 93.7427 54.6047 93.9685 54.6336 94.1826C54.6527 94.3245 54.6638 94.5794 54.6859 94.6981C54.7134 94.8449 54.7264 95.2003 54.7535 95.3884C54.7887 95.6328 54.8186 95.9028 54.8533 96.154C54.8931 96.4409 54.9408 96.6883 54.9777 96.9545"
          stroke="#004445"
          stroke-width="0.7"
          stroke-linecap="round"
        />
        <path
          d="M53.9611 93.3249C53.991 94.1613 53.8371 95.0247 53.7873 95.854C53.7523 96.4371 53.7688 97.0141 53.7897 97.6006"
          stroke="#004445"
          stroke-width="0.7"
          stroke-linecap="round"
        />
        <path
          d="M54.9483 93.4649C55.5506 94.0857 55.8174 95.1119 56.262 95.8932C56.5746 96.4424 56.982 96.8794 57.4043 97.3147"
          stroke="#004445"
          stroke-width="0.7"
          stroke-linecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_102_178"
          x="46.1433"
          y="72.348"
          width="13.4642"
          height="28.9145"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.34 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_102_178"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_102_178"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_102_178">
          <rect width="78" height="110" fill="white" />
        </clipPath>
      </defs>
    </Svg>
  );
}

export { LogoSvg };
