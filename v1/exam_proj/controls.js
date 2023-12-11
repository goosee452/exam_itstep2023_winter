let keys = {
    up: false,
    left: false,
    down: false,
    right: false
}

addEventListener('keydown', (event)=>{
    if(event.key == 'w'){
        keys.up = true;
    }
    if(event.key == 'a'){
        keys.left = true;
    }
    if(event.key == 's'){
        keys.down = true;
    }
    if(event.key == 'd'){
        keys.right = true;
    }
})

addEventListener('keyup', (event)=>{
    if(event.key == 'w'){
        keys.up = false;
    }
    if(event.key == 'a'){
        keys.left = false;
    }
    if(event.key == 's'){
        keys.down = false;
    }
    if(event.key == 'd'){
        keys.right = false;
    }
})

function showKeys(){
    console.log(keys);
}