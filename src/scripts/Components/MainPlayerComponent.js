import {Component} from './Component';

export class MainPlayerComponent extends Component {
  constructor(width, height, color = "#dd0000") {
    super(30,30, width, height, "block", color);
    this.imgSrc = "https://d30y9cdsu7xlg0.cloudfront.net/png/12133-200.png";
    this.healthPoints = 10;
  }
  
  countHealth(otherComponent) {
    return this.healthPoints += otherComponent.healthPoints
  }
}