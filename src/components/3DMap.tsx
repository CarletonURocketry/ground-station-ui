import { useEffect, useRef, useState } from "react";
import maplibregl, { LngLatLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function DMap() {
  const mapContainer = useRef(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [lng] = useState(-74.5);
  const [lat] = useState(40);
  const [zoom] = useState(-1);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Initialize map only once and ensure container is not null

    map.current = new maplibregl.Map({
      container: mapContainer.current as HTMLElement,
      style: {
        version: 8,
        sources: {
          background: {
            type: "raster",
            tiles: ["http://localhost:8000/mapping_tiles/{z}/{x}/{y}.png"],
            tileSize: 256,
            minzoom: 0,
            maxzoom: 20,
          },
          terrainSource: {
            type: "raster-dem",
            tiles: ["http://localhost:8000/elevation_tiles/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "background-layer",
            type: "raster",
            source: "background",
            minzoom: 0,
            maxzoom: 20,
          },
        ],
        terrain: {
          source: "terrainSource",
          exaggeration: 1.5,
        },
      },
      center: [lng, lat],
      zoom: -2,
    });

    // parameters to ensure the model is georeferenced correctly on the map
    const modelOrigin: LngLatLike = [-81.8485, 47.9868];
    const modelAltitude: number = 0;
    const modelRotate: number[] = [Math.PI / 2, 0, 0];

    const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
    );

    // transformation parameters to position, rotate and scale the 3D model onto the map
    const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* Since our 3D model is in real world meters, a scale transform needs to be
        * applied since the CustomLayerInterface expects units in MercatorCoordinates.
        */
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    };

    const customLayer: any = {
      id: '3d-model',
      type: 'custom',
      renderingMode: '3d',
      scene: undefined,
      camera: undefined,
      renderer: undefined,
      map: undefined,
      onAdd (map: { getCanvas: () => any; }, gl: any) {
          this.camera = new THREE.Camera();
          this.scene = new THREE.Scene();

          // create two three.js lights to illuminate the model
          const directionalLight = new THREE.DirectionalLight(0xffffff);
          directionalLight.position.set(0, -70, 100).normalize();
          this.scene.add(directionalLight);

          const directionalLight2 = new THREE.DirectionalLight(0xffffff);
          directionalLight2.position.set(0, 70, 100).normalize();
          this.scene.add(directionalLight2);

          // use the three.js GLTF loader to add the 3D model to the three.js scene
          const loader = new GLTFLoader();
          loader.load(
              'http://localhost:8000/CR25H.gltf',
              (gltf: { scene: any; }) => {
                  this.scene.add(gltf.scene);
              }
          );
          this.map = map;

          // use the MapLibre GL JS map canvas for three.js
          this.renderer = new THREE.WebGLRenderer({
              canvas: map.getCanvas(),
              context: gl,
              antialias: true
          });

          this.renderer.autoClear = false;
      },
      render (_gl: WebGLRenderingContext, args: any) {
          const rotationX = new THREE.Matrix4().makeRotationAxis(
              new THREE.Vector3(1, 0, 0),
              modelTransform.rotateX
          );
          const rotationY = new THREE.Matrix4().makeRotationAxis(
              new THREE.Vector3(0, 1, 0),
              modelTransform.rotateY
          );
          const rotationZ = new THREE.Matrix4().makeRotationAxis(
              new THREE.Vector3(0, 0, 1),
              modelTransform.rotateZ
          );

          const m = new THREE.Matrix4().fromArray(args.defaultProjectionData.mainMatrix);
          const l = new THREE.Matrix4()
              .makeTranslation(
                  modelTransform.translateX,
                  modelTransform.translateY,
                  modelTransform.translateZ
              )
              .scale(
                  new THREE.Vector3(
                      modelTransform.scale,
                      -modelTransform.scale,
                      modelTransform.scale
                  )
              )
              .multiply(rotationX)
              .multiply(rotationY)
              .multiply(rotationZ);

          // Alternatively, you can use this API to get the correct model matrix.
          // It will work regardless of current projection.
          // Also see the example "globe-3d-model.html".
          //
          // const modelMatrix = args.getMatrixForModel(modelOrigin, modelAltitude);
          // const m = new THREE.Matrix4().fromArray(matrix);
          // const l = new THREE.Matrix4().fromArray(modelMatrix);

          this.camera.projectionMatrix = m.multiply(l);
          this.renderer.resetState();
          this.renderer.render(this.scene, this.camera);
          this.map.triggerRepaint();
      }
    }

    map.current.setMaxBounds(null);

    // Add navigation control
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add error handling
    // map.current.on("error", (e) => {
    //   console.error("MapLibre error:", e.error);
    //   setError(`Map error: ${e.error.message}`);
    // });

    // Process source info after map loads
    map.current.on("load", async () => {
      console.log("Map loaded");
      if (map.current) {
        map.current.setMinZoom(0);
        map.current.setMaxZoom(20);
        // map.current.showTileBoundaries = true;

        new maplibregl.Marker().setLngLat([-75.6959, 45.3872]).addTo(map.current);
        new maplibregl.Marker().setLngLat([-81.3305, 48.4758]).addTo(map.current);
        new maplibregl.Marker().setLngLat([-81.8485, 47.9868]).addTo(map.current);

        map.current.addLayer(customLayer)
      }
    });

    // Cleanup function
    return () => {
      if (map.current){
        map.current.remove();
        map.current = null;
      }
    };
  }, [lng, lat, zoom]);

  return (
    <div className="map-container" style={{ marginBottom: "100px" }}>
      {/* {error && <div style={{ color: "red", padding: "10px" }}>{error}</div>} */}
      <div ref={mapContainer} style={{ width: "1200px", height: "600px" }} />
    </div>
    
  );
}

export default DMap;