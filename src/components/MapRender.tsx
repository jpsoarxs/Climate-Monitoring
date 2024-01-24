import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { MaterialSymbol } from "react-material-symbols";
import { useSettings } from "../context/SettingsContext";
import { Weather, getWeatherByCords } from "../services/weather";
import MetricToImperial from "../utils/metricToImperial";

interface Props {
  mapCenter: any;
  setMapCenter: React.Dispatch<any>;
  weatherData: any;
  weatherStep: number;
}

export default function MapRender(props: Props): JSX.Element {
  const { settings } = useSettings();

  const [activeTile, setActiveTile] = useState("");
  const [weatherInfo, setWeatherInfo] = useState<Weather | null>(null);
  const [marker, setMarker] = useState<any | null>(null);
  const [markerInfo, setMarkerInfo] = useState<Weather | null>(null);

  const getWeatherInfo = async () => {
    const result = await getWeatherByCords(
      props.mapCenter.lat,
      props.mapCenter.lng
    );
    setWeatherInfo(result);
  };

  useEffect(() => {
    getWeatherInfo();
  }, [props.mapCenter]);

  useEffect(() => {
    if (props.weatherData !== null) {
      const newTile = `${props.weatherData.host}${
        props.weatherData.radar.past[props.weatherStep].path
      }/512/{z}/{x}/{y}/6/1_0.png`;
      setActiveTile(newTile);
    }
  }, [props.weatherData, props.weatherStep]);

  function MapClickHandler({
    setMarker,
  }: {
    setMarker: React.Dispatch<any>;
    setWeatherInfo: React.Dispatch<any>;
  }) {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        const weather = await getWeatherByCords(lat, lng);
        setMarkerInfo(weather);
      },
    });
    return null;
  }

  return (
    <>
      {(props?.mapCenter?.lat && props?.mapCenter?.lng && (
        <>
          <button
            className="flex gap-2 items-center mb-5"
            onClick={() => {
              setMarker(null);
              setMarkerInfo(null);
            }}
          >
            <MaterialSymbol
              size={32}
              className="text-gray-700 dark:text-white"
              icon="delete"
            />
            <span className="text-gray-700 dark:text-white">Clear Marker</span>
          </button>
          <MapContainer
            center={{ lat: props.mapCenter.lat, lng: props.mapCenter.lng }}
            style={{ height: "100%", width: "100%" }}
            zoom={5}
          >
            <MapClickHandler
              setMarker={setMarker}
              setWeatherInfo={setWeatherInfo}
            />
            <TileLayer
              className="basemap"
              maxNativeZoom={19}
              maxZoom={19}
              subdomains={["clarity"]}
              url="https://{s}.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

            <Marker
              position={[props.mapCenter.lat, props.mapCenter.lng]}
              draggable={false}
              eventHandlers={{
                dragend: (e) => {
                  props.setMapCenter(e.target.getLatLng());
                },
              }}
            >
              <Popup>
                <div>
                  <h1 className="text-md font-bold text-gray-700">
                    {weatherInfo?.name}
                  </h1>

                  <div className="flex flex-row gap-5">
                    <span className="text-gray-500">
                      Lat: {Number(props.mapCenter.lat).toFixed(4)}
                    </span>
                    <span className="text-gray-500">
                      Lng: {Number(props.mapCenter.lng).toFixed(4)}
                    </span>
                  </div>

                  <hr className="my-2" />

                  <div className="flex flex-col">
                    <span className="text-gray-500">
                      Temperature:{" "}
                      {MetricToImperial(
                        settings.measure,
                        weatherInfo?.temperature || 0
                      )}
                    </span>
                    <span className="text-gray-500">
                      Real Feel:{" "}
                      {MetricToImperial(
                        settings.measure,
                        weatherInfo?.feels_like || 0
                      )}
                    </span>
                    <span className="text-gray-500">
                      Wind: {weatherInfo?.wind} km/h
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>

            {marker && (
              <Marker
                position={marker}
                draggable={false}
                eventHandlers={{
                  dragend: (e) => {
                    props.setMapCenter(e.target.getLatLng());
                  },
                }}
              >
                <Popup>
                  <div>
                    <h1 className="text-md font-bold text-gray-700">
                      {markerInfo?.name}
                    </h1>

                    <div className="flex flex-row gap-5">
                      <span className="text-gray-500">
                        Lat: {Number(marker[0]).toFixed(4)}
                      </span>
                      <span className="text-gray-500">
                        Lng: {Number(marker[1]).toFixed(4)}
                      </span>
                    </div>

                    <hr className="my-2" />

                    <div className="flex flex-col">
                      <span className="text-gray-500">
                        Temperature:{" "}
                        {MetricToImperial(
                          settings.measure,
                          markerInfo?.temperature || 0
                        )}
                      </span>
                      <span className="text-gray-500">
                        Real Feel:{" "}
                        {MetricToImperial(
                          settings.measure,
                          markerInfo?.feels_like || 0
                        )}
                      </span>
                      <span className="text-gray-500">
                        Wind: {markerInfo?.wind} km/h
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}

            {activeTile && (
              <TileLayer
                key={`weather-data-${activeTile}`}
                className="weather-tile"
                url={activeTile}
                updateWhenIdle={true}
                updateWhenZooming={false}
              />
            )}
          </MapContainer>
        </>
      )) || (
        <div
          role="status"
          className="flex items-center justify-center h-[80vh] w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
        >
          <MaterialSymbol
            size={64}
            className="text-gray-200 dark:text-gray-600"
            icon="map"
          />
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
}
