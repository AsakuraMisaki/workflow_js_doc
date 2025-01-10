import { Box3, Vector3 } from "three";
import { getSize } from "./collection";
import { EV } from "./ev";

export class NPC extends EV{
  constructor(mesh){
    super();
    this.mesh = mesh;
    let size = getSize(mesh);
  }
  destroy(){

  }
  update(){

  }
}
