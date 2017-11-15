import {Component} from './Component';

export class BulletComponent extends Component {
  constructor(x, y, power, color = "black") {
    super(x, y, 4, 4, "bullet", color);
    this.movingX = 4;
    this.power = 10;
    this.healthPoints = 0;
    this.kind = "bulletComponent";
  }
}