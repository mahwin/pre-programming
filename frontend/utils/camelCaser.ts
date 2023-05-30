export default function formatter(name: string) {
  const nameList = name.split("-");
  nameList.forEach((string, idx) => {
    if (idx !== 0) {
      nameList[idx] = string[1].toUpperCase() + string.slice(1);
    }
  });
  return nameList.join("");
}

export function camelCaser(name: string) {
  return name[0].toLowerCase() + formatter(name.slice(1));
}
