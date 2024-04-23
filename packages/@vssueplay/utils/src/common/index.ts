import { stringify } from "qs";

export const formatUrl = (cleanURL: string, params: Record<string, string>) => {
  const query = stringify(params, { addQueryPrefix: true });
  return `${cleanURL}${query}`;
};


export function getQueryValue(key: string) {
  const search = window.location.search;
  const params = new URLSearchParams(search);

  return params.get(key);
}