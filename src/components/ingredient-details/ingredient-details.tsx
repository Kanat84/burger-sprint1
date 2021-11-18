import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from './ingredient-details.module.css';
import {TBurgerIngredientProps, TIngredientDetailsProps} from "../../utils/prop-types";

export default function IngredientDetails() {
    const { ingredients, ingredientDetails }: any = useSelector<any>(state => state.burgerIngredients);
    const { id } = useParams<TIngredientDetailsProps>();
    let ingredient;

    function isEmptyObj(obj: {}) {
        for (var key in obj) {
            return false;
        }
        return true;
    }    
    if (!isEmptyObj(ingredientDetails)) {
        ingredient = ingredientDetails;
    } else {
        ingredient = ingredients.find((item: TBurgerIngredientProps) => item._id === id);
    }
    return (        
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto'}}>
            {isEmptyObj(ingredientDetails) && (
                <h1 className={`${style.title}  mt-30 text text_color_primary text_type_main-large`}>Детали ингредиента</h1>
            )}
            {ingredient && ( 
                <div className={style.body}>
                    <img src={ingredient?.image_large} alt={ingredient?.name} className="mb-4" />
                    <p className={`${style.title} text text_type_main-medium mb-8`}>{ingredient?.name}</p>        
                    <div className={`${style.card}`}>
                        <div className={`${style.text} mr-5`}>
                            <p className="text text_type_main-default">Калории, ккал</p>
                            <p className="text text_type_digits-default">{ingredient?.calories}</p>
                        </div>
                        <div className={`${style.text} mr-5`}>
                            <p className="text text_type_main-default">Белки, г</p>
                            <p className="text text_type_digits-default">{ingredient?.proteins}</p>
                        </div>
                        <div className={`${style.text} mr-5`}>
                            <p className="text text_type_main-default">Жиры, г</p>
                            <p className="text text_type_digits-default">{ingredient?.fat}</p>
                        </div>
                        <div className={`${style.text} mr-5`}>
                            <p className="text text_type_main-default">Углеводы, г</p>
                            <p className="text text_type_digits-default">{ingredient?.carbohydrates}</p>
                        </div>
                    </div>                    
                </div>
            )}
        </div>        
    );
};
