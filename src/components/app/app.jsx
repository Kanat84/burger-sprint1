import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { data } from '../../utils/data';

export default function App() {
    return (
        <div className="">
            <AppHeader />
            <main>
                <div className={`${appStyles.container} pl-5 pr-5`}>
                    <div className={appStyles.main__container}>
                       <BurgerIngredients ingredients={data} />                        
                       <BurgerConstructor ingredients={data} />
                    </div>                    
                </div>
            </main>
        </div>
    );
}


