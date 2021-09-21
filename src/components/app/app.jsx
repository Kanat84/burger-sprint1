import React, { useState, useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
//import data from '../../utils/data';

export default function App() {
    const apiURL = 'https://norma.nomoreparties.space/api/ingredients';
    const [state, setState] = useState({ isLoading: false, isError: false, dataIngredients: [] })

    useEffect(() => {
        fetch(apiURL)
          .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
          })
          .then((res) => {
            setState(prevState => ({ ...prevState, dataIngredients: res.data, isLoading: false, isError: false }))
            
          })
          .catch((error) => {
            setState(prevState => ({ ...prevState, dataIngredients: prevState.dataIngredients, isLoading: false, isError: true }))  
          })
        
      }, []);

    return (
        <div>
            <AppHeader />
            <main>
                <div className={`${appStyles.container} pl-5 pr-5`}>
                    <div className={appStyles.main__container}>
                       <BurgerIngredients ingredients={state.dataIngredients} />                        
                       <BurgerConstructor ingredients={state.dataIngredients} />
                    </div>                    
                </div>
            </main>
        </div>
    );
}


