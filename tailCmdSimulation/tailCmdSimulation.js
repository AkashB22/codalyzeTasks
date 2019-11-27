let fs = require('fs');
let data = '';
let event = require('events');
let _event = new event();
let Ws = require('ws').Server;
let wss = new Ws({host:'localhost', port:5000});
let lineNos = process.argv[2];

function tailCommandSimulator(lineNos, callback){
    _event.on('changeFile', (fileName)=>{
        fs.readFile(__dirname + '/' + fileName, (err, data)=>{
            if(err) throw err;

            let splittedLines = data.toString().split('\n');
            let lastTenLines = '';
            if(lineNos > 0){
                for(let i = splittedLines.length - lineNos; i< splittedLines.length; i++){
                    lastTenLines += splittedLines[i] + '\n';
                }
            } else{
                for(let i = splittedLines.length - 10; i< splittedLines.length; i++){
                    lastTenLines += splittedLines[i] + '\n';
                }
            }
            if(typeof(callback) == 'function'){
                callback(lastTenLines);
            }
        });  
    })
    
    fs.watchFile(__dirname + '/' + 'test.txt', {persistent : true, interval : 7000}, (event)=>{
        console.log('file Changed')
        if(event.nlink === 1){
            _event.emit('changeFile', 'test.txt');
        }
    });

    _event.emit('changeFile', 'test.txt');
}

wss.on('connection', (socket)=>{
    console.log('socket connected');
    tailCommandSimulator(10, (data)=>{
        socket.send(data, (err)=>{
            if(err){
                //console.log('Error on sending msg' + err);
                return;
            }
        })
    });

    socket.on('message', (lineNos)=>{
        console.log(lineNos);
        tailCommandSimulator(lineNos, (data)=>{
            socket.send(data, (err)=>{
                if(err){
                    //console.log('Error on sending msg' + err);
                    return;
                }
            })
        });
    });
});


tailCommandSimulator();

let http = require('http');
http.createServer((req, res)=>{
    fs.readFile(__dirname + '/index.html', (err, fileData)=>{
        if(err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fileData);
    })
}).listen(3000, () => console.log('server running'));