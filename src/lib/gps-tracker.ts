export interface LocationPoint {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
  speed?: number;
}

export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface TrackingState {
  currentLocation: LocationPoint | null;
  remainingDistance: number;
  remainingDuration: number;
  estimatedArrival: Date | null;
  isTracking: boolean;
  hasPermission: boolean;
  errorMessage: string | null;
  progressPercent: number;
}

const EARTH_RADIUS_KM = 6371;

export const haversineDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
};

export const calculateRemainingDistance = (
  currentLat: number,
  currentLng: number,
  routePoints: RoutePoint[]
): number => {
  if (routePoints.length === 0) return 0;

  let totalDistance = 0;
  let closestPointIndex = 0;
  let closestDistance = Infinity;

  // Find the closest point on the route to current position
  for (let i = 0; i < routePoints.length; i++) {
    const distance = haversineDistance(
      currentLat,
      currentLng,
      routePoints[i].lat,
      routePoints[i].lng
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestPointIndex = i;
    }
  }

  // Calculate distance from closest point to destination
  for (let i = closestPointIndex; i < routePoints.length - 1; i++) {
    totalDistance += haversineDistance(
      routePoints[i].lat,
      routePoints[i].lng,
      routePoints[i + 1].lat,
      routePoints[i + 1].lng
    );
  }

  return totalDistance;
};

export const calculateDynamicETA = (
  remainingDistanceKm: number,
  speedKmh: number | null,
  fallbackSpeedKmh: number = 35
): number => {
  const effectiveSpeed = speedKmh && speedKmh > 0 ? speedKmh : fallbackSpeedKmh;
  const minutes = (remainingDistanceKm / effectiveSpeed) * 60;
  return Math.max(1, Math.ceil(minutes));
};

export const requestLocationPermission = async (): Promise<boolean> => {
  if (!("geolocation" in navigator)) {
    return false;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      () => resolve(true),
      () => resolve(false),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
};

export const startLocationTracking = (
  onLocationUpdate: (location: LocationPoint) => void,
  onError: (error: string) => void
): (() => void) => {
  let watchId: number | null = null;

  if (!("geolocation" in navigator)) {
    onError("Geolocation not available");
    return () => {};
  }

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude, accuracy, speed } = position.coords;
      const timestamp = position.timestamp;

      onLocationUpdate({
        lat: latitude,
        lng: longitude,
        accuracy,
        timestamp,
        speed: speed || undefined,
      });
    },
    (error) => {
      let errorMsg = "Location error";
      if (error.code === error.PERMISSION_DENIED) {
        errorMsg = "Permission denied";
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        errorMsg = "Position unavailable";
      } else if (error.code === error.TIMEOUT) {
        errorMsg = "Location request timeout";
      }
      onError(errorMsg);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );

  return () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }
  };
};
