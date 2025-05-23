export enum ZodiacSign {
  ARIES = "Aries",
  TAURUS = "Tauro",
  GEMINI = "Géminis",
  CANCER = "Cáncer",
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
