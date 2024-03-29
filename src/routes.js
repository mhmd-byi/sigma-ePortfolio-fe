import {
  Dashboard, Login, Portfolio, PortfolioForm, Register, Resume, ResumeForm, Subscribe,
} from './pages'
import MainForm from './pages/createTaskMultiStepForm/MultiStepForm'
import viewPortfolio from './pages/viewPortfolio'
import viewResume from './pages/viewResume'


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
    path: '/portfolio/new-portfolio',
    component: PortfolioForm,
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
  {
    path: '/resume/view-resume',
    component: viewResume,
    exact: true
  },
  {
    path: 'multi-step-form',
    component: MainForm,
    exact: true
  },
]