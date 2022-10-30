import stlyed from "styled-components";
import { LoadingSvg } from "@svg";

const Wrapper = stlyed.div`
  width:100vw;
  height:50vh;
`;

export default function PageLoading() {
  return (
    <Wrapper>
      <LoadingSvg color="#00b894" width="100px" height="100px" />
    </Wrapper>
  );
}
