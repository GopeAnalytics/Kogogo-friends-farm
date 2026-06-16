import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MapPin, Navigation, Car, Clock } from "lucide-react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
const FARM_LOCATION: google.maps.LatLngLiteral = { lat: -1.2921, lng: 36.8219 };

export default function TripPlannerContainer() {
  return (
    <APIProvider apiKey={API_KEY} libraries={["places", "routes"]}>
      <TripPlanner />
    </APIProvider>
  );
}

function TripPlanner() {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [manualEntry, setManualEntry] = useState(false);
  const [loading, setLoading] = useState(false);

  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const placesLibrary = useMapsLibrary("places");

  const inputRef = useRef<HTMLInputElement>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  // Initialize DirectionsRenderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    const renderer = new routesLibrary.DirectionsRenderer({
      map,
      suppressMarkers: false,
    });
    setDirectionsRenderer(renderer);
    return () => {
      renderer.setMap(null);
    };
  }, [routesLibrary, map]);

  // Handle place selection from autocomplete
  useEffect(() => {
    if (!placesLibrary || !inputRef.current) return;

    const autocomplete = new placesLibrary.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "KE" },
      fields: ["geometry", "formatted_address"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setUserLocation(location);
        setManualEntry(false);
      }
    });
  }, [placesLibrary]);

  // Calculate route when userLocation changes
  useEffect(() => {
    if (!routesLibrary || !userLocation || !directionsRenderer) return;

    const directionsService = new routesLibrary.DirectionsService();
    directionsService.route(
      {
        origin: userLocation,
        destination: FARM_LOCATION,
        travelMode: routesLibrary.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === routesLibrary.DirectionsStatus.OK && result) {
          setDirections(result);
          directionsRenderer.setDirections(result);
        } else {
          console.error("Directions request failed due to " + status);
        }
      },
    );
  }, [routesLibrary, userLocation, directionsRenderer]);

  const handlePlanVisit = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setManualEntry(true);
          setLoading(false);
        },
      );
    } else {
      setManualEntry(true);
      setLoading(false);
    }
  };

  const route = directions?.routes[0]?.legs[0];
  const eta = route?.duration?.text;
  const distance = route?.distance?.text;

  return (
    <div className="flex flex-col h-full bg-card rounded-[2rem] overflow-hidden border border-border shadow-[var(--shadow-soft)]">
      <div className="relative flex-1 min-h-[400px]">
        <Map
          defaultCenter={FARM_LOCATION}
          defaultZoom={13}
          mapId="bf51a9102b3482bc" // Optional: add your Map ID for advanced styling
          className="w-full h-full"
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
        />

        <div className="absolute top-4 left-4 right-4 z-10 flex flex-col gap-2">
          {!userLocation && !manualEntry && (
            <Button
              onClick={handlePlanVisit}
              disabled={loading}
              className="w-full shadow-lg bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl"
            >
              <Navigation className="mr-2 h-5 w-5" />
              {loading ? "Locating..." : "Plan My Visit"}
            </Button>
          )}

          {manualEntry && (
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder="Enter your starting location in Kenya..."
                className="pl-12 py-6 shadow-lg bg-background border-2 border-primary/20 focus:border-primary rounded-2xl"
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-background border-t border-border">
        {directions ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    ETA
                  </p>
                  <p className="font-bold text-foreground">{eta}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border">
                <Car className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Distance
                  </p>
                  <p className="font-bold text-foreground">{distance}</p>
                </div>
              </div>
            </div>

            <Button
              className="w-full py-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${FARM_LOCATION.lat},${FARM_LOCATION.lng}&travelmode=driving`,
                  "_blank",
                )
              }
            >
              Start Driving
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              {manualEntry
                ? "Select a location to see travel time and route."
                : "Share your location to get directions to the farm."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
