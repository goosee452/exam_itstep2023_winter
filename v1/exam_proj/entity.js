const Hitbox = require('./hitbox');

class Entity{
    x;
    y;
    hitbox;
    sprite;
    animations;
    //hitbox x and y are relative to entity's x and y
    //so real hitbox x = entity.hitbox.x + entity.x

    constructor(x, y, hitbox_x, hitbox_y, hitbox_w, hitbox_h){
        this.hitbox = new Hitbox(hitbox_x, hitbox_y, hitbox_w, hitbox_h);
        this.x = x;
        this.y = y;
    }

    getRealHitbox_X(){
        return (this.x + this.hitbox.x);
    }

    getRealHitbox_Y(){
        return (this.y + this.hitbox.y);
    }

    move(entity2, final_x, final_y){
        
    }
}