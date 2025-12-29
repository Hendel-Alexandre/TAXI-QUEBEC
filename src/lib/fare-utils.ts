export interface FareEstimate {
  baseFare: number;
  distanceFare: number;
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
    distanceFare,
    waitingFare,
    total: Math.round(total * 100) / 100,
    rateType: rates.type
  };
};

export const PRICE_DISCLAIMER_FR = "Prix estimé — le tarif final peut varier selon la circulation, l’attente et le taximètre du véhicule.";
export const PRICE_DISCLAIMER_EN = "Estimated price — final fare may vary based on traffic, waiting time, and the vehicle’s taximeter.";
