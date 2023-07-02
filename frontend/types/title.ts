type DevCategoryType = "web";

type titleItemType = {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
};

type titleType = {
  [key in DevCategoryType]: titleItemType[];
};

interface Ititle {
  data: titleType;
}

export type { DevCategoryType, titleItemType, titleType, Ititle };
