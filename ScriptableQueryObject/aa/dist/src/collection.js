import { Box3, Vector3 } from "three";
import { EV } from "./ev";

export function getSize(mesh){
  let box = new Box3();
  let size = new Vector3();
  box.setFromObject(mesh);
  box.getSize(size);
  console.log(size);
  return size;
}

export function find(group, name, finds=[]){
  if(!group.children) return finds;
  group.children.forEach((a)=>{
    if(name instanceof RegExp){
      if(name.test(a.name)){
        finds.push(a);
      }
    }
    else if(a.name.toLowerCase() == name.toLowerCase()){
      finds.push(a);
    }
    return find(a, name, finds);
  })
  return finds;
}

export class Point2D{
  constructor(){
    this.clear(0, 0);
  }
  clear(x=0, y=0){
    this.x = x;
    this.y = y;
  }
}

export class Time extends EV{
  constructor(duration, a, b){
    super();
    this.time = 0;
    this.duration = duration;
    this.a = a;
    this.b = b;
    this._b = this.a;
  }
  lerp(t){
    return 3 * Math.pow(t, 2) - 2 * Math.pow(t, 3);
  }
  update(now){
    if(this._end) return;
    now = now || performance.now();
    if(!this.delta){
      this.delta = now;
    }
    this.time += (now - this.delta);
    let t = this.time / this.duration;
    t = Math.min(t, 1);
    this._b = this.a + this.lerp(t) * (this.b - this.a);
    this.emit("update", this.getValue(), now)
    if(t >= 1){
      this.end();
    }
  }
  end(){
    this._end = true;
    this.emit("end");
  }
  getValue(){
    return this._b;
  }
}
