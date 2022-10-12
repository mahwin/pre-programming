interface Iobj {
  name?: string;
  phone?: string;
  avatar?: string;
}

export default function objToTest(data: Iobj) {
  let textArray = [];
  if (data.name) textArray.push(`닉네임을 ${data.name}으로 `);
  if (data.phone) textArray.push(`전화번호를 ${data.phone}으로 `);
  if (data.avatar) textArray.push(`아바타를 `);
  return textArray.join("\n") + "변경 하시겠습니까?";
}
