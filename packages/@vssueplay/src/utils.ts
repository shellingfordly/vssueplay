import { stringify } from "qs";

export const formatUrl = (cleanURL: string, params: Record<string, string>) => {
  const query = stringify(params, { addQueryPrefix: true });
  return `${cleanURL}${query}`;
};
