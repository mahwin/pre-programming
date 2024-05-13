import styled from "styled-components";
import { userVocaColors } from "@color/userVocaColor";
import { CategoryItem } from "@type/commons/categories";
import { FolderSvg } from "@svg";

interface Props {
  item: CategoryItem;
}

export function DisabledCateogoryCard({ item }: Props) {
  return (
    <VocaCard>
      <Overray>
        <div>
          <p>Not Yet</p>
        </div>
      </Overray>
      <Col>
        <h2>{item.category} (0)</h2>
        <SvgBox>
          <FolderSvg />
        </SvgBox>
      </Col>
    </VocaCard>
  );
}
const Overray = styled.div`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    padding: 15px 10px;
    background-color: ${userVocaColors.userVoca.overlayColor};
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 30px;
    font-weight: ${(props) => props.theme.fontWeight.xbold};
  }
`;

const VocaCard = styled.article`
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${userVocaColors.userVoca.CardBgColor};
  font-weight: ${(props) => props.theme.fontWeight.base};
  div {
    pointer-events: none;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 14px;
`;

const SvgBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 5px 0px;
`;
