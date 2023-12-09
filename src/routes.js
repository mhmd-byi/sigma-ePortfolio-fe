import {
  Dashboard, Login, Portfolio, Register, Resume, Subscribe,
} from './pages'


export const routes = [
  {
    path: '/',
    component: Login,
    exact: true
  }, 
  {
    path: '/dashboard',
    component: Dashboard,
    exact: true
  }, 
  {
    path: '/register',
    component: Register,
    exact: true
  }, 
  {
    path: '/portfolio',
    component: Portfolio,
    exact: true
  }, 
  {
    path: '/resume',
    component: Resume,
    exact: true
  }, 
  {
    path: '/subscribe',
    component: Subscribe,
    exact: true
  }, 
]