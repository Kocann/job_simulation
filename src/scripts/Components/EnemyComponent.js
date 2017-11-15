import {Component} from './Component';

export class EnemyComponent extends Component {
  constructor(x, y, speed, power = 150, type = "block"){
   super(
     x,
     y,
     100,
     100,
     type,
     "#dd0000"
   );
    this.kind = "enemyComponent";
    this.power = power;
    this.healthPoints = power * -1;
    this.movingX = speed;
    this.movingY = speed;
  }
}