import { formatUrl } from "./utils";

export function createFetch() {
  const _fetch = (url: string, config?: RequestInit): Promise<any> => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        ...config,
      })
        .then(async (fetchResponse) => {
          const data = await fetchResponse.clone()["json"]();

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const get = (
    url: string,
    body: Record<string, any> = {},
    config?: RequestInit
  ) => {
    const _url = formatUrl(url, body);

    return _fetch(_url, config);
  };

  const post = (
    url: string,
    body: Record<string, any> = {},
    config?: RequestInit
  ) => {
    return _fetch(url, {
      ...config,
      body: JSON.stringify(body),
    });
  };

  return {
    get,
    post,
  };
}
