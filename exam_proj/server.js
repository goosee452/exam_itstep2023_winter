const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const Hitbox = require('./hitbox');


function writeFiles(request, response, ...file_paths) {
    let fileTypes = new Map;
    fileTypes.set('.html', 'text/html');
    fileTypes.set('.css', 'text/css');
    fileTypes.set('.png', 'image/png');
    fileTypes.set('.ico', 'image/x-icon');
    let extname = path.extname(request.url);
    file_paths = file_paths.flat(Infinity);
    if (file_paths.length != 0) {
        for (let i = 0; i < file_paths.length; i++) {
            if (file_paths[i].includes(request.url) && fileTypes.has(extname) == true) {
                response.writeHead(200, { 'Content-type': fileTypes.get(extname) });
                fs.readFile(file_paths[i], (err, data) => {
                    if (err) throw err
                    response.end(data);
                })
                break;
            }
        }
    }
}

function writePage_html(path, response, content) {
    response.writeHead(200, { 'Content-type': 'text/html' })
    if (typeof content == 'undefined') {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log('error');
                throw err;
            }
            response.end(data);
        })
    }
    else {
        response.end(content);
    }
} 

function randColor(){
    let hex = '#';
    let chars = '1234567890abcdef';
    for(let i =0; i < 6; i++){
        hex += chars[Math.floor(Math.random() * 100) % chars.length];
    }
    return hex;
}

const server = http.createServer((request, response) => {
    
    let req_url = url.parse(request.url, 1);
    writeFiles(request, response);
    if(req_url.pathname == '/' || req_url.pathname == '/index.html'){
        writePage_html('./index.html', response);
    }
    else if(req_url.pathname == '/check'){
        let a = new Hitbox(150, 0, 150, 1000);
        let b = new Hitbox(0, 30, 300, 200);
        let data = {
            hitbox1: a,
            hitbox2: b,
            res: a.checkForCollision(b)
        }
        request.on('data', ()=>{
            //....
        })
        .on('end', ()=>{
            response.end(JSON.stringify(data));
        })
    }
});

server.listen(2007);