import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { HomePage, NotFound404, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage} from '../../pages';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ProtectedRoute } from "../../utils/funcs";


export default function App() {
    const location = useLocation();
    const history = useHistory();
    const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;

    return (
        <div>
            <AppHeader />
            <main>
                <div className={`${styles.container} pl-5 pr-5`}>
                    <div className={styles.main__container}>                
                        <Switch location={background || location}>                   
                            <Route exact path="/login" component={ LoginPage } />          
                            <Route exact path="/register" component={ RegisterPage } /> 
                            <Route exact path="/forgot-password" component={ ForgotPasswordPage } /> 
                            <Route exact path="/reset-password" component={ ResetPasswordPage } />                     
                            <ProtectedRoute exact path="/profile"><ProfilePage /></ProtectedRoute>
                            <Route exact path={"/ingredients/:id"} component={ IngredientDetails } />
                            <Route exact path="/" component={ HomePage } />                                          
                            <Route exact path="" component={ NotFound404 } />                       
                        </Switch>                                     
                    </div>                    
                </div>                
            </main>       
        </div>
    );
}
