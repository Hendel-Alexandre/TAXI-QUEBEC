export interface FareEstimate {
  baseFare: number;
  distanceKm: number;
  distanceRate: number;
  distanceFare: number;
  waitingMinutes: number;
  waitingRate: number;
  waitingFare: number;
  total: number;
  rateType: 'day' | 'night';
}

export const calculateFare = (distanceKm: number, waitingMinutes: number = 0): FareEstimate => {
  const now = new Date();
  const hour = now.getHours();
  
  // Day Rate (05:00 – 22:59)
  // Night Rate (23:00 – 04:59)
  const isNight = hour >= 23 || hour < 5;
  
  const rates = isNight ? {
    base: 4.70,
    perKm: 2.35,
    perMin: 0.89,
    type: 'night' as const
  } : {
    base: 4.10,
    perKm: 2.05,
    perMin: 0.77,
    type: 'day' as const
  };

  const distanceFare = distanceKm * rates.perKm;
  const waitingFare = waitingMinutes * rates.perMin;
  const total = rates.base + distanceFare + waitingFare;

  return {
    baseFare: rates.base,
    distanceKm: distanceKm,
    distanceRate: rates.perKm,
    distanceFare: distanceFare,
    waitingMinutes: waitingMinutes,
    waitingRate: rates.perMin,
    waitingFare: waitingFare,
    total: Math.round(total * 100) / 100,
    rateType: rates.type
  };
};

export const PRICE_DISCLAIMER_FR = "⚠️ Les prix affichés sont des estimations et peuvent varier par rapport au tarif final.";
export const PRICE_DISCLAIMER_EN = "⚠️ Prices shown are estimates only and may vary from the final fare.";
