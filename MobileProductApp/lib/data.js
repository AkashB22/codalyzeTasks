let fs = require('fs');

let lib = {};
lib.productsDir = __dirname + '/../data/products/';

lib.list = function(callback){
    fs.readdir(lib.productsDir, 'utf8', (err, files)=>{
        if(err) callback({error : 'Error on reading the directory' + lib.productsDir});
        else{
            //console.log(files)
            callback(false, files);
        }
    });
}

lib.read = function(file, callback){
    fs.readFile(lib.productsDir + file + '.json','utf8', (err, fileData)=>{
        if(err) callback({error : 'Error on reading the file' + lib.productsDir + file});
        else{
            let arr = fileData.split('\n\r');
            arr.forEach((jsonStr)=>{
                if(jsonStr !== null){
                let jsonData = JSON.parse(jsonStr);
                    
                //console.log(jsonData);
                callback(false, jsonData);
                }
            })
        }
    });
}

lib.create = function(file, data, callback){
    fs.open(lib.productsDir + file + '.json', 'wx', (err, fd)=>{
        if(err) callback({error : 'Error on opening the file' + lib.productsDir + file + ' for creating since it already exists'});
        else{
            let stringData = JSON.stringify(data)
            fs.write(fd, stringData, (err)=>{
                if(err) callback({error : 'Error on writing to the file' + lib.productsDir + file})
                else{
                    fs.close(fd, (err)=>{
                        if(err) callback({error : 'Error on closing the file' + lib.productsDir + file})
                        else{
                            callback(false);
                        }
                    })
                }
            })
        }
    })
}

lib.update = function(file, data, callback){
    fs.open(lib.productsDir + file + '.json', 'r+', (err, fd)=>{
        if(err) callback({error : 'Error on opening the file' + lib.productsDir + file});
        else{
            let stringData = JSON.stringify(data);
            fs.ftruncate(fd, (err)=>{
                if(err) callback({error : 'Error on deleting the file' + lib.productsDir + file + 'while updating it'});
                else{
                    fs.write(fd, stringData, (err)=>{
                        if(err) callback({error : 'Error on wrinting to the file' + lib.productsDir + file});
                        else{
                            fs.close(fd, (err)=>{
                                if(err) callback({error : 'Error on closing the file' + lib.productsDir + file})
                                else{
                                    callback(false);    
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

lib.delete = function(file, callback){
    fs.unlink(lib.productsDir + file + '.json', (err)=>{
        if(err) callback({error : 'Error on deleting the file' + lib.productsDir + file})
        else{
            callback(false);
        }
    });
}

module.exports = lib;