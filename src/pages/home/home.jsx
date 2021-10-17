import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';

export default function HomePage() {
    return (
        <>               
            <BurgerIngredients />                        
            <BurgerConstructor />                 
        </>
    );
}

