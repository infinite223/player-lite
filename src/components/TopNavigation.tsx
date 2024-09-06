import { MdArrowBackIos } from "react-icons/md";

interface ITopNavigation {
  title: string;
  backAction: boolean;
}

export const TopNavigation = (props: ITopNavigation) => {
  return (
    <div className="flex w-full items-center gap-1 px-2">
      {props.backAction && (
        <a href="../">
          <MdArrowBackIos />
        </a>
      )}

      <h2>{props.title}</h2>
    </div>
  );
};
