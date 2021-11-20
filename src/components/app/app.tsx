import { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { HomePage, NotFound404, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, FeedPage} from '../../pages';
import { getIngredients } from "../../services/funcs";
import { ProtectedRoute } from "../../utils/funcs";
import { TLocationState } from '../../utils/prop-types';
import { useDispatch } from '../../services/types';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import FeedDetails from "../feed-details/feed-details";

export default function App() {
    const location = useLocation<TLocationState>();
    const history = useHistory();
    const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);  

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
                            <ProtectedRoute exact path={"/profile/orders/:id"}><FeedDetails /></ProtectedRoute>                            
                            <Route exact path={"/ingredients/:id"} component={ IngredientDetails } />
                            <Route exact path={"/feed"} component={ FeedPage } />         
                            <Route exact path={"/feed/:id"} component={ FeedDetails } />                     
                            <Route exact path="/" component={ HomePage } />                                          
                            <Route exact path="" component={ NotFound404 } />                       
                        </Switch>
                        {background &&
                            (<>
                                <Route path={'/ingredients/:id'} children={
                                    <Modal><IngredientDetails/></Modal>
                                } />                                
                                <Route path={'/sendOrder'} children={ 
                                    <Modal><OrderDetails /></Modal>
                                } />  
                                <Route path={'/feed/:id'} children={
                                    <Modal><FeedDetails /></Modal>
                                } />
                                <ProtectedRoute path={'/profile/orders/:id'} children={
                                    <Modal><FeedDetails /></Modal>
                                } />                                  
                            </>)
                        }                           
                    </div>                    
                </div>                
            </main>       
        </div>
    );
}
