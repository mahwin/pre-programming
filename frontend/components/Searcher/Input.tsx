import { MagnifyingGlassSvg } from "@svg";
import styled from "styled-components";
import { Trie } from "@modules/Trie";
import { isNil } from "@utils/typeGuard";

interface Props {
  loading: boolean;
  trie: Trie | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  keyword: string;
}

export function Input({ handleChange, keyword, trie }: Props) {
  return (
    <InputBox>
      <MagnifyingGlassSvg width="24" height="24" color="green" />
      <InputElement
        disabled={isNil(trie)}
        onChange={handleChange}
        value={keyword}
      />
    </InputBox>
  );
}

const InputBox = styled.div`
  border-radius: 5px;
  overflow: hidden;
  height: 40px;
  width: 400px;
  display: flex;
  padding: 20px 5px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
`;

const InputElement = styled.input.attrs({
  placeholder: "단어를 입력하세요",
  spellCheck: false,
  type: "text",
})<
  React.HTMLAttributes<HTMLInputElement> & {
    value: string;
    disabled: boolean;
  }
>`
  padding: 10px;
  height: 36px;
  width: 100%;
  border: none;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colorTheme.textPrimary};
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colorTheme.activePrimary};
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
