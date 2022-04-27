import _ from 'lodash';
import './index.css';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello 00', 'webpack'], ' ');
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());