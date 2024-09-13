import { FC } from "react";

interface ISoundItem {
  title: string;
  author: string;
  imgUrl?: string;
}

export const SoundItem: FC<ISoundItem> = ({ title, imgUrl, author }) => {
  return (
    <div className="flex items-center w-full p-1 gap-2">
      <img alt="sound-image" className="w-12 h-12" src={imgUrl} />
      <div className="flex flex-col text-sm">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-xs font-thin">{author}</p>
      </div>
    </div>
  );
};
