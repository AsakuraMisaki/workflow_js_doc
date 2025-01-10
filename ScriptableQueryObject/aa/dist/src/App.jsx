import { useEffect } from "react";
// import { renderer } from "./runner";
import "./runner"


export const App = ()=>{
  // useEffect(()=>{
  //   document.getElementById("app").innerHTML = "";
  //   document.getElementById("app").appendChild( renderer.domElement );
  // })
  return (
    <>
      {/* <div id="btns" style={{fontSize:20, position:"absolute"}}>
        <button> L </button>
        <button> R </button>
      </div> */}
      <div id="app"></div>
    </>
  )
}