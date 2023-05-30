interface IProps {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
}

export default function chunk(data: IProps[], size: number) {
  let preIdx = 0;
  let result = [];
  const maxLen = Math.ceil(data.length / size);
  for (let i = 0; i < maxLen; i++) {
    result.push(data.slice(preIdx, preIdx + size));
    preIdx += size;
  }
  return result;
}
