import { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet-control-geocoder';

export default function LocationMap({defaultPosition, positionChanged}) {

    let subjectLocation = {lat: 54.9, lng: 23.9};

    const [ markerPosition, setMarkerPosition ] = useState(defaultPosition || {lat: 0, lng: 0});

    useEffect(() => {
        if (positionChanged) positionChanged(markerPosition);
    }, [markerPosition]);

    const mapRef = useRef();

    function initMap() {
      console.log(mapRef)
      if (mapRef.current) mapRef.current.invalidateSize();
    }

    useEffect(() => {
      let interval = null;
      if (mapRef.current) {
        interval = setInterval(() => {
          mapRef.current.invalidateSize();
        }, 1000);
      }

      return () => {
        if (interval) clearInterval(interval);
      }
    }, [mapRef.current]);

    return <MapContainer center={defaultPosition} zoom={12} scrollWheelZoom={true} whenReady={initMap} ref={mapRef}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeocoderControl />
        <DraggableMarker position={markerPosition} setPosition={(positionChanged) ? setMarkerPosition : () => {}}/>
    </MapContainer>
}

function GeocoderControl() {
    const map = useMap();
    useEffect(() => {
      L.Control.geocoder({
        geocoder: L.Control.Geocoder.nominatim(),
        defaultMarkGeocode: false
      })
      .on('markgeocode', function(e) {
        //var position = e.geocode.center;
        var bbox = e.geocode.bbox;
        var poly = L.polygon([
          bbox.getSouthEast(),
          bbox.getNorthEast(),
          bbox.getNorthWest(),
          bbox.getSouthWest()
        ]);
        map.flyToBounds(poly.getBounds());
      })
      .addTo(map);
    }, [])
    return null;
  }
  
  function DraggableMarker({position, setPosition}) {

    const map = useMapEvents({
        dblclick(e) {
            setPosition(e.latlng);
        }
    });
    const markerRef = useRef(null);
    
  
    return (
      <Marker
        draggable={false}
        position={position}
        ref={markerRef}>
          <Popup>
            {position.lat.toFixed(4)};
            {position.lng.toFixed(4)}
          </Popup>
      </Marker>
    )
  }