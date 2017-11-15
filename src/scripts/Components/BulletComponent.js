import {Component} from './Component';

export class BulletComponent extends Component {
  constructor(x, y, power, color = "yellow") {
    super(x, y, 4, 4, "bullet", color);
    this.movingX = 2;
    this.power = 30;
    this.healthPoints = 0;
    this.kind = "bulletComponent";
  }
}