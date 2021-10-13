import styles from './home.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';

export default function HomePage() {
    return (
        <div className={`${styles.container} pl-5 pr-5`}>
            <div className={styles.main__container}>                    
                <BurgerIngredients />                        
                <BurgerConstructor />
            </div>                    
        </div>
    );
}

