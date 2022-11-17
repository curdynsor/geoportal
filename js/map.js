// initialize map
var map = L.map('map').setView([4.976, 8.297], 7);

//add osm tile layer to map
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


//adding google street base map
var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
 

//adding google hybrid base map
var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


// adding satellite base map
var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
//.addTo(map)


//adding terrain base map
var googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


//adding marker
var marker = L.marker([4.976, 8.297])
//.addTo(map)



//add geoJson layers style


//region layer style
var regionStyle = {
color: "red",
opacity: 0.3,
weight: 1,

}

//healthfacility layer style
var healthfacilityStyle = {
    radius: 8,
    fillColor: "green",
    color: "red",
    weight: 1 
}  

//add geoJson Layers


var regionLayer = L.geoJson(region,{
    style:regionStyle,
    onEachFeature:function (feature, layer) {


        area = (turf.area(feature)/1000000).toFixed(3)
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)

        label= `Name: ${feature.properties.region}<br>`
        label+= `Area: ${area}<br>`
         label+= `Center:Lng : ${center_lng}, Lat: ${center_lat}<br>`


        layer.bindPopup(label)
    }


}).addTo(map)

var healthsiteLayer = L.geoJson(healthfacility,{
    pointToLayer:function(feature, latlng) {
    return L.circleMarker(latlng,healthfacilityStyle);
}

})
//.addTo(map)


var railwayLayer = L.geoJson(railway)
//.addTo(map)


//ADDING WMS LAYERS
var riverWMS = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:rivers',
    format: 'image/png',
    transparent: true,
    attribution: ""
})
//.addTo(map)



//adding basemaps
var baseLayers = {
    "OpenStreetMap": osm,
    "Google Street Map": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Satellite": googleSat,
    "Google Terrain": googleTerrain


};


//layers
var overlays = {
    "Region": regionLayer,
    "Marker": marker,
    "Rivers": riverWMS,
    "Health Sites": healthsiteLayer,
    "Railway Line": railwayLayer
        //"Roads": roadsLayer
};


//add layer control to map
L.control.layers(baseLayers, overlays,{collapsed:false}).addTo(map);


// add leaflet browser print control to map
L.control.browserPrint({position: 'topleft'}).addTo(map);



	// coordinates on mousemove

map.on("mousemove", function(e){

	$("#coordinates").html(`Lat:${e.latlng.lat.toFixed(3)}, Lng : ${e.latlng.lng.toFixed(3)}`)

})  




//adding scale to map
L.control.scale().addTo(map);