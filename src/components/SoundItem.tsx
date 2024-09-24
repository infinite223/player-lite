import { FC } from "react";
import { BiDownload } from "react-icons/bi";

export interface ISoundItem {
  title: string;
  author: string;
  imgUrl?: string;
  download?: () => void;
}

export const SoundItem: FC<ISoundItem> = ({
  title,
  imgUrl,
  author,
  download,
}) => {
  return (
    <div className="flex items-center justify-between w-full p-1 gap-2 hover:opacity-60">
      <img alt="sound-image" className="w-10 h-10" src={imgUrl} />
      <div className="flex flex-col w-full text-sm">
        <h2 className="font-semibold leading-4 line-clamp-2">{title}</h2>
        <p className="text-xs font-thin">{author}</p>
      </div>

      {download && (
        <BiDownload
          size={20}
          className="w-20 cursor-pointer"
          onClick={download}
        />
      )}
    </div>
  );
};
