import { Time } from "./collection";
import { EV } from "./ev";
import { NPC } from "./npc";

export class Player extends EV{
  constructor(mesh, speed=0, maxSpeed=2, maxAC=0.05){
    super();
    this.mesh = mesh;
    this.maxSpeed = maxSpeed;
    this.speed = speed;
    this.maxAC = maxAC;
    this.aces = new Map();
    this.makeSpeedTimer(0, 1000, 0, 1);
  }
  pos(z=0){
    this.mesh.position.z = z;
  }
  move(dir){
    if(this.moveTimer) return;
    let p = this.mesh.position.x;
    let t = 3000;
    let tp = p-dir*5;
    if(tp < -8 || tp > 8) return;
    console.warn(tp);
    tp = Math.min(Math.max(-8, tp), 8);
    this.moveTimer = new Time(t, p, tp);
    let rotationTimer = new Time(t, 0, Math.PI);
    let z1 = this.mesh.rotation.z;
    rotationTimer.on("update", (value)=>{
      console.log(value);
      this.mesh.rotation.z = (Math.PI / 6 * dir) * Math.sin(value) + this.z1;
    })
    this.moveTimer.on("update", (value, now)=>{
      this.mesh.position.x = value;
      rotationTimer.update(now);
      // console.log(this.moveTimer.time, rotationTimer.time, value, rotationTimer.getValue());
    })
    this.moveTimer.on("end", ()=>{
      this.moveTimer = null;
      console.log(this.mesh.position.z);
    })
  }
  update(){
    if(this.moveTimer){
      this.moveTimer.update();
    }
    if(this.jumpTimer){
      this.jumpTimer.update();
    }
    this.aces.forEach((timer)=>{
      timer.update();
    })
    // console.log(this.mesh.rotation.z);
    // this.speed = Math.min(this.maxSpeed, this.speed + this.ac);
    // if(this.speed <= 1){
    //   this.makeSpeedTimer();
    // }
    // else if(this.speed >= this.maxSpeed){
    //   this.makeSpeedTimer(2, 1000, -this.maxAC);
    // }
  }
  get ac(){
    let value = 0;
    this.aces.forEach((timer)=>{
      value += timer.getValue();
      
    })
    console.log(this.speed);
    return Math.min(value, this.maxAC);
  }
  makeSpeedTimer(key=0, duration=1000, start=this.speed, target=this.maxSpeed){
    if(this.aces.has(key)) return;
    let timer = new Time(duration, start, target);
    timer.on("update", (value)=>{
      this.speed = value;
    })
    timer.on("end", ()=>{
      this.aces.delete(key);
    })
    this.aces.set(key, timer);
  }
  makeJumpTimer(){
    if(this.jumpTimer) return;
    let timer = new Time(8000, 0, Math.PI);
    timer.on("update", (value)=>{
      let r = Math.sin(value);
      // this.mesh.rotation.z = (Math.PI / 16 * -1) * r;
      this.mesh.position.y = 1 * r;
    })
    timer.on("end", ()=>{
      this.jumpTimer = null;
    })
    this.jumpTimer = timer;
  }
}