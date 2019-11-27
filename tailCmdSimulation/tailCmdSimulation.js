let fs = require('fs');
let event = require('events');
let _event = new event();
let Ws = require('ws').Server;
let wss = new Ws({host:'localhost', port:5000});
//let lineNos = process.argv[2];

//Creating a websocket server
wss.on('connection', (socket)=>{
    console.log('socket connected');
    tailCommandSimulator(10, (data)=>{
        socket.send(data, (err)=>{
            if(err){
                console.log('Error on sending msg' + err);
                return;
            }
        })
    });

    socket.on('message', (lineNos)=>{
        console.log(lineNos);
        tailCommandSimulator(lineNos, (data)=>{
            socket.send(data, (err)=>{
                if(err){
                    console.log('Error on sending msg' + err);
                    return;
                }
            })
        });
    });
});

//function that reads data from the test.txt file and returns lastTenLines or lines based on lineNos as a callback 
//This operation is done on event 'changeFile' which gets trigger manually on 1st function call
//and later on any changes on that file which is watched for changes using fs.watchFile
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

//To server our index.html which has websocket client connection.
let http = require('http');
http.createServer((req, res)=>{
    fs.readFile(__dirname + '/index.html', (err, fileData)=>{
        if(err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fileData);
    })
}).listen(3000, () => console.log('server running on port 3000 \n open http://localhost:3000 url and change data on test.txt to see the realtime changes'));