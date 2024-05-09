export function formatter(name: string) {
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
  return name.split("-").reduce((a, c) => a + c[0].toUpperCase() + c.slice(1));
}

export function kebabCaser(name: string) {
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
