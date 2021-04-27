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
import {XYZ} from 'ol/source';


export default {

  name: "map-component",
  props: ["long", "lang"],
  data() {
    return {
      map: null,
      marker: null,
      emit: true,
    }
  },

  methods: {

    handleNewLoc(long, lang) {
      this.emit = false;
      this.setMarkerLoc(long, lang);
    },

    initMap() {

      const startLon = this.long;
      const startLan = this.lang;
      this.marker = new Point(fromLonLat([startLon, startLan]));


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

      const satellite = new TileLayer({
        source: new XYZ({
          attributions: ['Powered by Esri',
            'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'],
          attributionsCollapsible: false,
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        })
      })


      this.map = new Map({
        // the map will be created using the 'mapRoot' ref
        target: this.$refs['mapRoot'],
        layers: [
          tileLayer,
          satellite,
          vectorLayer,
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


      modify.on(['modifystart', 'modifyend'], (evt) => {
        target.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
        const coords = transform([this.marker.getFlatCoordinates()[0], this.marker.getFlatCoordinates()[1]], 'EPSG:3857', 'EPSG:4326');
        if (this.emit)
          this.$emit("markerMove", coords);
        this.emit = true;

      });

      const overlaySource = modify.getOverlay().getSource();
      overlaySource.on(['addfeature', 'removefeature'], (evt) => {
        target.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
      });

      this.map.addInteraction(modify);
    },


    setMarkerLoc(lon, lat) {
      this.marker.setCoordinates(fromLonLat([lon, lat]))
    }


  },

  mounted() {
    this.initMap();
    const coords = transform([this.marker.getFlatCoordinates()[0], this.marker.getFlatCoordinates()[1]], 'EPSG:3857', 'EPSG:4326');
    if (this.emit)
      this.$emit("markerMove", coords);
    this.emit = true;

  },

  watch: {
    long() {
      this.handleNewLoc(this.long, this.lang);
    },
    lang() {
      this.handleNewLoc(this.long, this.lang);
    }
  }


}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}

</style>