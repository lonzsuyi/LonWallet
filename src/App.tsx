import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Any default
import globalConstants from './constants/globalConfig';

// Data
import { useAppSelector } from './app/hooks';
import { AuthState, selectAuth } from './app/slices/authSlice';

// Base componnent
import LazyLoading from './components/LazyLoading/LazyLoading';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';

// Route page
// const Home = React.lazy(() => import('./routes/Home/Home'));
const NoFound = React.lazy(() => import('./routes/NoFound/NoFound'));
const Login = React.lazy(() => import('./routes/Login/Login'));
const Dashboard = React.lazy(() => import('./routes/Dashboard/Dashboard'));

function App() {
  // Auth handle
  const auth: AuthState = useAppSelector(selectAuth);
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    if (!auth.token) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to={globalConstants.ROUTES.LOGIN} state={{ from: location }} replace />;
    }
    return children;
  }

  return (
    <React.Fragment>
      <div className="root">
        <Router>
          <div className="content-container">
            {
              auth.token ? <Menu></Menu> : null
            }
            <div className={`page-content ${auth?.token ? '' : ' hide-menu'}`}>
              {
                auth.token ? <Header /> : null
              }

              <React.Suspense fallback={< LazyLoading />}>
                <Routes>
                  <Route path={globalConstants.ROUTES.HOME} element={<Navigate to={globalConstants.ROUTES.LOGIN} />} />
                  <Route path={globalConstants.ROUTES.LOGIN} element={<Login />} />
                  <Route path={globalConstants.ROUTES.DASHBOARD} element={<RequireAuth><Dashboard /></RequireAuth>} />
                  <Route path={globalConstants.ROUTES.NOFOUND} element={<NoFound />} />
                </Routes>
              </React.Suspense>

            </div>
          </div>
        </Router>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;
