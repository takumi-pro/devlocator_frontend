import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

type Props = {
  clickBookmark: () => void;
  isBookmark: boolean;
};

/**
 * Bookmark
 */
export const Bookmark = ({ clickBookmark, isBookmark }: Props) => {
  return (
    <div
      onClick={clickBookmark}
      className="absolute right-3 top-3 z-sidebar-z flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-bookmark-bghover hover:text-bookmark-primary"
    >
      {!isBookmark && <FaRegBookmark className="text-lg text-bookmark-no" />}
      {isBookmark && <FaBookmark className="text-lg text-bookmark-primary" />}
    </div>
  );
};
