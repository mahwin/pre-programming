import { keyframes } from "styled-components";

const explode = keyframes`
  0%{
		opacity: 0;
		transform: scale(10);
	}
	60%{
		opacity: 1;
		transform: scale(0.5);
	}
	100%{
		opacity: 1;
		transform: scale(1);
	}
`;
const dropZero = keyframes`
0% {
  opacity: 0;
  transform: translateY(20px);
  height: 10px;
}
20% {
  opacity:1;
}
100% {
  transform: translateY(-2px);
  height: 0px;
  opacity:0;
}`;

const dropOne = keyframes`	
0% {
  opacity: 0;
  transform: rotate(-55deg) translate(-20px);
  width: 10px;
}
20% {
  opacity:1;
}
100% {
  transform: rotate(-55deg) translate(9px);
  width: 0px;
  opacity:0;
}
`;

const dropTwo = keyframes`
0% {
 		opacity: 0;
 		transform: translate(-20px);
 		width: 10px;
 	}
 	20% {
 		opacity:1;
 	}
 	100% {
 		transform: translate(9px);
 		width: 0px;
 		opacity:0;
 	}
`;

const dropThree = keyframes`
0% {
  opacity: 0;
  transform: rotate(55deg) translate(-20px);
  width: 10px;
}
20% {
  opacity:1;
}
100% {
  transform: rotate(55deg) translate(9px);
  width: 0px;
  opacity:0;
}`;

const dropFour = keyframes`
0% {
 		opacity: 0;
 		transform: rotate(55deg) translate(20px);
 		width: 10px;
 	}
 	20% {
 		opacity:1;
 	}
 	100% {
 		transform: rotate(55deg) translate(-9px);
 		width: 0px;
 		opacity:0;
 	}`;

const dropFive = keyframes`
0% {
  opacity: 0;
  transform: translate(20px);
  width: 10px;
}
20% {
  opacity:1;
}
100% {
  transform: translate(-9px);
  width: 0px;
  opacity:0;
}`;

const dropSix = keyframes`
0% {
		opacity: 0;
		transform: rotate(-55deg) translate(20px);
		width: 10px;
	}
	20% {
		opacity:1;
	}
	100% {
		transform: rotate(-55deg) translate(-9px);
		width: 0px;
		opacity:0;
	}`;

const dropSeven = keyframes`
0% {
		opacity: 0;
		transform: translateY(-20px);
		height: 10px;
	}
	20% {
		opacity:1;
	}
	100% {
		transform: translateY(2px);
		height: 0px;
		opacity:0;
	}`;

const clockAnimation = keyframes`
	0%{
		stroke-dashoffset: 0;
	}
	100%{
		stroke-dashoffset: 400;
	}
`;

const CursorAnimate = keyframes`
	0%{
		box-shadow: inset -3px 0px 0px #888;
	}
	100%{
		box-shadow: inset -3px 0px 0px transparent;
	}
`;

const vibration = keyframes`
	from {
		transform: rotate(3deg);
	}
  to {
    transform: rotate(-3deg);
  }
`;

const fadeInAndOut = keyframes`
	/* 효과를 동작시간 동안 0 ~ 1까지 */
		0% {
			opacity: 0;
		}
		50%{
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	`;

const fadeout = keyframes`
	/* 효과를 동작시간 동안 0 ~ 1까지 */
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	`;

export {
  explode,
  dropZero,
  dropOne,
  dropTwo,
  dropThree,
  dropFour,
  dropFive,
  dropSix,
  dropSeven,
  clockAnimation,
  CursorAnimate,
  vibration,
  fadeInAndOut,
};
