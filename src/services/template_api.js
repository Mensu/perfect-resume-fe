import { api } from './api';

class TemplateAPI {
  /**
   * @return {Promise<Template[]>}
   */
  async getTemplates() {
    return [{
      templateId: 1,
      name: 'C++工程师简历',
      description: '精通C++20',
      rating: 4.6,
      myRating: 5,
      user: {
        userId: 1,
        nickname: '用户1',
      },
    }, {
      templateId: 2,
      name: 'Java工程师简历',
      description: '精通Java8',
      rating: 4.5,
      myRating: null,
      user: {
        userId: 2,
        nickname: '用户2',
      },
    }, {
      templateId: 3,
      name: 'C++工程师简历',
      description: '精通C++20',
      rating: 3.2,
      myRating: 3,
      user: {
        userId: 1,
        nickname: '用户1',
      },
    }, {
      templateId: 4,
      name: 'Java工程师简历',
      description: '精通Java8',
      rating: 4.5,
      myRating: null,
      user: {
        userId: 2,
        nickname: '用户2',
      },
    }, {
      templateId: 5,
      name: 'C++工程师简历',
      description: '精通C++20',
      rating: 5,
      myRating: 5,
      user: {
        userId: 1,
        nickname: '用户1',
      },
    }, {
      templateId: 6,
      name: 'Java工程师简历',
      description: '精通Java8',
      rating: 2,
      myRating: null,
      user: {
        userId: 2,
        nickname: '用户2',
      },
    }, {
      templateId: 7,
      name: 'C++工程师简历',
      description: '精通C++20',
      rating: 4.6,
      myRating: 5,
      user: {
        userId: 1,
        nickname: '用户1',
      },
    }];
  }
}

export const template_api = new TemplateAPI();
