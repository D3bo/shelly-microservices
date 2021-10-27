const express = require('express'); 

const shellies = require('./node-shellies/index')

const app = express();
const port = 3000;

app.get('/', (req,res)=>
{
    res.send('Hello-World!');
});

app.get('/shellies', (req,res)=>
{
    res.send(shellies.device)
})

app.listen(port, () => {
    console.log(`Applicazione in ascolto su http://localhost:${port}`)
})

let dispositivi; 

shellies.on('discover', device => {
    // a new device has been discovered
    console.log('Discovered device with ID', device.id, 'and type', device.type)
    console.log('address', device.host)
  
    console.log(shellies._devices)

    dispositivi = shellies._devices;
    
    device.on('change', (prop, newValue, oldValue) => {
      // a property on the device has changed
      console.log(prop, 'changed from', oldValue, 'to', newValue)
      
      
    })
  
    device.on('offline', () => {
      // the device went offline
      console.log('Device with ID', device.id, 'went offline')
    })
  })
  
  // start discovering devices and listening for status updates
  shellies.start()

