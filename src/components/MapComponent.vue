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



export default {

  name: "map-component",

  methods: {

    map() {

      //https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html
      const point = new Point (fromLonLat([26.7388686, 58.365231]));

      console.log(point.getCoordinates());
      const tileLayer = new TileLayer({
        source: new OSM() // tiles are served by OpenStreetMap
      })


      const iconFeature = new Feature({
        geometry: point,
        name: 'name',
      });

      const iconStyle = new Style({
        image: new Circle({
          radius: 7,
          fill: new Fill({color: 'black'}),
          stroke: new Stroke({
            color: 'white',
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


      const map = new Map({
        // the map will be created using the 'map-root' ref
        target: this.$refs['mapRoot'],
        layers: [
            tileLayer,
            vectorLayer
        ],

        // the map view will initially show the whole world
        view: new View({
          zoom: 0,
          center: this.setCenter(26.7388686, 58.3652315),
          constrainResolution: true,
        }),
      })

      const target = this.$refs['mapRoot'];


      const modify = new Modify({
        hitDetection: vectorLayer,
        source: vectorSource,
      });
      modify.on(['modifystart', 'modifyend'], function (evt) {
        target.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
      });

      const overlaySource = modify.getOverlay().getSource();
      overlaySource.on(['addfeature', 'removefeature'], function (evt){
        target.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
      });

      map.addInteraction(modify);

    },

    setCenter(long, lat) {
      return fromLonLat([long, lat])
    }
  },

  mounted() {
    this.map()
  }


}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%
}
</style>