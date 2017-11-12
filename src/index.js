import _ from 'lodash';
import './styles/example.style.scss';


function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.className += "example";

  return element;
}

document.body.appendChild(component());