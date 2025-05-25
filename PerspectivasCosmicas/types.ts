export enum ZodiacSign {
  ARIES = "Aries",
  TAURUS = "Tauro",
  GEMINI = "Geminis",
  CANCER = "Cancer",
  LEO = "Leo",
  VIRGO = "Virgo",
  LIBRA = "Libra",
  SCORPIO = "Escorpio",
  SAGITTARIUS = "Sagitario",
  CAPRICORN = "Capricornio",
  AQUARIUS = "Acuario",
  PISCES = "Piscis",
}

export interface HoroscopePrediction {
  sign: ZodiacSign;
  text: string;
  date: string;
}

export interface NumerologyInput {
  input1: string;
  input2: string;
}

export interface NumerologyReport {
  inputs: NumerologyInput;
  reportText: string;
  analysisDate: string;
}
