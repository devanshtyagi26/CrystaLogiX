export type BandgapCategory = "metal" | "semiconductor" | "insulator";

export type PredictMaterialResponse = {
  success: boolean;
  material: Material;
  stage1: {
    is_metal: boolean;
    class_label: number;
    prob_metal: number;
    prob_non_metal: number;
  };
  stage2: {
    bandgap_ev: number | null;
    bandgap_category: BandgapCategory;
  };
};

export type MaterialSearchResponse = {
  materials: Material[];
  total: number;
};

export type ServerState = "connecting" | "ready" | "down";

export type Material = {
  id: string;
  name: string;
  formula: string;
  actual: number;
  isMetal: boolean;
};

export type InferenceResult = {
  isMetal: boolean;
  classLabel: number;
  probMetal: number;
  probNonMetal: number;
  bandgapEv: number | null;
  bandgapCategory: BandgapCategory;
};
 
export type LabelRecord = Record<string, number>;

export type TargetRecord = {
  "Pretty Formula"?: string;
  "Formula"?: string;
  "Band Gap (T)"?: number;
  "Band Gap"?: number;
  Is_Metal?: number;
  IsMetal?: number;
};

export type MaterialOption = {
  id: string;
  name: string;
  formula: string;
  actual: number;
  isMetal: boolean;
};

export type HoverCard = {
  model: string;
  note: string;
  improvement: number;
  x: number;
  y: number;
};

export type BandgapPrediction = {
  isMetal: boolean;
  classLabel: number;
  probMetal: number;
  probNonMetal: number;
  bandgapEv: number | null;
  bandgapCategory: BandgapCategory;
};