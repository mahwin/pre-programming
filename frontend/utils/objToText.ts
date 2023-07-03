import { IProfile } from "@type/userInfo";

export default function objToTest(data: IProfile) {
  let textArray = [];
  if (data.name) textArray.push(`닉네임을 ${data.name} (으)로 `);
  if (data.phone) textArray.push(`전화번호를 ${data.phone} (으)로 `);
  if (data.avatar) textArray.push(`아바타를 `);
  return textArray.join("\n") + "변경 하시겠습니까?";
}
