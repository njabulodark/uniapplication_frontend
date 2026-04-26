import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy loaded pages
const Login = lazy(() => import('./pages/Login.tsx'));
const Signup = lazy(() => import('./pages/Signup.tsx'));
const Faq = lazy(() => import('./pages/Faq.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const Payment = lazy(() => import('./pages/Payment.tsx'));
const Confirm = lazy(() => import('./pages/Confirm.tsx'));
const MyApplication = lazy(() => import('./pages/MyApplication.tsx'));
const Personal = lazy(() => import('./pages/MyApplications/Personal.tsx'));
const Contact = lazy(() => import('./pages/MyApplications/Contact.tsx'));
const Additional = lazy(() => import('./pages/MyApplications/Additional.tsx'));
const Guadian = lazy(() => import('./pages/MyApplications/Guadian.tsx'));
const Nwu = lazy(() => import('./pages/MyApplications/Nwu.tsx'));
const Uj = lazy(() => import('./pages/MyApplications/Uj.tsx'));
const Uwc = lazy(() => import('./pages/MyApplications/Uwc.tsx'));
const Subjects = lazy(() => import('./pages/MyApplications/Subjects.tsx'));
const Cao = lazy(() => import('./pages/MyApplications/Cao.tsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const PasswordReset = lazy(() => import('./pages/PasswordReset.tsx'));
const UpdatePassword = lazy(() => import('./pages/UpdatePassword.tsx'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Wrapper for lazy components
const LazyComponent = ({ component: Component }: { component: React.LazyExoticComponent<React.ComponentType<any>> }) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <LazyComponent component={About} />,
  },
  {
    path: "/payment",
    element: <LazyComponent component={Payment} />,
  },
  {
    path: "/confirm",
    element: <LazyComponent component={Confirm} />,
  },
  {
    path: "/login",
    element: <LazyComponent component={Login} />,
  },
  {
    path: "/signup",
    element: <LazyComponent component={Signup} />,
  },
  {
    path: "/forgot-password",
    element: <LazyComponent component={ForgotPassword} />,
  },
  {
    path: "/password-reset",
    element: <LazyComponent component={PasswordReset} />,
  },
  {
    path: "/update-password",
    element: <LazyComponent component={UpdatePassword} />,
  },
  {
    path: "/my_application",
    element: <LazyComponent component={MyApplication} />,
  },
  {
    path: "/application/course/cao",
    element: <LazyComponent component={Cao} />,
  },
  {
    path: "/application",
    element: <LazyComponent component={MyApplication} />,
  },
  {
    path: "/application/course/nwu",
    element: <LazyComponent component={Nwu} />,
  },
  {
    path: "/application/course/uwc",
    element: <LazyComponent component={Uwc} />,
  },
  {
    path: "/application/course/uj",
    element: <LazyComponent component={Uj} />,
  },
  {
    path: "/application/course/Additional",
    element: <LazyComponent component={Additional} />,
  },
  {
    path: "/application/course/contact",
    element: <LazyComponent component={Contact} />,
  },
  {
    path: "/application/course/guadian",
    element: <LazyComponent component={Guadian} />,
  },
  {
    path: "/application/course/personal",
    element: <LazyComponent component={Personal} />,
  },
  {
    path: "/application/course/subjects",
    element: <LazyComponent component={Subjects} />,
  },
  {
    path: "/Faq",
    element: <LazyComponent component={Faq} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <RouterProvider router={router} />
);
