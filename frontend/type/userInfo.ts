import { MouseEvent } from "react";

interface IProfile {
  name?: string;
  phone?: string;
  currentAvatar?: string;
  avatar?: string;
}

interface IForm {
  data: IProfile;
  isAvatarChange?: boolean;
  isCan?: boolean;
}

interface IConfirm {
  ok: boolean;
  message?: string;
  data: IProfile;
}

interface IAvatars {
  isOpen: boolean;
  avatar: string;
  onClick: () => void;
  onSelect: (e: MouseEvent) => void;
}

export type { IForm, IConfirm, IProfile, IAvatars };
