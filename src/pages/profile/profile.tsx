import { Switch, Route, NavLink, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styles from "./profile.module.css";
import { postLogout } from "../../services/funcs";
import { useDispatch } from '../../services/types';
import { TLocationState } from '../../utils/prop-types';
import ProfileOptions from '../../components/profile-options/profile-options'
import ProfileOrders from '../../components/profile-orders/profile-orders'

export default function ProfilePage() {
    //const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<TLocationState>();
    const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background; 
    const isProfile = !!useRouteMatch({ path: '/profile', exact: true });
    const isOrders = !!useRouteMatch({ path: '/profile/orders', exact: true });

    function handleClick() {
        dispatch(postLogout(history));
    }
    return (
        <>
            <div className={`${styles.container} mt-30 `}>
                <div className={styles.cont}>
                    <ul className={`${styles.menu} mr-15`}>
                        <li className={`${styles.menuItem} text text_type_main-medium text_color_inactive`}>
                            <NavLink className={`${styles.nav__link} ${isProfile ? styles.nav__linkActive : ''}`}
                                exact to={`/profile`}>Профиль
                            </NavLink>
                        </li>
                        <li className={`${styles.menuItem} text text_type_main-medium text_color_inactive`}>
                            <NavLink className={`${styles.nav__link} ${isOrders ? styles.nav__linkActive : ''}`}
                                exact to={`/profile/orders`}>История заказов
                            </NavLink>
                        </li>
                        <li className={`${styles.menuItem} text text_type_main-medium text_color_inactive`} onClick={handleClick}>
                            <NavLink className={"text_color_inactive"} activeClassName={"text_color_primary"}
                                exact to={`/login`}>Выход
                            </NavLink>
                        </li>
                    </ul>
                    <p className={`${styles.menuSubtitle} mt-20 text text_type_main-default text_color_inactive`}>
                        {isOrders ?
                            ('В этом разделе вы можете просмотреть свою историю заказов')
                            :
                            ('В этом разделе вы можете изменить свои персональные данные')                      
                        }
                    </p>
                </div> 
            </div>         
            <Switch location={background || location}>
                <Route exact path={`/profile`} component={ ProfileOptions } />
                <Route exact path={`/profile/orders`} component={ ProfileOrders } />
            </Switch>
        </>    
    )
}