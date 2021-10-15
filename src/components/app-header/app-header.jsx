import { useSelector } from "react-redux";
import { NavLink, useRouteMatch } from 'react-router-dom';
import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  const { isAuth } = useSelector(state => state.usersData);
  const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  const isProfile = !!useRouteMatch('/profile');
  const isLogin = !!useRouteMatch('/login');
  const isOrder = !!useRouteMatch('/orders');  
  const isIngredient = !!useRouteMatch('/ingredients/:id');  
  console.log(isConstructor, isIngredient) 

  return (
      <header className={`${styles.header} p-4`}>
        <div className={styles.container}>  
          <nav className={styles.nav}> 
            <ul className={styles.nav__menu}>
              <li className={`${styles.nav__item} pl-5 pr-5 pt-2 pb-2`}>
                <NavLink exact to="/" className={`${styles.nav__link} ${(isConstructor || isIngredient) ? styles.nav__linkActive : ''} text text_type_main-default`}>
                    <BurgerIcon type={(isConstructor || isIngredient) ? "primary" : "secondary"} />
                      <p>Конструктор</p>
                  </NavLink>                
              </li>
              <li className={`${styles.nav__item} pl-4 pr-4 pt-2 pb-2`}>
                <NavLink exact to="/orders" activeClassName={styles.nav__linkActive} className={`${styles.nav__link} text text_type_main-default`}>
                    <ListIcon type={isOrder ? "primary" : "secondary"} />
                      <p>Лента заказов</p>
                </NavLink>                 
              </li>
            </ul>
            <div className={styles.header__logo}>
              <NavLink exact to="/" activeClassName={styles.nav__linkActive} className={`${styles.nav__link} ${styles.nav__linkActive} text text_type_main-default`}>              
                <Logo />
              </NavLink>               
            </div>           
            {isAuth ? (
                <NavLink exact to={"/profile"} activeClassName={styles.nav__linkActive} className={`${styles.nav__link} ${isProfile ? styles.nav__linkActive : ''} text text_type_main-default pl-4 pr-4 pt-2 pb-2`}>
                  <ProfileIcon type={isProfile ? "primary" : "secondary"} />
                    <span>Профиль</span>
                </NavLink>
            ) : (
                <NavLink exact to={"/login"} activeClassName={styles.nav__linkActive} className={`${styles.nav__link} text text_type_main-default pl-4 pr-4 pt-2 pb-2`}>
                  <ProfileIcon type={isLogin ? "primary" : "secondary"} />
                    <span>Личный кабинет</span>
                </NavLink>
            )}
          </nav>
        </div> 
      </header>
  );
}
