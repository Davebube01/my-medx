import { Info, Map, MapPin,} from "lucide-react";
import { useState, useEffect, type JSX } from "react";

// Interface for map center coordinates
interface MapCoordinates {
  lat: number;
  lng: number;
}

// Props interface
interface InteractiveMapPanelProps {
  latitude: number;
  longitude: number;
  onCoordinateChange: (latitude: number, longitude: number) => void;
  pharmacyName?: string;
}

export default function InteractiveMapPanel({ 
  latitude, 
  longitude, 
  onCoordinateChange, 
  pharmacyName = "Your Pharmacy" 
}: InteractiveMapPanelProps): JSX.Element {
  const [mapCenter, setMapCenter] = useState<MapCoordinates>({ 
    lat: latitude || 40.7128, 
    lng: longitude || -74.0060 
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isMapLoaded, _setIsMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (latitude && longitude) {
      setMapCenter({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    // Mock map click handling - in real app would use actual map library
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert click position to mock coordinates
    const newLat = mapCenter.lat + (0.5 - y / rect.height) * 0.01;
    const newLng = mapCenter.lng + (x / rect.width - 0.5) * 0.01;
    
    setMapCenter({ lat: newLat, lng: newLng });
    onCoordinateChange(newLat, newLng);
  };

  // @ts-ignore
  const handleRecenterMap = (): void => {
    if (latitude && longitude) {
      setMapCenter({ lat: latitude, lng: longitude });
    }
  };
  // @ts-ignore
  const handleZoomIn = (): void => {
    // Mock zoom functionality
    console.log('Zoom in');
  };

  // @ts-ignore
  const handleZoomOut = (): void => {
    // Mock zoom functionality
    console.log('Zoom out');
  };

  return (
    <>
    <div className="bg-white rounded-lg border border-border healthcare-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Map size={16} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Location Map</h3>
              <p className="text-sm text-text-secondary">Click to adjust pharmacy location</p>
            </div>
          </div>
          
          {/* <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
            >
              <Plus size={16} />
              <span className="sr-only">Zoom in</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
            >
              <Minus size={16} />
              <span className="sr-only">Zoom out</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRecenterMap}
            >
              <Navigation size={16} />
              <span className="sr-only">Recenter map</span>
            </Button>
          </div> */}
        </div>
      </div>

      <div className="relative">
        {/* Mock Map Container */}
        <div 
          className="w-full h-96 bg-linear-to-br from-blue-50 to-green-50 relative cursor-crosshair overflow-hidden"
          onClick={handleMapClick}
        >
          {/* Mock Google Maps Iframe */}
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={pharmacyName}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=16&output=embed`}
            className="border-0"
          />
          
          {/* Overlay for interaction */}
          <div className="absolute inset-0 bg-transparent" onClick={handleMapClick} />
          
          {/* Mock Marker */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-full z-10"
            style={{ 
              left: '50%', 
              top: '50%'
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-error rounded-full border-2 border-white healthcare-shadow-lg flex items-center justify-center">
                <MapPin size={16} color="white" />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap">
                {pharmacyName}
              </div>
            </div>
          </div>
        </div>

        {/* Coordinate Display */}
        <div className="absolute bottom-4 left-4 bg-white backdrop-blur-sm border border-border rounded-lg px-3 py-2 healthcare-shadow">
          <div className="text-xs text-text-secondary">
            <div className="font-medium text-foreground mb-1">Current Location:</div>
            <div>Lat: {mapCenter.lat.toFixed(6)}</div>
            <div>Lng: {mapCenter.lng.toFixed(6)}</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 healthcare-shadow max-w-48">
          <div className="flex items-start space-x-2">
            <Info size={14} className="text-primary mt-0.5" />
            <div className="text-xs text-text-secondary">
              <div className="font-medium text-foreground mb-1">Instructions:</div>
              <div>Click anywhere on the map to move your pharmacy marker</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            <span className="font-medium text-foreground">Accuracy:</span> High precision GPS coordinates
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <MapPin size={14} className="text-teal-600" />
            <span>Location verified</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

// Export types for reuse
export type { InteractiveMapPanelProps, MapCoordinates };