const path = "/MyFolder";

export const fetchStorage = (): Set<number> => {
  const json = localStorage.getItem(path);
  return json ? deserializeJson(json) : new Set<number>();
};

export const storeStorage = (set: Set<number>): void => {
  const newJson = serializeJson(set);
  localStorage.setItem(path, newJson);
};

export const deserializeJson = (json: string): Set<number> => {
  const set = new Set<number>(JSON.parse(json));
  return set;
};

export const serializeJson = (set: Set<number>): string =>
  JSON.stringify(Array.from(set));
