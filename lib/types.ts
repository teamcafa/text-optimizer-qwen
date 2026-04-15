export type DimensionKey =
  | "zhuangbi"
  | "absurd"
  | "restrained"
  | "humor"
  | "academic"
  | "philosophy"
  | "buddhism"
  | "critical"
  | "satire"
  | "poetic"
  | "rage"
  | "nihilist";

export type Dimension = {
  key: DimensionKey;
  label: string;
  emoji: string;
  desc: string;
  color: string;
};

export type OptimizeRequestBody = {
  inputText: string;
  values: Record<string, number>;
};

export type OptimizeResponseBody = {
  text?: string;
  error?: string;
  detail?: unknown;
};