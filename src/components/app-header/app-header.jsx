import React from 'react';
import appHeaderStyles from './app-header.module.css';
import appStyles from '../app/app.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  return (
      <header className={`${appHeaderStyles.header} p-4`}>
        <div className={appStyles.container}>  
          <nav className={appHeaderStyles.nav}> 
            <ul className={appHeaderStyles.nav__menu}>
              <li className={`${appHeaderStyles.nav__item} pl-5 pr-5 pt-2 pb-2`}>
                <a href='/constructor' className={`${appHeaderStyles.nav__link} text text_type_main-default ${appHeaderStyles.active}`}>
                  <BurgerIcon type="primary" />
                    <p>Конструктор</p>
                </a>
              </li>
              <li className={`${appHeaderStyles.nav__item} pl-4 pr-4 pt-2 pb-2`}>
                <a href='/orders' className={`${appHeaderStyles.nav__link} text text_type_main-default`}>
                  <ListIcon type="secondary" />
                    <p>Лента заказов</p>
                </a>
              </li>
            </ul>
            <div className={appHeaderStyles.header__logo}>
              <Logo />
            </div>
            <a href="/login" className={`${appHeaderStyles.login} text text_type_main-default pl-4 pr-4 pt-2 pb-2`}>
              <ProfileIcon type={"secondary"} />
                <span>Личный кабинет</span>
            </a>
          </nav>
        </div> 
      </header>
  );
}
