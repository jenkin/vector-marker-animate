// Animated Vector Marker. Alessio Cimarelli 2013 https://github.com/jenkin/vector-marker-animate
// MIT license
//
// params:
// map                - the google map where place the marker (not for fadeOut)
// options            - optional options object (optional)
// options.duration   - animation duration in ms (default 1000)
// options.easing     - easing function from jQuery and/or the jQuery easing plugin (default 'linear')
// options.complete   - callback function. Gets called, after the animation has finished
google.maps.Marker.prototype.bindCircle = function(options) {
    var options = options || {};
    this.circle = new google.maps.Circle(options);
    this.circle.bindTo('map',this);
    this.circle.bindTo('center',this,'position');
}

google.maps.Marker.prototype.growUp = function(map, options) {
  defaultOptions = {
    duration: 1000,
    easing: 'linear',
    complete: null
  }
  options = options || {};

  // complete missing options
  for (key in defaultOptions) {
    options[key] = options[key] || defaultOptions[key];
  }

  // throw exception if easing function doesn't exist
  if (options.easing != 'linear') {            
    if (typeof jQuery == 'undefined' || !jQuery.easing[options.easing]) {
      throw '"' + options.easing + '" easing function doesn\'t exist. Include jQuery and/or the jQuery easing plugin and use the right function name.';
      return;
    }
  }
  
  // Throw exception if marker.circle is not defined
  if (!this.hasOwnProperty("circle")) {
    throw 'There is no circle binded to marker to animate! Before growUp() you have to set marker.circle = new google.maps.Circle({options}).';
    return;
  }

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  // save finale circle radius. prefixed to avoid name collisions.
  this.AT_endRadius = this.circle.getRadius();
  this.AT_startRadius = 0;
  this.circle.setRadius(this.AT_startRadius);

  this.setMap(map);

  var animateStep = function(marker, startTime) {            
    var ellapsedTime = (new Date()).getTime() - startTime;
    var durationRatio = ellapsedTime / options.duration; // 0 - 1
    var easingDurationRatio = durationRatio;

    // use jQuery easing if it's not linear
    if (options.easing !== 'linear') {
      easingDurationRatio = jQuery.easing[options.easing](durationRatio, ellapsedTime, 0, 1, options.duration);
    }
    
    if (durationRatio < 1) {
      var deltaRadius = marker.AT_startRadius + (marker.AT_endRadius - marker.AT_startRadius)*easingDurationRatio;
      
      marker.circle.setRadius(deltaRadius);

      // use requestAnimationFrame if it exists on this browser. If not, use setTimeout with ~60 fps
      if (window.requestAnimationFrame) {
        marker.AT_animationHandler = window.requestAnimationFrame(function() {animateStep(marker, startTime)});                
      } else {
        marker.AT_animationHandler = setTimeout(function() {animateStep(marker, startTime)}, 17); 
      }

    } else {
      
      marker.circle.setRadius(marker.AT_endRadius);

      if (typeof options.complete === 'function') {
        options.complete();
      }

    }            
  }

  // stop possibly running animation
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(this.AT_animationHandler);
  } else {
    clearTimeout(this.AT_animationHandler); 
  }
  
  animateStep(this, (new Date()).getTime());
}

google.maps.Marker.prototype.fadeIn = function(map, options) {
  defaultOptions = {
    duration: 1000,
    easing: 'linear',
    complete: null
  }
  options = options || {};

  // complete missing options
  for (key in defaultOptions) {
    options[key] = options[key] || defaultOptions[key];
  }

  // throw exception if easing function doesn't exist
  if (options.easing != 'linear') {            
    if (typeof jQuery == 'undefined' || !jQuery.easing[options.easing]) {
      throw '"' + options.easing + '" easing function doesn\'t exist. Include jQuery and/or the jQuery easing plugin and use the right function name.';
      return;
    }
  }
  
  // Throw exception if marker.circle is not defined
  if (!this.hasOwnProperty("circle")) {
    throw 'There is no circle binded to marker to animate! Before growUp() you have to set marker.circle = new google.maps.Circle({options}).';
    return;
  }

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  // save finale circle radius. prefixed to avoid name collisions.
  this.AT_endFillOpacity = this.circle.fillOpacity || 1.0;
  this.AT_endStrokeOpacity = this.circle.strokeOpacity || 1.0;
  this.AT_startFillOpacity = 0.0;
  this.AT_startStrokeOpacity = 0.0;
  this.circle.setOptions({fillOpacity: this.AT_startFillOpacity, strokeOpacity: this.AT_startStrokeOpacity});

  this.setMap(map);

  var animateStep = function(marker, startTime) {            
    var ellapsedTime = (new Date()).getTime() - startTime;
    var durationRatio = ellapsedTime / options.duration; // 0 - 1
    var easingDurationRatio = durationRatio;

    // use jQuery easing if it's not linear
    if (options.easing !== 'linear') {
      easingDurationRatio = jQuery.easing[options.easing](durationRatio, ellapsedTime, 0, 1, options.duration);
    }
    
    if (durationRatio < 1) {
      var deltaFillOpacity = marker.AT_startFillOpacity + (marker.AT_endFillOpacity - marker.AT_startFillOpacity)*easingDurationRatio;
      var deltaStrokeOpacity = marker.AT_startStrokeOpacity + (marker.AT_endStrokeOpacity - marker.AT_startStrokeOpacity)*easingDurationRatio;
      
      marker.circle.setOptions({fillOpacity: deltaFillOpacity, strokeOpacity: deltaStrokeOpacity});

      // use requestAnimationFrame if it exists on this browser. If not, use setTimeout with ~60 fps
      if (window.requestAnimationFrame) {
        marker.AT_animationHandler = window.requestAnimationFrame(function() {animateStep(marker, startTime)});                
      } else {
        marker.AT_animationHandler = setTimeout(function() {animateStep(marker, startTime)}, 17); 
      }

    } else {
      
      marker.circle.setOptions({fillOpacity: this.AT_endFillOpacity, strokeOpacity: this.AT_endStrokeOpacity});

      if (typeof options.complete === 'function') {
        options.complete();
      }

    }            
  }

  // stop possibly running animation
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(this.AT_animationHandler);
  } else {
    clearTimeout(this.AT_animationHandler); 
  }
  
  animateStep(this, (new Date()).getTime());
}

google.maps.Marker.prototype.fadeOut = function(options) {
  defaultOptions = {
    duration: 1000,
    easing: 'linear',
    complete: null
  }
  options = options || {};

  // complete missing options
  for (key in defaultOptions) {
    options[key] = options[key] || defaultOptions[key];
  }

  // throw exception if easing function doesn't exist
  if (options.easing != 'linear') {            
    if (typeof jQuery == 'undefined' || !jQuery.easing[options.easing]) {
      throw '"' + options.easing + '" easing function doesn\'t exist. Include jQuery and/or the jQuery easing plugin and use the right function name.';
      return;
    }
  }
  
  // Throw exception if marker.circle is not defined
  if (!this.hasOwnProperty("circle")) {
    throw 'There is no circle binded to marker to animate! Before growUp() you have to set marker.circle = new google.maps.Circle({options}).';
    return;
  }

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  // save finale circle radius. prefixed to avoid name collisions.
  this.AT_startFillOpacity = this.circle.fillOpacity;
  this.AT_startStrokeOpacity = this.circle.strokeOpacity;
  this.AT_endFillOpacity = 0.0;
  this.AT_endStrokeOpacity = 0.0;

  var animateStep = function(marker, startTime) {            
    var ellapsedTime = (new Date()).getTime() - startTime;
    var durationRatio = ellapsedTime / options.duration; // 0 - 1
    var easingDurationRatio = durationRatio;

    // use jQuery easing if it's not linear
    if (options.easing !== 'linear') {
      easingDurationRatio = jQuery.easing[options.easing](durationRatio, ellapsedTime, 0, 1, options.duration);
    }
    
    if (durationRatio < 1) {
      var deltaFillOpacity = marker.AT_startFillOpacity + (marker.AT_endFillOpacity - marker.AT_startFillOpacity)*easingDurationRatio;
      var deltaStrokeOpacity = marker.AT_startStrokeOpacity + (marker.AT_endStrokeOpacity - marker.AT_startStrokeOpacity)*easingDurationRatio;
      
      marker.circle.setOptions({fillOpacity: deltaFillOpacity});
      marker.circle.setOptions({strokeOpacity: deltaStrokeOpacity});

      // use requestAnimationFrame if it exists on this browser. If not, use setTimeout with ~60 fps
      if (window.requestAnimationFrame) {
        marker.AT_animationHandler = window.requestAnimationFrame(function() {animateStep(marker, startTime)});                
      } else {
        marker.AT_animationHandler = setTimeout(function() {animateStep(marker, startTime)}, 17); 
      }

    } else {
      
      marker.circle.setOptions({fillOpacity: this.AT_endFillOpacity});
      marker.circle.setOptions({strokeOpacity: this.AT_endStrokeOpacity});
      marker.setMap(null);

      if (typeof options.complete === 'function') {
        options.complete();
      }

    }            
  }

  // stop possibly running animation
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(this.AT_animationHandler);
  } else {
    clearTimeout(this.AT_animationHandler); 
  }
  
  animateStep(this, (new Date()).getTime());
}
