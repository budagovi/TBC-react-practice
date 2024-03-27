import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//router imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StorePage from './pages/StorePage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import BlogsPage from './pages/BlogsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <div>home</div>
      },
      {
        path: 'store',
        element: <StorePage />
      },
      {
        path: 'about',
        element: <div>about</div>
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'reviews',
        element: <BlogsPage/>
      },
      {
        path: 'cart',
        element: <div>cart</div>
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
