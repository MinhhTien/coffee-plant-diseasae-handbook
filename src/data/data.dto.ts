export interface VarietyDto {
  _id: string;
  name: string;
  description: string;
  scientificName: string;
  origin: string;
  distribution: string;
  suitableClimate: string;
  height: string;
  leaf: string;
  bean: string;
  flavor: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export interface DiseaseDto {
  _id: string;
  name: string;
  reason: string;
  description: string;
  effectedVarieties: VarietyDto[];
  symptoms: [
    {
      name: string;
      description: string;
      level: string;
    },
  ];
  location: {
    province: string;
    description: string;
    ward: string;
  };
  time: {
    startTime: string;
    endTime: string;
    season: string;
  };
  preventions: [
    {
      name: string;
      type: string;
      effective: number;
      instruction: string;
      note: string;
    },
  ];
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface SummaryDto {
  varietyCount: number;
  diseaseCount: number;
  symptomCount: number;
  preventionCount: number;
}

export interface SymtomByLevelDto {
  _id: "HIGH" | "MEDIUM" | "LOW";
  count: number;
}
