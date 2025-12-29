"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  LocationPoint,
  RoutePoint,
  TrackingState,
  calculateRemainingDistance,
  calculateDynamicETA,
  requestLocationPermission,
  startLocationTracking,
} from '@/lib/gps-tracker';

const initialState: TrackingState = {
  currentLocation: null,
  remainingDistance: 0,
  remainingDuration: 0,
  estimatedArrival: null,
  isTracking: false,
  hasPermission: false,
  errorMessage: null,
  progressPercent: 0,
};

export const useGpsTracker = (
  totalDistance: number,
  totalDuration: number,
  destinationLat?: number,
  destinationLng?: number,
  routePoints?: RoutePoint[]
) => {
  const [state, setState] = useState<TrackingState>(initialState);
  const stopTrackingRef = useRef<(() => void) | null>(null);
  const initialDistanceRef = useRef(totalDistance);

  const requestPermission = useCallback(async () => {
    try {
      const granted = await requestLocationPermission();
      setState((prev) => ({
        ...prev,
        hasPermission: granted,
        errorMessage: granted ? null : 'Location permission denied',
      }));
      return granted;
    } catch (err) {
      setState((prev) => ({
        ...prev,
        hasPermission: false,
        errorMessage: 'Failed to request location permission',
      }));
      return false;
    }
  }, []);

  const startTracking = useCallback(async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    setState((prev) => ({
      ...prev,
      isTracking: true,
      errorMessage: null,
    }));

    const handleLocationUpdate = (location: LocationPoint) => {
      setState((prev) => {
        let remainingDist = prev.remainingDistance;
        let remainingDur = prev.remainingDuration;
        let eta: Date | null = null;
        let progress = 0;

        if (destinationLat !== undefined && destinationLng !== undefined && routePoints) {
          remainingDist = calculateRemainingDistance(
            location.lat,
            location.lng,
            routePoints
          );
          remainingDur = calculateDynamicETA(remainingDist, location.speed || null);

          const now = new Date();
          eta = new Date(now.getTime() + remainingDur * 60000);

          progress =
            initialDistanceRef.current > 0
              ? ((initialDistanceRef.current - remainingDist) / initialDistanceRef.current) * 100
              : 0;
        }

        return {
          ...prev,
          currentLocation: location,
          remainingDistance: remainingDist,
          remainingDuration: remainingDur,
          estimatedArrival: eta,
          progressPercent: Math.min(100, Math.max(0, progress)),
        };
      });
    };

    const handleError = (error: string) => {
      setState((prev) => ({
        ...prev,
        errorMessage: error,
        isTracking: false,
      }));
    };

    stopTrackingRef.current = startLocationTracking(handleLocationUpdate, handleError);
  }, [requestPermission, destinationLat, destinationLng, routePoints]);

  const stopTracking = useCallback(() => {
    if (stopTrackingRef.current) {
      stopTrackingRef.current();
      stopTrackingRef.current = null;
    }
    setState((prev) => ({
      ...prev,
      isTracking: false,
    }));
  }, []);

  const reset = useCallback(() => {
    stopTracking();
    initialDistanceRef.current = totalDistance;
    setState(initialState);
  }, [stopTracking, totalDistance]);

  useEffect(() => {
    initialDistanceRef.current = totalDistance;
  }, [totalDistance]);

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return {
    ...state,
    requestPermission,
    startTracking,
    stopTracking,
    reset,
  };
};
