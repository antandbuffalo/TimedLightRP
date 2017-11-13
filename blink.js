'use strict';
var rp = false;
var Gpio, blueLight, whiteLight;
var ONE_SECOND = 1000;
var ONE_MINUTE = ONE_SECOND;
var ON_TIME = 18;
var OFF_TIME = 6;
var INTERVAL = ONE_MINUTE;
var ONE_HOUR = ONE_MINUTE * 60;
var ON = false;
var OFF = false;
var isBlueOn = false;

if(rp) {
    Gpio = require('onoff').Gpio;
    blueLight = new Gpio(25, 'out');
    whiteLight = new Gpio(23, 'out');
}
else {
    var emptyFn = {
        "writeSync": function() {}    
    }; 
    blueLight = emptyFn;
    whiteLight = emptyFn;
}

function init() {
    setTimeout(function() {
        var currentTime = new Date();
        var hour = currentTime.getHours();
        
        if(hour >= ON_TIME || hour <= OFF_TIME) {
            if(isBlueOn) {
                isBlueOn = false;
                blueLight.writeSync(0);    //LED ON
                whiteLight.writeSync(1);    //LED ON    
            }
            else {
                isBlueOn = true;
                blueLight.writeSync(1);    //LED ON
                whiteLight.writeSync(0);    //LED ON    
            }
        }
        else {
            blueLight.writeSync(0);    //LED OFF
            whiteLight.writeSync(0);    //LED OFF
        }
        init();
    }, INTERVAL);
};

if(OFF) {
    blueLight.writeSync(0);
    whiteLight.writeSync(0);
}
if(ON) {
    blueLight.writeSync(1);
    whiteLight.writeSync(1);
}
if(!ON && !OFF) {
    INTERVAL = ONE_SECOND * 2;
    init();    
}