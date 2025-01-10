import { Chance } from "chance";
import { EV } from "./ev";
import { Group } from "three";

export class Building extends EV{
  constructor(group){
    super();
    this.group = group;
    this.leftGroup = new Group();
    this.rightGroup = new Group();
  }
  gen(){
    let chance = new Chance(performance.now());
    let target = chance.shuffle(this.group.children)[0].clone();
    return target;
  }
  update(){
    this.updateGC(this.leftGroup);
    this.updateGC(this.rightGroup);
  }
  updateGC(group){
    let children = Array.from(group.children);
    children.forEach((mesh)=>{
      mesh.position.x += 1;
      if(mesh.position.x >= 100){
        group.remove(mesh);
      }
    })
  }
}