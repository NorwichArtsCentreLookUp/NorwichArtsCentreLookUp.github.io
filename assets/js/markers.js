// Map
var map = L.mapbox.map('map', 'ncalookup.ik6hk0lb', {
    zoomControl: false
})
    .setView([52.63, 1.296], 16);
L.control.locate().addTo(map);
L.control.zoomslider().addTo(map);
map.featureLayer.on('click', function (e) {
    map.panTo(e.layer.getLatLng());
});

// Audio player

// audiojs.events.ready(function() {
// var as = audiojs.createAll();
// });

// Trail Photos Markers (flickr)
var flickrTrailSet = '72157645165498143',
    apiKey = '6240841f19c9a6efe0905cd6d18daa6f',
    photosTrailUrl = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + flickrTrailSet + '&extras=geo,url_s,url_l,description&format=json';

$(document).ready(function () {
    $.getJSON(photosTrailUrl + '&jsoncallback=?', function (data) {
        console.log(data);
        var viewSet = false;

        $.each(data.photoset.photo, function (i, photo) {
            if (photo.latitude == 0) return;
            var latLng = new L.latLng(photo.latitude, photo.longitude),
                icon = new L.icon({
                    iconUrl: "/assets/img/logo.png"
                }),
                marker = L.marker(latLng, {
                    icon: icon
                });
            marker.addTo(map).bindPopup(
                "<a href=\"" + photo.url_l + "\" rel=\"lightbox\">" +
                "<img src=\"" + photo.url_s + "\"></a>" +
                "<h3>" + photo.title + "</h3>" + photo.description._content +
                "<a href=\"" + photo.url_l + "\" rel=\"lightbox\">" +
                "<p> Click to play </p></a>");
        });
    });
});

// Contributer Photos Markers
var flickrContSet = '72157645386012423',
	apiKey = '6240841f19c9a6efe0905cd6d18daa6f',
	photosContUrl = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + flickrContSet +'&extras=geo,url_s,url_l,description&format=json';

$( document ).ready(function() {
	$.getJSON( photosContUrl + '&jsoncallback=?', function(data) {
		console.log( data );
		var viewSet = false;

		$.each(data.photoset.photo, function(i,photo) {
			if ( photo.latitude == 0 )
				return;
			var latLng = new L.latLng( photo.latitude, photo.longitude ),
				icon = new L.icon({ iconUrl: "/assets/img/contributer.png" }),
				marker = L.marker( latLng, { icon: icon } );
				marker.addTo( map ).bindPopup(
					"<a href=\"" + photo.url_l + "\" rel=\"lightbox\">" +
					"<img src=\"" + photo.url_s + "\"></a>" +
					"<h3>" + photo.title + "</h3>" + photo.description._content
				);
		});
	});
});

// Audio Markers
$(document).ready(function () {
    // also, http://api.audioboo.fm/users/2521140/audio_clips/located will filter down to just boos with a location
    $.getJSON('http://api.audioboo.fm/users/2521140/audio_clips/located.jsonp?callback=?', function (data) {
        console.log(data);
        var items = [];
        $.each(data.body.audio_clips, function (i, audio) {
            var location = audio.location;
            if (!location) return;
            var latLng = new L.latLng(location.latitude, location.longitude),
                icon = new L.icon({
                    iconUrl: "/assets/img/audio.png"
                }),
                marker = L.marker(latLng, {
                    icon: icon
                });
            marker.addTo(map).bindPopup(
                "<a href=\"" + audio.urls.detail + "\">" +
                "<img src=\"" + audio.urls.image + "\"></a>" +
				// "<audio src="/mp3/juicy.mp3" preload="none" />" +
                "<h3>" + audio.title + "</h3>" + audio.description);
        });
    });
});

// Image enlarging
$("img").img_lightbox_tooltip({ tooltip_show: "hover", placement: "top", title: "click to enlarged image"})
