class Hitbox{
    x;//x coordinate on coord 2d plane
    y;//y coordinate on coord 2d plane
    w;//hitbox width
    h;//hitbox height
    //xy----width------*
    //|                |
    //|height          |
    //|                |
    //*----------------*

    constructor(x_coord, y_coord, width, height){
        if(x_coord + '' != ''){
            this.x = +x_coord;
            this.y = +y_coord;
            this.w = +width;
            this.h = +height;
        }
        else{
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
        }
    }

    set_X(val){this.x = +val}
    set_Y(val){this.y = +val}
    set_W(val){this.w = +val}
    set_H(val){this.h = +val}


    checkForCollision(hitbox2){
        let hitboxesCollide = false;
        if(
            hitbox2.x >= this.x && hitbox2.x <= this.x + this.w &&
            hitbox2.y >= this.y && hitbox2.y <= this.y + this.h
        ){
            hitboxesCollide = true;
        }
        else if(
            hitbox2.x + hitbox2.w >= this.x && hitbox2.x + hitbox2.w <= this.x + this.w &&
            hitbox2.y >= this.y && hitbox2.y <= this.y + this.h
        ){
            hitboxesCollide = true;
        }
        else if(
            hitbox2.x >= this.x && hitbox2.x <= this.x + this.w &&
            hitbox2.y + hitbox2.h >= this.y && hitbox2.y + hitbox2.h <= this.y + this.h
        ){
            hitboxesCollide = true;
        }
        else if(
            hitbox2.x + hitbox2.w >= this.x && hitbox2.x + hitbox2.w <= this.x + this.w &&
            hitbox2.y + hitbox2.h >= this.y && hitbox2.y + hitbox2.h <= this.y + this.h
        ){
            hitboxesCollide = true;
        }
        else if(
            hitbox2.x <= this.x && hitbox2.x + hitbox2.w >= this.x + this.w &&
            hitbox2.y >= this.y && hitbox2.y <= this.y + this.h
        ){
            hitboxesCollide = true;
        }
        else if(
            hitbox2.x <= this.x && hitbox2.x + hitbox2.w >= this.x + this.w &&
            hitbox2.y + hitbox2.h >= this.y && hitbox2.y + hitbox2.h <= this.y + this.h
        ){
            hitboxesCollide = true;
        }
        else if(
            hitbox2.y <= this.y && hitbox2.y + hitbox2.h >= this.y + this.h &&
            hitbox2.x >= this.x && hitbox2.x <= this.x + this.w
        ){
            hitboxesCollide = true;
        }
        else if(
            hitbox2.y <= this.y && hitbox2.y + hitbox2.h >= this.y + this.h &&
            hitbox2.x + hitbox2.w >= this.x && hitbox2.x + hitbox2.w <= this.x + this.w
        ){
            hitboxesCollide = true;
        }
        

        return hitboxesCollide;
    }
}

module.exports = Hitbox;