
import HomePage from '../pages/home.f7.html';
import NotFoundPage from '../pages/404.f7.html';

import CreatePage from '../pages/create.f7.html';
import ReadPage from '../pages/read.f7.html';
import UpdatePage from '../pages/update.f7.html';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
  	path: '/create/',
  	component: CreatePage,
  },
  {
    path: '/read/:id/',
    component: ReadPage,
  },
  {
    path: '/update/:id/',
    component: UpdatePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;