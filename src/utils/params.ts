/**
 * オブジェクトで渡ってきた値をクエリストリングに変換する関数
 */
export const buildQueryString = (params: { [key: string]: string | null }) => {
  const { keyword, category, date, prefecture } = params;

  const queryParams = [];

  if (keyword) queryParams.push(`keyword=${keyword}`);
  if (category) queryParams.push(`category=${category}`);
  if (date) queryParams.push(`date=${date}`);
  if (prefecture) queryParams.push(`prefecture=${prefecture}`);

  const queryString = queryParams.join("&");
  if (queryParams.length) return `?${queryString}`;
  return "";
};

/**
 * keywordとcategoryクエリパラメータを引数に取り、カンマ区切りで結合させる関数
 * @param keyword キーワード
 * @param category カテゴリ
 */
export const translateQueryPramsCategoryToKeyword = (
  keyword: string | null,
  category: string | null
) => {
  if (keyword && !category) return keyword;
  if (!keyword && category) return category;
  if (keyword && category) return `${keyword},${category}`;
  return "";
};
