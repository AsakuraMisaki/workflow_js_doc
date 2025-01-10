import { getSize } from "./collection";
import { EV } from "./ev";

export class TrackConfig{
  constructor(speed){
    this.speed = speed || 10;
  }
}

export class Track extends EV{
  constructor(player, group){
    super();
    this.group = group;
    this.player = player;
    this.makeInfo();
    // this.change();
  }
  makeInfo(){
    let target = this.group.children[0];
    this.infos = new Map();
    // let size = getSize(target);
    this.info = {size:{x:90}};
  }
  change(){
    let [t1, t2] = this.group.children;
    let p1 = t1.position;
    let p2 = t2.position;
    t2.position.y = p1.y;
    t1.position.y = p2.y;
  }
  update(){
    this.emit("udpate");
    let current = this.current;
    let info = this.info;
    this.group.position.z += this.player.speed;
    // console.log(this.group.position.z);
    if(this.group.position.z >= Math.abs(228)){
      this.change();
      this.group.position.z = 0;
    }
  }
}