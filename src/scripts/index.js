// import { qs, qsa, $on, $delegate } from './utils';

import '../stylesheets/style.scss';
import DinamicBarMenu from './components/DinamicBarMenu';


document.addEventListener('DOMContentLoaded', () => {
  let DinamicBarMenuCollection = document.querySelectorAll('.dinamic-bar-menu');

  DinamicBarMenuCollection.forEach(element => {
  	new DinamicBarMenu(element);
  });
});

// console.log('Hello!');
//
