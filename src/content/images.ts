export type ImageAsset = Readonly<{
  key: string;
  path: `/images/${string}`;
  alt: string;
  subject: string;
  aspectRatio: `${number}/${number}`;
  section: string;
}>;

export const images: readonly ImageAsset[] = [];
