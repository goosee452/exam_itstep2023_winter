const express = require('express');
//const phaser = require('phaser');
const formidable = require('formidable');
const app = express();
const path = require('path');
const fs = require('fs');
const { stringify } = require('querystring');

function setID(players){
    function generateID(){
        let chars = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890'
        let id = '';
        for(let i = 0; i < 16; i++){
            id+= chars[(Math.floor(Math.random() * 100) % chars.length)]
        }
        return id;
    }

    let idIsUnique = true;
    let id = generateID();
    for(let i = 0; i < players.length; i++){
        if(players[i].id == id){
            idIsUnique = false;
            break;
        }
    }
    while(!idIsUnique){
        idIsUnique = true;
        id = generateID();
        for(let i = 0; i < players.length; i++){
            if(players[i].id == id){
                idIsUnique = false;
                break;
            }
        }
    }
    return id;
}


function playerExists(players, player){
    for(let i = 0; i < players.length; i++){
        if(player.name + '' == players[i].name + ''){
            return true;
        }
    }
    return false;
}


function generateSessionKey(){
    let key = '';
    let chars = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890'
    for(let i = 0; i < 20; i++){
        key+= chars[(Math.floor(Math.random() * 100) % chars.length)]
    }
    return key;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------




app.all('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client/pages/main.html'))
    console.log(req.url);
});
app.get('/styles/main.css', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client/styles/main.css'))
})



app.all('/create', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client/pages/create.html'));
})
app.post('/create_acc', (req, res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        if(err){
            console.log(err);
        }
        else{
            fs.readFile('./data/players.json', (err, data)=>{
                if(err){
                    throw err;
                }
                else{
                    let players = JSON.parse(data);
                    let newPlayer = {
                        name: fields.name,
                        password: fields.password,
                        id: setID(players),
                        key: generateSessionKey()
                    };
                    if(playerExists(players, newPlayer)){
                        res.status(409).sendFile(__dirname + '/client/pages/playerExists.html');
                    }
                    else{
                        players.push(newPlayer);
                        players.flat(Infinity);   
                        fs.writeFile('./data/players.json', JSON.stringify(players), (err)=>{if(err) console.log(err)});
                        res.redirect('/create');
                    }
                }
            })
        }
    })
})
app.get('/styles/create.css', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client/styles/create.css'));
})



app.get('/signin', (req, res)=>{
    res.sendFile(__dirname + '/client/pages/signin.html');
})
app.post('/signin/try', (req, res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        if(err){
            console.log(err);
        }
        else{
            fs.readFile('./data/players.json', (err, data)=>{
                if(err){
                    throw err;
                }
                else{
                    let players = JSON.parse(data);
                    let playerExists = false;
                    for(let i =0; i < players.length; i++){
                        if(players[i].name + '' == fields.name + ''){
                            playerExists = true;
                            if(players[i].password + '' == fields.password + ''){
                                let key = players[i].key;
                                let respData = {
                                    state: 'Request successful',
                                    key: key
                                }
                                res.send(JSON.stringify(respData));
                            }
                            else{
                                let respData = {
                                    state: 'Incorrect password!'
                                }
                                res.send(JSON.stringify(respData));
                            }
                        }
                    }

                    if(playerExists == false){
                        let respData = {
                            state: 'This player does not exist!'
                        }
                        res.send(JSON.stringify(respData));
                    }
                }
            })
        }
    })
});


app.listen(2007);