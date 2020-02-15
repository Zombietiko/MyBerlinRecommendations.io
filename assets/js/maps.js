var map, infoWindow;
var locations = [];
var markers = [];
var icons = [];
var iconBase = 'http://maps.google.com/mapfiles/kml/pal2/';

function initMap() {
    // New map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {
            lat: 52.520008,
            lng: 13.404954
        },
        minZoom: 11,
        maxZoom: 18,
        draggable: true,
        scrollwheel: true,
        animation: google.maps.Animation.Drop,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false
       
    });
icons = {
        dining: {
            icon: iconBase + 'icon34.png'
        },
        attractions: {
            icon: iconBase + 'icon13.png'
        },
        accommodation: {
            icon: iconBase + 'icon20.png'
        }
    };
    locations = [{
        position: new google.maps.LatLng(52.522964, 13.412997),
        type: 'dining',
        content: '<h5>Spagos Restaurant - Bar & Lounge</h5>', 
       image: '<p><img src="assets/images/spagnos.jpg"></p>'
}, {
        position: new google.maps.LatLng(52.514722, 13.390504),
        type: 'dining',
        content: '<h5>Ritter Sport Bunte Schokowelt Berlin</h5>',
        image: '<p><img src="assets/images/SAM_6244.JPG.png"></p>'

    }, {
        position: new google.maps.LatLng(52.511595, 13.378755),
        type: 'dining',
        content: '<h5> Charlotte & Fritz</h5>',
        image: '<p><img src= "assets/images/Char&Fritzlogo.png"></p>'
     
    }
, {
        position: new google.maps.LatLng(52.501634, 13.38211),
        type: 'accommodation',
        content: `<h5>Crowne Plaza Berlin </h5>` + `<h6><a href="https://www.crowneplaza.com/hotels/gb/en/berlin/bercp/hoteldetail?fromRedirect=true&qSrt=sBR&qIta=99603195&icdv=99603195&glat=SEAR&qSlH=BERCP&setPMCookies=true&qSHBrC=CP&qDest=Hallesche%20Str%2010,%20Berlin,%20DE&dp=true&gclid=Cj0KCQiAyp7yBRCwARIsABfQsnQVTQ_9UzeNnqacWAe0dmx4j9zJY3iN8VU_Sypr7GPJEw6JdPBhnQYaAuNSEALw_wcB&cid=41512&srb_u=1" target="_blank">What's the hotel like?</a></h6>`
          
}
];

     // Create markers.
    for (var i = 0; i < locations.length; i++) {
        var marker = new google.maps.Marker({
            position: locations[i].position,
            icon: icons[locations[i].type].icon,
            map: map,
            content: locations[i].content
        });

        var infowindow = new google.maps.InfoWindow();
        var content = locations[i].content;

        google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
            return function () {
                infowindow.setContent(content);
                infowindow.open(map, marker);
            };
        })(marker, content, infowindow));

        markers[i] = marker;
    };


        //var accommodationClick = selectPlaces("accommodation");
    $('#accommodationRadio').click(selectPlaces);
    $('#foodRadio').click(selectPlaces);
    $('#attractions').click(selectPlaces);

    } // end  addMarker() function

    function selectPlaces() {
    var type;
    if ($("#accommodationRadio").is(':checked')) {
        type = 'accommodation';
    } else if ($("#foodRadio").is(':checked')) {
        type = 'dining';
    } else if ($("#attractions").is(':checked')) {
        type = 'attractions';
    }
    clearMarkers();
    var ind = 0;
    for (var i = 0; i < locations.length; i++) {
        if (locations[i].type == type) {
            var marker = new google.maps.Marker({
                position: locations[i].position,
                icon: icons[locations[i].type].icon,
                map: map,
                content: locations[i].content
            });

            var infowindow = new google.maps.InfoWindow();
            var content = locations[i].content;

            google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                return function () {
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                };
            })(marker, content, infowindow));
            markers[ind] = marker;
            ind = ind + 1;
        };


    };

}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}

function reset() {
    initMap();
}