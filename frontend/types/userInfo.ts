import { MouseEvent } from "react";
interface IForm {
  data: {
    phone: string;
    name: string;
    currentAvatar: string;
  };
  isAvatarChange: boolean;
  isCan: boolean;
}

interface IFormData {
  name?: string;
  phone?: string;
}

interface IConfirm {
  ok: boolean;
  message?: string;
  data: {
    name?: string;
    phone?: string;
  };
}

interface IUpdate extends IFormData {
  avatar?: string;
}

interface IAvatars {
  isOpen: boolean;
  avatar: string;
  onClick: () => void;
  onSelect: (e: MouseEvent) => void;
}

export type { IForm, IConfirm, IUpdate, IFormData, IAvatars };
