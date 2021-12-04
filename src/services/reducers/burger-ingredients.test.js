import { 
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED 
} from '../constants';
import { initialState, burgerIngredientsReducer } from '../reducers/burger-ingredients'

const result = [{
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0
 }, {
    "_id":"60666c42cc7b410027a1a9b6",
    "name":"Биокотлета из марсианской Магнолии",
    "type":"main",
    "proteins":420,
    "fat":142,
    "carbohydrates":242,
    "calories":4242,
    "price":424,
    "image":"https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v":0
 },  {
    "_id":"60666c42cc7b410027a1a9b7",
    "name":"Соус Spicy-X",
    "type":"sauce",
    "proteins":30,
    "fat":20,
    "carbohydrates":40,
    "calories":30,
    "price":90,
    "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v":0
 }]

describe('burger-ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(
            initialState
        )
    })
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(burgerIngredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual(
            { ...initialState, ingredientsRequest: true, ingredientsFailed: false, ingredients: [] }
        )
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(burgerIngredientsReducer(initialState, { type: GET_INGREDIENTS_FAILED })).toEqual(
            { ...initialState, ingredientsFailed: true, ingredientsRequest: false, ingredients: [] }
        )
    })
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(burgerIngredientsReducer(initialState, { type: GET_INGREDIENTS_SUCCESS, ingredients: result })).toEqual(
            { ...initialState, ingredientsFailed: false, ingredientsRequest: false, ingredients: result }
        )
    })
})