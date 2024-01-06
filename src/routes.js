import {
  Dashboard, Login, Portfolio, Register, Resume, ResumeForm, Subscribe,
} from './pages'
import viewPortfolio from './pages/viewPortfolio'


export const routes = [
  {
    path: '/',
    component: Login,
    exact: true
  },
  {
    path: '/login',
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
  {
    path: '/resume/new-resume',
    component: ResumeForm,
    exact: true
  },
  {
    path: '/portfolio/view-portfolio',
    component: viewPortfolio,
    exact: true
  },
]