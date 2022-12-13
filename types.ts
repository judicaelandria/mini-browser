export type Shape = {
  id: string;
  point: number[];
  size: number[];
};

export type AppState = {
  currentSelectedShape: string | null;
};
