import { format } from "date-fns";

import { DAYS_TO_ADD_FOR_NEXT_DAY } from "@/const/date";

/**
 * 指定された日付範囲をカンマ区切りの文字列に変換
 * @param startDate 開始日
 * @param endDate 終了日
 */
export const dateRangeToString = (startDate: Date, endDate?: Date) => {
  if (!endDate) return format(startDate, "yyyyMMdd");

  const dateStrings: string[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const formattedDate = format(currentDate, "yyyyMMdd");
    dateStrings.push(formattedDate);

    // TODO: 別ファイルで管理
    currentDate.setDate(currentDate.getDate() + DAYS_TO_ADD_FOR_NEXT_DAY);
  }

  return dateStrings.join(",");
};
