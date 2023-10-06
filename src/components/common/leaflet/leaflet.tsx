import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  useMapEvents,
  MapContainer,
  TileLayer,
  LayersControl,
  WMSTileLayer,
  ScaleControl,
  FeatureGroup,
  useMap,
} from "react-leaflet";
import { LeafletMouseEventHandlerFn, latLngBounds } from "leaflet";
import LocateControl from "./locatecontrol";
import FullscreenControl from "./fullscreencontrol";
import Markers, { MarkerDef } from "./markers";
import Polygons from "./polygons";
import Polylines from "./polylines";
import MarkerClusterGroup from "./react-leaflet-markercluster";
import { Segment, Checkbox } from "semantic-ui-react";
import UseControl from "../../../utils/use-leaflet-control";
import GetCenterFromDegrees from "../../../utils/map-utils";
import { components } from "../../../@types/buldreinfo/swagger";

function MapEvent({
  onMouseClick,
  onMouseMove,
}: {
  onMouseClick?: LeafletMouseEventHandlerFn;
  onMouseMove?: LeafletMouseEventHandlerFn;
}) {
  useMapEvents({
    click: (e) => {
      if (onMouseClick) {
        onMouseClick(e);
      }
    },
    mousemove: (e) => {
      if (onMouseMove) {
        onMouseMove(e);
      }
    },
  });
  return null;
}

type Props = {
  autoZoom?: boolean;
  clusterMarkers?: boolean;
  defaultCenter: { lat: number; lng: number };
  defaultZoom: number;
  flyToId?: number | null;
  height?: number | string;
  markers?: MarkerDef[];
  onMouseClick?: LeafletMouseEventHandlerFn;
  onMouseMove?: LeafletMouseEventHandlerFn;
  outlines?: {
    background?: boolean;
    outline: components["schemas"]["Coordinates"][];
    url?: string;
    label?: string;
  }[];
  approaches?: {
    background?: boolean;
    label?: string;
    approach: components["schemas"]["Approach"];
  }[];
  rocks?: string[];
  showSatelliteImage?: boolean;
  children?: React.ReactNode | React.ReactNode[];
};

const UpdateBounds = ({
  autoZoom,
  markers,
  outlines,
  approaches,
}: Pick<Props, "autoZoom" | "markers" | "outlines" | "approaches">) => {
  const map = useMap();

  if (!autoZoom) {
    return null;
  }

  const bounds = latLngBounds([]);
  markers
    ?.filter(
      ({ coordinates }) =>
        coordinates.latitude > 0 && coordinates.longitude > 0,
    )
    ?.forEach(({ coordinates }) =>
      bounds.extend([coordinates.latitude, coordinates.longitude]),
    );
  outlines
    ?.filter(({ outline }) => !!outline)
    ?.forEach(({ outline }) =>
      outline.forEach((c) =>
        bounds.extend({ lat: c.latitude, lng: c.longitude }),
      ),
    );
  approaches
    ?.filter(({ approach }) => !!approach)
    ?.forEach(({ approach }) =>
      approach.coordinates.forEach((c) =>
        bounds.extend({ lat: c.latitude, lng: c.longitude }),
      ),
    );

  if (
    bounds.isValid() &&
    bounds.getWest() !== bounds.getEast() &&
    bounds.getNorth() !== bounds.getSouth()
  ) {
    map.fitBounds(bounds);
  }

  return null;
};

const Leaflet = ({
  autoZoom,
  clusterMarkers,
  defaultCenter,
  defaultZoom,
  flyToId,
  height,
  markers,
  onMouseClick,
  onMouseMove,
  outlines,
  approaches,
  rocks = [],
  showSatelliteImage,
  children,
}: Props) => {
  const [groupByRock, setGroupByRock] = useState(!!rocks?.length);
  const [showElevation, setShowElevation] = useState(false);

  const opacity = 0.6;
  const addEventHandlers = !onMouseClick && !onMouseMove;
  let markerGroup;
  if (groupByRock) {
    const rockMarkers: MarkerDef[] = rocks
      .map((r) => {
        const markersOnRock = markers.filter(
          (m) => "rock" in m && m.rock === r,
        );
        const coords = markersOnRock
          .filter(
            ({ coordinates }) =>
              coordinates.latitude > 0 && coordinates.longitude > 0,
          )
          .map(({ coordinates }) => [
            coordinates.latitude,
            coordinates.longitude,
          ]);
        if (coords && coords.length > 0) {
          const centerCoordinates = GetCenterFromDegrees(coords);
          const html = (
            <>
              <b>{r}:</b>
              <br />
              {markersOnRock
                .filter((m) => "url" in m)
                .map((m: MarkerDef & { url: string }) => (
                  <React.Fragment key={m.url}>
                    <a rel="noreferrer noopener" target="_blank" href={m.url}>
                      {m.label}
                    </a>
                    <br />
                  </React.Fragment>
                ))}
            </>
          );
          return {
            coordinates: {
              latitude: centerCoordinates[0],
              longitude: centerCoordinates[1],
            },
            label: r,
            rock: true,
            html,
          };
        }
      })
      .filter((item) => item); // Remove undefined
    const markersWithoutRock = markers.filter((m) => !("rock" in m) || !m.rock);
    markerGroup = (
      <Markers
        opacity={opacity}
        markers={[...rockMarkers, ...markersWithoutRock]}
        addEventHandlers={addEventHandlers}
        flyToId={flyToId}
        showElevation={showElevation}
      />
    );
  } else {
    markerGroup = (
      <Markers
        opacity={opacity}
        markers={markers}
        addEventHandlers={addEventHandlers}
        flyToId={flyToId}
        showElevation={showElevation}
      />
    );
    if (clusterMarkers) {
      markerGroup = <MarkerClusterGroup>{markerGroup}</MarkerClusterGroup>;
    }
  }

  return (
    <MapContainer
      style={{ height: height ? height : "500px", width: "100%", zIndex: 0 }}
      zoomControl={true}
      zoom={defaultZoom}
      center={defaultCenter}
      maxZoom={21}
    >
      <UpdateBounds
        approaches={approaches}
        outlines={outlines}
        autoZoom={autoZoom}
        markers={markers}
      />
      <MapEvent onMouseClick={onMouseClick} onMouseMove={onMouseMove} />
      <FullscreenControl />
      <LocateControl />
      <ScaleControl maxWidth={100} metric={true} imperial={false} />
      <UseControl position="bottomleft">
        {rocks != null && rocks.length > 0 && (
          <Checkbox
            as={Segment}
            size="mini"
            label={<label>Group by rock</label>}
            toggle
            checked={groupByRock}
            onChange={(e, d) => {
              setGroupByRock(d.checked);
            }}
          />
        )}
      </UseControl>
      {(outlines?.length > 0 || markers?.length > 0) && (
        <UseControl position="bottomright">
          <Checkbox
            as={Segment}
            size="mini"
            label={<label>Elevation</label>}
            toggle
            checked={showElevation}
            onChange={(e, d) => {
              setShowElevation(d.checked);
            }}
          />
        </UseControl>
      )}
      <LayersControl>
        <LayersControl.BaseLayer
          checked={showSatelliteImage}
          name="Arcgis Online - World Imagery"
        >
          <TileLayer
            maxZoom={21}
            attribution='Esri, Maxar, Earthstar Geographics, and the GIS User Community'
            url="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer
            maxZoom={19}
            attribution='<a href="https://openstreetmap.org/copyright" rel="noreferrer noopener" target="_blank">OpenStreetMap contributors</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked={true} name="Vegnett">
          <WMSTileLayer
            params={{
              transparent: true,
              format: "image/png",
              layers: "all",
              version: "1.3.0",
            }}
            url="https://openwms.statkart.no/skwms1/wms.vegnett"
          />
        </LayersControl.Overlay>
      </LayersControl>
      <FeatureGroup>
        {markerGroup}
        <Polygons
          opacity={opacity}
          outlines={outlines}
          addEventHandlers={addEventHandlers}
          showElevation={showElevation}
        />
        <Polylines opacity={opacity} approaches={approaches} />
      </FeatureGroup>
      {children}
    </MapContainer>
  );
};

export default Leaflet;
