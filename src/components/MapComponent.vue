<template>
  <div ref="mapRoot" class="map"></div>
</template>

<script>

import 'ol/ol.css';
import View from 'ol/View'
import Map from 'ol/Map'
import {fromLonLat} from 'ol/proj';
import OSM from 'ol/source/OSM';
import {Modify} from 'ol/interaction';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Style, Circle, Fill, Stroke} from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import {transform} from 'ol/proj';


export default {

  name: "map-component",

  data() {
    return{
      map: null,
      marker: null,
    }
  },

  methods: {

    handleNewLoc(coords){
      this.setMarkerLoc(coords[0], coords[1]);
    },

    initMap() {

      const startLon = 26.7388686;
      const startLan = 58.365231;
      this.marker = new Point (fromLonLat([startLon, startLan]));


      const tileLayer = new TileLayer({
        source: new OSM() // tiles are served by OpenStreetMap
      })


      const iconFeature = new Feature({
        geometry: this.marker,
        name: 'name',
      });

      const iconStyle = new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({color: 'red'}),
          stroke: new Stroke({
            color: 'black',
            width: 2,
          }),
        }),
      });

      iconFeature.setStyle(iconStyle);


      const vectorSource = new VectorSource({
        features: [iconFeature],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });


      this.map = new Map({
        // the map will be created using the 'mapRoot' ref
        target: this.$refs['mapRoot'],
        layers: [
            tileLayer,
            vectorLayer
        ],

        // the map view will initially show the whole world
        view: new View({
          zoom: 2,
          center: fromLonLat([startLon, startLan]),
        }),
      })

      const target = this.$refs['mapRoot'];


      const modify = new Modify({
        hitDetection: vectorLayer,
        source: vectorSource,
      });


      modify.on(['modifystart', 'modifyend'],  (evt) => {
        target.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
        const coords = transform([this.marker.getFlatCoordinates()[0],this.marker.getFlatCoordinates()[1]], 'EPSG:3857', 'EPSG:4326');
        //TODO emits are bouncing off of each other
        this.$emit("markerMove", coords);
      });

      const overlaySource = modify.getOverlay().getSource();
      overlaySource.on(['addfeature', 'removefeature'],  (evt) => {
        target.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
      });

      this.map.addInteraction(modify);
      //this.setMarkerLoc(7438033.7038894165, 9140236.950249571);
      //this.setMarkerLoc(57.9120, 21.2121);
    },




    setMarkerLoc(lon, lat){
      this.marker.setCoordinates(fromLonLat([lon, lat]))
    }


  },

  mounted() {
    this.initMap();
  },


}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%
}
</style>