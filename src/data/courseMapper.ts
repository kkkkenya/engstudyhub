export interface CrossCampusEquivalency {
  canonicalTopic: string;
  discipline: "Mechanical" | "Civil" | "Electrical" | "Aerospace" | "Common Math";
  kuCode: string;
  equivalents: {
    JKUAT?: string;
    UON?: string;
    TUK?: string;
    DEKUT?: string;
    MOI?: string;
  };
}

export const CROSS_CAMPUS_UNITS: CrossCampusEquivalency[] = [
  {
    canonicalTopic: "Fluid Mechanics I (Incompressible Flow & Hydrostatics)",
    discipline: "Mechanical",
    kuCode: "EMM 203",
    equivalents: {
      JKUAT: "EMG 2205",
      UON: "FME 241",
      TUK: "EMEI 2203",
      DEKUT: "EMG 2205",
      MOI: "MCE 212"
    }
  },
  {
    canonicalTopic: "Solid & Structural Mechanics I (Stress, Strain, Mohr's Circle)",
    discipline: "Mechanical",
    kuCode: "EMM 201",
    equivalents: {
      JKUAT: "EMG 2204",
      UON: "FME 221",
      TUK: "EMEI 2201",
      DEKUT: "EMG 2204",
      MOI: "MCE 211"
    }
  },
  {
    canonicalTopic: "Engineering Thermodynamics I (First & Second Laws, Vapor Cycles)",
    discipline: "Mechanical",
    kuCode: "EMM 202",
    equivalents: {
      JKUAT: "EMG 2206",
      UON: "FME 231",
      TUK: "EMEI 2202",
      DEKUT: "EMG 2206",
      MOI: "MCE 214"
    }
  },
  {
    canonicalTopic: "Mechanics of Machines & Shaft/Coupling Design",
    discipline: "Mechanical",
    kuCode: "EMM 318",
    equivalents: {
      JKUAT: "EMG 2301",
      UON: "FME 311",
      TUK: "EMEI 3102",
      DEKUT: "EMG 2301",
      MOI: "MCE 315"
    }
  },
  {
    canonicalTopic: "Ordinary Differential Equations & Integral Calculus for Engineers",
    discipline: "Common Math",
    kuCode: "ECU 201",
    equivalents: {
      JKUAT: "SMA 2173",
      UON: "FMA 201",
      TUK: "AMAT 2101",
      DEKUT: "SMA 2173",
      MOI: "MAT 211"
    }
  }
];

export function findEquivalentCodes(kuCode: string): CrossCampusEquivalency | undefined {
  const normalized = kuCode.trim().toUpperCase();
  return CROSS_CAMPUS_UNITS.find((u) => u.kuCode.toUpperCase() === normalized);
}
