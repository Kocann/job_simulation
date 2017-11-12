import {Component} from './Component';

export class CofeeComponent extends Component {
  constructor(size, type, healthPoints = 20) {
    super(100, 100, size, size, type, "#000");
    this.kind = "heathComponent";
    this.imgSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Tea_cup_icon.svg/1024px-Tea_cup_icon.svg.png";
    this.healthPoints = healthPoints;
  }
}