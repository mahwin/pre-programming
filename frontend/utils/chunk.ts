interface IProps {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
}

export default function chunk(data: IProps[], size: number) {
  const items = [...data];
  const arr = [];
  while (items.length) {
    arr.push(items.splice(0, size));
  }

  return arr;
}
