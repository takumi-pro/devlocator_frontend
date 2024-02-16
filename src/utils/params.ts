/**
 * オブジェクトで渡ってきた値をクエリストリングに変換する関数
 */
export const buildQueryString = (params: { [key: string]: string | null }) => {
  const { keyword, date, prefecture } = params;

  const queryParams = [];

  if (keyword) queryParams.push(`keyword=${keyword}`);
  if (date) queryParams.push(`date=${date}`);
  if (prefecture) queryParams.push(`prefecture=${prefecture}`);

  const queryString = queryParams.join("&");
  if (queryParams.length) return `?${queryString}`;
  return "";
};
