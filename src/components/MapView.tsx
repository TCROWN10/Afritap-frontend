import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from './ui/button';
import { MapPin, List } from 'lucide-react';
import { Input } from './ui/input';

// Sample coordinates for vendors (would come from real data in production)
const VENDOR_LOCATIONS = [
  { id: 1, name: "Sarah's Market Stall", coordinates: [3.3792, 6.5244], rating: 4.8 }, // Lagos
  { id: 2, name: "TechNow Solutions", coordinates: [36.8219, -1.2921], rating: 4.5 }, // Nairobi
  { id: 3, name: "Adamu's Textiles", coordinates: [8.5167, 12.0000], rating: 4.9 }, // Kano
  { id: 4, name: "MediQuick Pharmacy", coordinates: [-0.1870, 5.6037], rating: 4.7 }, // Accra
  { id: 5, name: "Solar Solutions", coordinates: [32.5825, 0.3476], rating: 4.6 }, // Kampala
];
    // Default Mapbox token
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoidGNyb3duMTAiLCJhIjoiY21hZTFtbmlsMDJoODJqc2N0NDhzeG5kaCJ9.9MNhyHrNYavyPoduPKy2LQ';

interface MapViewProps {
  isActive: boolean;
  onToggleView: () => void;
}

const MapView: React.FC<MapViewProps> = ({ isActive, onToggleView }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const isMobile = useIsMobile();
  
  // Always use the default token unless overridden from localStorage
  const [mapboxToken, setMapboxToken] = useState<string>(DEFAULT_MAPBOX_TOKEN);
  const [tokenInput, setTokenInput] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);

  const handleSetToken = () => {
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput);
      setShowTokenInput(false);
      localStorage.setItem('mapbox_token', tokenInput);
    }
  };

  useEffect(() => {
    // Check if we have a custom token in localStorage
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
    // We no longer set showTokenInput to true by default
  }, []);


  useEffect(() => {
    if (!isActive || !mapContainer.current || !mapboxToken) return;

    // Initialize map only if it doesn't exist yet
    if (!map.current) {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [20, 5], // Centered on Africa
        zoom: 2,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Wait for map to load before adding markers
      map.current.on('load', () => {
        setMapReady(true);
      });
    }

    return () => {
      // Clean up markers when component unmounts
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
    };
  }, [isActive, mapboxToken]);

  // Add markers when map is ready
  useEffect(() => {
    if (!map.current || !mapReady) return;
    
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    // Add markers for each vendor
    VENDOR_LOCATIONS.forEach(vendor => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<strong>${vendor.name}</strong><br>Rating: ${vendor.rating}⭐`
      );

      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.backgroundColor = '#2E7D32';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';

      // Create marker and add to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat(vendor.coordinates as [number, number])
        .setPopup(popup)
        .addTo(map.current);
      
      markers.current.push(marker);
    });
  }, [mapReady]);

  // Handle responsive layout
  useEffect(() => {
    if (map.current) {
      map.current.resize();
    }
  }, [isActive, isMobile]);

  if (!isActive) return null;

  return (
    <div className="w-full relative animate-fade-in">
      <div 
        ref={mapContainer} 
        className={`w-full ${isMobile ? 'h-[400px]' : 'h-[600px]'} rounded-lg shadow-lg`}
      />
      <Button 
        onClick={onToggleView} 
        className="absolute top-4 left-4 bg-white text-gray-800 hover:bg-gray-200 shadow-lg"
        size="sm"
      >
        <List className="h-4 w-4 mr-2" />
        List View
      </Button>
      {showTokenInput && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-bold mb-2">Mapbox Token Required</h3>
            <p className="mb-4">
            Enter a custom Mapbox token if you want to use your own instead of the default one.            </p>
            <div className="space-y-4">
              <Input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Enter your Mapbox public token"
                className="w-full"
              />
              <Button 
                onClick={handleSetToken}
                className="w-full bg-[#2E7D32] hover:bg-green-700"
              >
                Save Token
              </Button>
              <p className="text-xs text-gray-500">
                This will be saved in your browser's local storage for convenience.
              </p>
            </div>
          </div>
        </div>
      )}
      <Button 
        onClick={() => setShowTokenInput(true)}
        className="absolute top-4 right-16 bg-white text-gray-800 hover:bg-gray-200 shadow-lg"
        size="sm"
      >
        Change API Key
      </Button>
    </div>
  );
};

export default MapView;