import { useState, type FC } from "react";
import { Button } from "../../../components/ui/button";
import { AlertCircle, Info, MapPin, MapPinOff, Locate } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface Location {
  lat: number;
  lng: number;
  accuracy?: number;
}

interface RadiusOption {
  value: number;
  label: string;
  icon?: string;
}

interface LocationControlsProps {
  onLocationDetect?: (location: Location) => void;
  onRadiusChange?: (radius: number) => void;
  currentRadius?: number;
  isDetectingLocation?: boolean;
  currentLocation?: Location | null;
}

type LocationStatus = "idle" | "detecting" | "success" | "error";

const LocationControls: FC<LocationControlsProps> = ({
  onLocationDetect,
  onRadiusChange,
  currentRadius = 5,
  isDetectingLocation = false,
  currentLocation = null,
}) => {
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [locationError, setLocationError] = useState<string>("");

  const radiusOptions: RadiusOption[] = [
    { value: 1, label: "1 km radius" },
    { value: 5, label: "5 km radius" },
    { value: 10, label: "10 km radius" },
    { value: 25, label: "25 km radius" },
  ];

  const handleLocationDetect = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser");
      setLocationStatus("error");
      return;
    }

    setLocationStatus("detecting");
    setLocationError("");

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const location: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        setLocationStatus("success");
        if (onLocationDetect) {
          onLocationDetect(location);
        }
      },
      (error: GeolocationPositionError) => {
        let errorMessage = "Unable to detect location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          default:
            errorMessage = "An unknown error occurred";
            break;
        }
        setLocationError(errorMessage);
        setLocationStatus("error");
      },
      options
    );
  };

  const handleRadiusChange = (value: string) => {
    const numValue = parseInt(value, 10);
    if (onRadiusChange && !isNaN(numValue)) {
      onRadiusChange(numValue);
    }
  };

  const getButtonContent = () => {
    if (locationStatus === "detecting" || isDetectingLocation) {
      return {
        icon: <Locate className="mr-2 h-4 w-4 animate-pulse" />,
        text: "Detecting...",
        variant: "outline" as const,
      };
    }
    if (locationStatus === "success") {
      return {
        icon: <MapPin className="mr-2 h-4 w-4" />,
        text: "Location Found",
        variant: "default" as const,
      };
    }
    if (locationStatus === "error") {
      return {
        icon: <MapPinOff className="mr-2 h-4 w-4" />,
        text: "Try Again",
        variant: "destructive" as const,
      };
    }
    return {
      icon: <Locate className="mr-2 h-4 w-4" />,
      text: "Use My Location",
      variant: "outline" as const,
    };
  };

  const buttonContent = getButtonContent();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Location Detection */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <Button
              variant={buttonContent.variant}
              size="default"
              onClick={handleLocationDetect}
              disabled={locationStatus === "detecting" || isDetectingLocation}
              className={
                locationStatus === "success"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : ""
              }
            >
              {buttonContent.icon}
              {buttonContent.text}
            </Button>

            {currentLocation && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <MapPin size={16} className="text-green-500" />
                <span>
                  {currentLocation.lat.toFixed(4)},{" "}
                  {currentLocation.lng.toFixed(4)}
                </span>
              </div>
            )}
          </div>

          {locationError && (
            <div className="mt-2 flex items-center space-x-2 text-sm text-red-600">
              <AlertCircle size={16} />
              <span>{locationError}</span>
            </div>
          )}

          {currentLocation && (
            <div className="mt-2 sm:hidden flex items-center space-x-2 text-sm text-gray-600">
              <MapPin size={16} className="text-green-500" />
              <span>
                Location: {currentLocation.lat.toFixed(4)},{" "}
                {currentLocation.lng.toFixed(4)}
              </span>
            </div>
          )}
        </div>

        {/* Radius Selection */}
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Search Radius
            </label>
            <Select
              value={currentRadius.toString()}
              onValueChange={handleRadiusChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select radius" />
              </SelectTrigger>
              <SelectContent>
                {radiusOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Location Tips */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900 mb-1">Location Tips:</p>
            <ul className="space-y-1">
              <li>
                • Enable location services for accurate nearby pharmacy results
              </li>
              <li>
                • Larger radius shows more pharmacies but may include distant
                options
              </li>
              <li>
                • Your location is only used to find nearby pharmacies and is
                not stored
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationControls;
