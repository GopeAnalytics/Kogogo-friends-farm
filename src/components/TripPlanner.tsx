import React, { useState, useEffect, useRef } from "react";
import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MapPin, Navigation, Car, Clock } from "lucide-react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
const FARM_LOCATION: google.maps.LatLngLiteral = { lat: 0.0607, lng: 34.2882 };

export default function TripPlannerContainer() {
  return (
    <APIProvider apiKey={API_KEY} libraries={["places", "routes", "marker", "geometry"]}>
      <TripPlanner />
    </APIProvider>
  );
}

function TripPlanner() {
  return (
    <div className="flex flex-col h-full bg-card rounded-[2rem] overflow-hidden border border-border shadow-[var(--shadow-soft)]">
      <div className="relative flex-1 min-h-[400px]">
        <Map
          defaultCenter={FARM_LOCATION}
          defaultZoom={13}
          mapId="bf51a9102b3482bc"
          className="w-full h-full"
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
        >
          <TripPlannerContent />
        </Map>
      </div>
    </div>
  );
}

function TripPlannerContent() {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [routeData, setRouteData] = useState<{
    eta: string;
    distance: string;
  } | null>(null);
  const [manualEntry, setManualEntry] = useState(false);
  const [loading, setLoading] = useState(false);

  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const placesLibrary = useMapsLibrary("places");

  const inputRef = useRef<HTMLInputElement>(null);
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  useEffect(() => {
    return () => {
      polylinesRef.current.forEach((p) => p.setMap(null));
      markersRef.current.forEach((m) => (m.map = null));
    };
  }, []);

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
  }, [placesLibrary, manualEntry]);

  useEffect(() => {
    if (!routesLibrary || !userLocation || !map) return;

    const calculateRoute = async () => {
      try {
        const request: google.maps.routes.ComputeRoutesRequest = {
          origin: userLocation,
          destination: FARM_LOCATION,
          travelMode: routesLibrary.TravelMode.DRIVING,
          routingPreference: routesLibrary.RoutingPreference.TRAFFIC_AWARE,
          fields: [
            "routes.duration",
            "routes.distanceMeters",
            "routes.polyline",
            "routes.legs.localizedValues",
          ],
        };

        const { routes } = await routesLibrary.Route.computeRoutes(request);

        if (routes && routes.length > 0) {
          const route = routes[0];

          polylinesRef.current.forEach((p) => p.setMap(null));
          polylinesRef.current = [];
          markersRef.current.forEach((m) => (m.map = null));
          markersRef.current = [];

          if (route.path) {
            const polyline = new google.maps.Polyline({
              path: route.path,
              geodesic: true,
              strokeColor: "#10b981",
              strokeOpacity: 0.8,
              strokeWeight: 6,
              map: map,
            });
            polylinesRef.current = [polyline];
          }

          const { AdvancedMarkerElement } = (await google.maps.importLibrary(
            "marker",
          )) as google.maps.MarkerLibrary;

          const startMarker = new AdvancedMarkerElement({
            map,
            position: userLocation,
            title: "Your Location",
          });

          const endMarker = new AdvancedMarkerElement({
            map,
            position: FARM_LOCATION,
            title: "The Kogogo Farm",
          });

          markersRef.current = [startMarker, endMarker];

          const leg = route.legs?.[0];
          if (leg) {
            setRouteData({
              eta: leg.localizedValues?.duration || "N/A",
              distance: leg.localizedValues?.distance || "N/A",
            });
          }

          if (route.path && route.path.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            route.path.forEach((point) => bounds.extend(point));
            map.fitBounds(bounds, 50);
          }
        }
      } catch (error) {
        console.error("Error computing routes:", error);
      }
    };

    calculateRoute();
  }, [routesLibrary, userLocation, map]);

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

  return (
    <>
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

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border z-10">
        {routeData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    ETA
                  </p>
                  <p className="font-bold text-foreground">{routeData.eta}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border">
                <Car className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Distance
                  </p>
                  <p className="font-bold text-foreground">{routeData.distance}</p>
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
    </>
  );
}
