import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

//import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home/home';
import NotFound404 from '../../pages/not-found/not-found';
import LoginPage from '../../pages/auth/login/login';
import RegisterPage from '../../pages/auth/register/register';
import ForgotPasswordPage from '../../pages/auth/forgot-password/forgot-password';

export default function App() {
    const location = useLocation();
    const history = useHistory();
    const background = history.action === 'PUSH' && location.state && location.state.background;

    return (
        <div>
            <AppHeader />
            <main>
                <Switch location={background || location}>                   
                    <Route exact path="/login" component={ LoginPage } />          
                    <Route exact path="/register" component={ RegisterPage } /> 
                    <Route exact path="/forgot-password" component={ ForgotPasswordPage } />                                                           
                    <Route exact path="/" component={ HomePage } />                     
                    <Route component={ NotFound404 } />                                                                                       
                </Switch>
            </main>
        </div>
    );
}
