//import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import appStyles from '../app/app.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";


export default function AppHeader() {
  return (
      <header className={`${styles.header} p-4`}>
        <div className={appStyles.container}>  
          <nav className={styles.nav}> 
            <ul className={styles.nav__menu}>
              <li className={`${styles.nav__item} pl-5 pr-5 pt-2 pb-2`}>
                <NavLink 
                  exact to="/" className={`${styles.nav__link} text text_type_main-default ${styles.active}`}>
                    <BurgerIcon type="primary" />
                      <p>Конструктор</p>
                  </NavLink>                
              </li>
              <li className={`${styles.nav__item} pl-4 pr-4 pt-2 pb-2`}>
                <NavLink  
                  exact to="/orders" className={`${styles.nav__link} text text_type_main-default`}>
                    <ListIcon type="secondary" />
                      <p>Лента заказов</p>
                </NavLink>                 
              </li>
            </ul>
            <div className={styles.header__logo}>
              <Logo />
            </div>
            <NavLink  
                  exact to="/login" className={`${styles.login} text text_type_main-default pl-4 pr-4 pt-2 pb-2`}>
              <ProfileIcon type={"secondary"} />
                <span>Личный кабинет</span>
            </NavLink>  
          </nav>
        </div> 
      </header>
  );
}
