import { api } from './api';

class TemplateAPI {
  async getTemplates() {
    return [{
      image: '/favicon.ico',
      title: 'Breakfast',
      author: 'Myron',
    }, {
      image: '/favicon.ico',
      title: 'Burger',
      author: 'Linyu',
    }, {
      image: '/favicon.ico',
      title: 'Camera',
      author: 'ruolin',
    }, {
      image: '/favicon.ico',
      title: 'Hats',
      author: 'kakali',
    }, {
      image: '/favicon.ico',
      title: 'Honey',
      author: 'yuyang',
    }, {
      image: '/favicon.ico',
      title: 'Morning',
      author: 'mokayi',
    }, {
      image: '/favicon.ico',
      title: 'Vegetables',
      author: 'NUyyyyyyy',
    }, {
      image: '/favicon.ico',
      title: 'water',
      author: 'TDDyyyyyyy',
    }];
  }
}

export const template_api = new TemplateAPI();
