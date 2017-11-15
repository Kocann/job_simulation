import {MainPlayerComponent} from './Components/MainPlayerComponent';
import {CofeeComponent} from './Components/CoffeComponent';
import {EnemyComponent} from'./Components/EnemyComponent';
import {BulletComponent} from './Components/BulletComponent';

export class Game {
  constructor() {
    // canvas defining
    this.cnv = document.createElement("canvas");
    this.cnv.width = 800;
    this.cnv.height = 500;
    this.cnv.setAttribute("id", "myGameArea");
    this.ctx = this.cnv.getContext("2d");
    this.cnv.dx = 1; 
    this.cnv.dy = 1;
    
    // tracking wich keys are down - for movement
    // & tracking all obstacles
    this.keys = (this.keys || []);
    this.components = (this.components || []);
    
    // setting visible components
    this.mainPlayer = new MainPlayerComponent(50, 50, "blue")
    this.components.push(new CofeeComponent(25, "img"));
    this.components.push(new EnemyComponent(600, 290, 2));
    
    // methods for updating location of components
    this.clear = ()=> {
      this.ctx.clearRect(0,0,this.cnv.width, this.cnv.height)
    }
    
    this.updateInterval = setInterval(()=> {
      this.components.forEach((x,i) => {
        if (this.mainPlayer.crashed(x)) {
          this.componentsInteraction(this.mainPlayer, x);
          return;
        }
      })

      this.clear();

      // components moving
      this.components.filter(x => x.kind !== "coffeComponent").forEach((x,i) => {
        x.moveTo(this.cnv);
      });
  
      // mainPlayer moving and updating all components
      this.mainPlayer.movingX = 0;
      this.mainPlayer.movingY = 0;
      this.controlComponents();
      this.mainPlayer.moveTo(this.cnv);
      this.mainPlayer.update(this.ctx);
      this.components.forEach((x,i) => {
        x.update(this.ctx);
      })
    }, 20)
  }
  
  // TODO: refractor code so its more versatile and readible 
  controlComponents() {
    if (this.keys && this.mainPlayerCanMove()) {
      if (this.keys[37]) {this.mainPlayer.movingX = -1}   
      if (this.keys[39]) {this.mainPlayer.movingX = 1}
      if (this.keys[38]) {this.mainPlayer.movingY = -1}
      if (this.keys[40]) {this.mainPlayer.movingY = 1}
      if (this.keys[32]) {this.components.push(new BulletComponent(this.mainPlayer.x, this.mainPlayer.y))}
   }
  }
  
  mainPlayerCanMove() {
    if ((this.mainPlayer.x != 0) ||
        (this.mainPlayer.y != 0) ||
        (this.mainPlayer.x != this.cnv.width - this.mainPlayer.width) ||
        (this.mainPlayer.y != this.cnv.height - this.mainPlayer.height)) {
        return true;
    }
    return false;
  }

  enableControls() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', (e) => {
      this.keys[e.keyCode] = (e.type == "keydown");            
    })
  }
  
  // TODO: add diffrent action (depending on obstacle kind)
  componentsInteraction(component, obstacle) {   
    if (component === this.mainPlayer && obstacle.kind === "heathComponent") {
      component.healthPoints += obstacle.healthPoints;
      document.getElementById("mainPlayerHealthValue").innerText = component.healthPoints;
      obstacle.x = Math.floor(Math.random()*(this.cnv.width - obstacle.width));
      obstacle.y = Math.floor(Math.random()*(this.cnv.height - obstacle.height));
    } else if (component.kind === "bulletComponent" && obstacle.kind === "enemyComponent") {
      obstacle.healthPoints -= component.power;
      this.components.slice(findIndex(component),1);
      console.log(component)
    }
  }
  
  init() {
    document.body.appendChild(this.cnv);
    this.enableControls();
    document.getElementById("mainPlayerHealthValue").innerText = this.mainPlayer.healthPoints;
    document.getElementById("robbotox2000HealthPoints").innerText = this.components.filter((x)=>x.kind == "enemyComponent")[0].power;    
  }
}