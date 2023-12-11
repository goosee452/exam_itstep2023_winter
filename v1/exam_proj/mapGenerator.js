function generateMap(length, height){
    function generateCavern(){
        let start = {
            x: Math.floor(Math.random() * 100),
            y: Math.floor(Math.random() * 100)
        };
        let prev = {
            x: start.x,
            y: start.y
        }
        let cavern = new Array();
        cavern.push(start);
        for(let i = 0; i < 50; i++){
            let direction = Math.floor(Math.random() * 10) % 4;
            let newPos = {
                x: prev.x, 
                y: prev.y
            }
            switch (direction){
                case 0:{
                    newPos.x += newPos.x-1 >= 0? -1: 0;
                    break;
                }
                case 1:{
                    newPos.y += newPos.y-1 >= 0? -1: 0;
                    break;
                }
                case 2:{
                    newPos.x += newPos.x+1 < length? 1: 0;
                    break;
                }
                case 3:{
                    newPos.y += newPos.y+1 < height? 1: 0;
                    break;
                }   
            }
            prev = {
                x: newPos.x,
                y: newPos.y
            }
            cavern.push(newPos);
        }
        return cavern;
    }

    let map = new Array();
    for(let a = 0; a < 20; a++){
        let cavern = generateCavern();
        for(let b = 0; b < 50; b++){
            map.push(cavern[b]);
        }
    }
    return map;
}

module.exports = generateMap;