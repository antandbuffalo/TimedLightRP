var Gpio, blueLight, whiteLight;
Gpio = require('onoff').Gpio;
blueLight = new Gpio(25, 'out');
whiteLight = new Gpio(23, 'out');
setTimeout(function() {
    blueLight.writeSync(0);  
    whiteLight.writeSync(0); 
}, 5000);
blueLight.writeSync(1);    
whiteLight.writeSync(1);    
