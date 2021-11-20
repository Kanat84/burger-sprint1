import { useParams, useLocation, useHistory } from "react-router-dom";
import style from './ingredient-details.module.css';
import { TIngredientDetailsProps } from "../../utils/prop-types";
import { RootState, useSelector } from '../../services/types';
import { TLocationState } from '../../utils/prop-types';

export default function IngredientDetails() {
    const { ingredients } = useSelector((state: RootState) => state.burgerIngredients);
    const { id } = useParams<TIngredientDetailsProps>();
    const ingredient = ingredients.find((item) => item._id === id);
    const location = useLocation<TLocationState>();
    const history = useHistory();
    const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;
    return (  
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto'}}>                
            <h1 className={`${style.title} ${!background && 'mt-30'} text text_color_primary text_type_main-large`}>Детали ингредиента</h1>                       
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
