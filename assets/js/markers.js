
// Map
var map = L.mapbox.map('map', 'ncalookup.ik6hk0lb', { zoomControl:false })
	.setView([52.63, 1.296], 16);
	L.control.locate().addTo(map);
	L.control.zoomslider().addTo(map);
	map.featureLayer.on('click', function(e) {
		map.panTo(e.layer.getLatLng());
	});

// Trail Photos Markers
var flickrTrailSet = '72157645165498143',
	apiKey = '6240841f19c9a6efe0905cd6d18daa6f',
	photosTrailUrl = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + flickrTrailSet +'&extras=geo,url_s,url_l,description&format=json';

$( document ).ready(function() {
	$.getJSON( photosTrailUrl + '&jsoncallback=?', function(data) {
		console.log( data );
		var viewSet = false;

		$.each(data.photoset.photo, function(i,photo) {
			if ( photo.latitude == 0 )
				return;
			var latLng = new L.latLng( photo.latitude, photo.longitude ),
				icon = new L.icon({ iconUrl: "/assets/img/logo.png" }),
				marker = L.marker( latLng, { icon: icon } );
				marker.addTo( map ).bindPopup(
					"<a href=\"" + photo.url_l + "\" rel=\"lightbox\">" +
					"<img src=\"" + photo.url_s + "\"></a>" +
					"<h3>" + photo.title + "</h3>" + photo.description._content
				);
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
$( document ).ready(function() {
// $( document ).ready(function()
// jQuery detects this state of readiness for you. Code included inside
// $( document ).ready() will only run once the page Document Object Model
// (DOM) is ready for JavaScript code to execute

	$.getJSON( 'http://api.audioboo.fm/users/2521140/audio_clips.json', function(data) {
	// .getJSON( url [, data ] [, success ] )
	//
	// url
	// A string containing the URL to which the request is sent.
	//
	// data
	// A plain object or string that is sent to the server with the request.
	//
	// success
	// Function( PlainObject data, String textStatus, jqXHR jqXHR )
	// A callback function that is executed if the request succeeds.
		var items = [];
		$.each( data, function( title, description, latitude, longitude, detail, image ) {
			if ( latitude == 0 )
				return;
			var latLng = new L.latLng( latitude, longitude ),
			icon = new L.icon({ iconUrl: "/assets/img/audio.png" }),
			marker = L.marker( latLng, { icon: icon } );
			marker.addTo( map ).bindPopup(
			  "<a href=\"" + detail + "\" rel=\"lightbox\">" +
			  "<img src=\"" + image + "\"></a>" +
			  "<h3>" + title + "</h3>" + description
			);
		});
	});
});

// Image enlarging
$("img").img_lightbox_tooltip({ tooltip_show: "hover", placement: "top", title: "click to enlarged image"})
