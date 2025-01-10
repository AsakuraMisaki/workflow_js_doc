import { Group } from "three";
import { EV } from "./ev";
import { Point2D, find } from "./collection";
import { Player } from "./player";
import { Track, TrackConfig } from "./track";
import { NPC } from "./npc";
import { Building } from "./building";

export class Game extends EV{
  constructor(){
    super();
    this.taskObjects = new Set();
    this.touchs = new Point2D();
  }
  ready(){
    const ng = new Group();
    let npcRes = find(root, /^npc/) || [];
    if(npcRes.length){
      ng.add(...npcRes);
    }
    
    const bg = new Group();
    let bRes = find(root, /^t/) || [];
    if(bRes.length){
      bg.add(...bRes);
    }
    // bg.add(...npcRes);
    const tg = new Group();
    let tRes = find(root, /^地图/i) || [];
    tg.add(...tRes);
    let player = find(root, "车");
    this.player = new Player(player[0]);
    this.player.z1 = this.player.mesh.rotation.z;
    this.Track = new Track(this.player, tg);
    this.Building = new Building(bg);
    this.NPC = new NPC(ng);
    this.taskObjects.add(this.NPC);
    this.taskObjects.add(this.Building);
    this.taskObjects.add(this.player);
    this.taskObjects.add(this.Track);
    let speed = 10;
    const {leftGroup, rightGroup} = this.Building;
    root.add(leftGroup);
    root.add(rightGroup);
    // this.player.pos();
    // this.on("update", ()=>{
    //   if(speed--) return;
    //   speed = 10;
    //   let lb = this.Building.gen();
    //   let lr = this.Building.gen();
    //   leftGroup.add(lb);
    //   rightGroup.add(lr);
    // })
    root.add(tg);
  }
  start(){
    document.addEventListener("keydown", (e)=>{
      if(e.key.toLowerCase() == "w"){
        this.player.makeSpeedTimer(1, 1000, this.player.speed, this.player.maxSpeed);
      }
      else if(e.key.toLowerCase() == "a"){
        this.player.move(1);
      }
      else if(e.key.toLowerCase() == "d"){
        this.player.move(-1);
      }
      else if(e.code.toLowerCase() == "space"){
        
      }
      // if(!e.button == 2) return;
      // this.touchs.x = e.pageX;
      // document.addEventListener("pointerup", this._pointerup);
    })
    document.addEventListener("keyup", (e)=>{
      if(e.key.toLowerCase() == "w"){
        this.player.makeSpeedTimer(2, 1000, this.player.speed, 1);
      }
      
    })
  }
  _pointerup(e){
    document.removeEventListener("pointerup", this._pointerup);
    let ox = (this.touchs.x - e.pageX);
    if(Math.abs(ox) < 10) return;
    let dir = ox < 0 ? -1 : 1;
    this.player.move(dir);
  }
  update(){
    this.emit("update");
    this.taskObjects.forEach((obj)=>{
      obj.update ? obj.update() : null;
    })
  }
}