import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo, useState } from 'react';
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl';
import './App.css';
import Pin from './Pin';
import PLACES from './places.json';

/*
TODO
- Hoe graag naar toe
- Route bepalen
- In de buurt
- Lijstweergave
*/

function App() {
    const [popupInfo, setPopupInfo] = useState(null);

    const pins = useMemo(
        () =>
            PLACES.map((city, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}
                    anchor="bottom"
                    onClick={e => {
                        // If we let the click event propagates to the map, it will immediately close the popup
                        // with `closeOnClick: true`
                        e.originalEvent.stopPropagation();
                        setPopupInfo(city);
                    }}>
                    <Pin />
                </Marker>
            )),
        []
    );

    return (
        <Map
            initialViewState={{
                latitude: 55.60632486667883,
                longitude: 9.90469321175798,
                zoom: 6.5,
                bearing: 0,
                pitch: 0,
            }}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            style={{ width: '100vw', height: '100vh' }}>
            <GeolocateControl position="top-left" />
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
            <ScaleControl />

            {pins}

            {popupInfo && (
                <Popup
                    anchor="top"
                    longitude={Number(popupInfo.longitude)}
                    latitude={Number(popupInfo.latitude)}
                    onClose={() => setPopupInfo(null)}>
                    <div>
                        <h2>{popupInfo.title}</h2>
                        <p>{popupInfo.description}</p>
                    </div>
                </Popup>
            )}
        </Map>
    );
}

export default App;
