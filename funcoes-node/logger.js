const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const emitter = new EventEmitter();

// criando um evento sempre que emit a palavra log 
emitter.on('log' , (message)=> {
    
    fs.appendFile(path.join(__dirname, 'log.txt'), message , err => {
            if(err) throw err
    });
})

// criando função para grava log 
function log(message){
    // chamando o evento
    emitter.emit('log', message);
}

// exportando a função por default
module.exports = log;