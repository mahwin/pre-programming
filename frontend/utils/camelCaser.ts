export default function formatter(name: string) {
  const nameList = name.split("-");
  nameList.forEach((string, idx) => {
    if (idx !== 0) {
      nameList[idx] = string[0].toUpperCase() + string.slice(1);
    }
  });

  return camelCaser(nameList.join(""));
}

export function camelStrToMiddleBarStr(camelString: string) {
  let result = [];
  let str = "";
  for (let i = 0; i < camelString.length; i++) {
    if (camelString[i].match(/[A-Z]/)) {
      result.push(str);
      str = camelString[i].toLowerCase();
    } else str += camelString[i];
  }
  result.push(str);
  return result.join("-");
}

export function camelCaser(name: string) {
  return name[0].toLowerCase() + name.slice(1);
}
