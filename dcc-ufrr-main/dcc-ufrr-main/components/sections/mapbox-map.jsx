import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

function MapboxMap() {
  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState();

  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: "mapbox://styles/acauanrr/cleopghxl003q01mr5wsqpqpy",
      center: [-60.692915, 2.835566],
      zoom: 16,
    });

    const el = document.createElement("div");
    el.className = "marker";
    const width = 120;
    const height = 50;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.color = "red";
    el.style.zIndex = 100;
    el.style.fontWeight = "bold";
    el.style.webkitTextStrokeWidth = "0.5px";
    el.style.webkitTextStrokeColor = "#ccc";
    el.textContent = "DCC - Coordenação";

    const el2 = document.createElement("div");
    el2.className = "marker";
    const width2 = 140;
    const height2 = 50;
    el2.style.width = `${width2}px`;
    el2.style.height = `${height2}px`;
    el2.style.color = "red";
    el2.style.zIndex = 100;
    el2.style.fontWeight = "bold";
    el2.style.webkitTextStrokeWidth = "0.5px";
    el2.style.webkitTextStrokeColor = "#ccc";
    el2.textContent = "DCC - Laboratórios";

    const el3 = document.createElement("div");
    el3.className = "marker";
    const width3 = 150;
    const height3 = 50;
    el3.style.width = `${width3}px`;
    el3.style.height = `${height3}px`;
    el3.style.color = "red";
    el3.style.zIndex = 100;
    el3.style.fontWeight = "bold";
    el3.style.webkitTextStrokeWidth = "0.5px";
    el3.style.webkitTextStrokeColor = "#ccc";
    el3.textContent = "DCC - Sala Professores";

    new mapboxgl.Marker(el).setLngLat([-60.6939, 2.83545]).addTo(mapboxMap);
    new mapboxgl.Marker({ color: "red", zIndex: -10 })
      .setLngLat([-60.694107, 2.835164])
      .addTo(mapboxMap);

    new mapboxgl.Marker(el2)
      .setLngLat([-60.6947331, 2.835885])
      .addTo(mapboxMap);
    new mapboxgl.Marker({ color: "red", zIndex: -10 })
      .setLngLat([-60.6947332766919, 2.8356012703181146])
      .addTo(mapboxMap);

    new mapboxgl.Marker(el3).setLngLat([-60.691378, 2.83625]).addTo(mapboxMap);
    new mapboxgl.Marker({ color: "red", zIndex: -10 })
      .setLngLat([-60.691378, 2.836519])
      .addTo(mapboxMap);

    // save the map object to React.useState
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap;
