# Animated marker movement in Google Maps

A nice alternative to `marker.setMap(map)`. Include jQuery and jQuery Easing Plugin for more easing options.

Demo: http://www.dataninja.it/libs/google/maps/vectorMarkerAnimate/demo/vectorMarkerAnimate.html

## Usage

Include `vectorMarkerAnimate.js` after Google Maps and call `bindCircle`, `growUp`, `fadeIn`, `fadeOut` on a `google.maps.Marker`:

    // params:
    // map                - the google map where place the marker (not for fadeOut)
    // options.duration   - animation duration in ms (default 1000)
    // options.easing     - easing function from jQuery and/or the jQuery easing plugin (default 'linear')
    // options.complete   - callback function. Gets called, after the animation has finished

    marker.growUp(map [, {easing: 'easeOutBounce', duration: 1000, complete: function(){}}]);
    marker.fadeIn(map [, {easing: 'easeOutBounce', duration: 1000, complete: function(){}}]);
    marker.fadeOut([, {easing: 'easeOutBounce', duration: 1000, complete: function(){}}]);

## Example

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lon),
        visible: false
    });
                                      
    marker.bindCircle({
        map: map,
        radius: 100000,
        strokeColor: "red",
        strokeWeight: 1,
        fillColor: "red",
        fillOpacity: 0.5
    });
                                                        
    marker.growUp(map, {duration: 3000});
    $("#fadeout").click(function() { marker.fadeOut(); });

