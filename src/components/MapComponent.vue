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
import {defaults} from 'ol/control'



export default {

  name: "map-component",
  props: ["long", "lati"],
  data() {
    return {
      map: null,
      marker: null,
      emit: false,
      lightMap: null,
      darkMap: null,
      activeMap: null,
    }
  },

  methods: {

    handleNewLoc(long, lati) {
      this.emit = false;
      this.setMarkerLoc(long, lati);
    },

    initMap() {
      const startLon = this.long;
      const startLan = this.lati;
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
          radius: 7,
          fill: new Fill({color: 'red'}),
          stroke: new Stroke({
            color: 'black',
            width: 3,
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



      this.lightMap = new TileLayer({
        source: new XYZ({
          attributionsCollapsible: false,
          url: 'https://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
        })
      })



      this.darkMap = new TileLayer({
        source: new XYZ({
          attributionsCollapsible: true,
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        })
      })


      this.map = new Map({
            target: this.$refs['mapRoot'],
            controls: defaults({attribution: false}),
            layers: [
              tileLayer,
              this.darkMap,
              this.lightMap,
              vectorLayer,
            ],

            // the map view will initially show the whole world
            view: new View({
              zoom: 5,
              maxZoom: 12,
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
    },

    updateTheme() {
      const theme = document.getElementsByTagName("html")[0].attributes[
          "theme"
          ].value;

      if (theme === 'light') {
        this.lightMap.setVisible(true);
        this.darkMap.setVisible(false);
      }
      if (theme === 'dark') {
        this.lightMap.setVisible(false);
        this.darkMap.setVisible(true);
      }
    }


  },

  mounted() {
    this.initMap();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          this.updateTheme();
        }
      });
    });
    observer.observe(document.getElementsByTagName("html")[0], {
      attributes: true,
    });
  },

  watch: {
    long() {
      this.handleNewLoc(this.long, this.lati);
    },
    lati() {
      this.handleNewLoc(this.long, this.lati);
    }
  }


}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
  padding-top: 2em;
}

::v-deep canvas {
  border-radius: 2em;
}

</style>