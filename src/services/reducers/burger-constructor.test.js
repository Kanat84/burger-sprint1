import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR, 
    MOVE_INGREDIENT_IN_CONSTRUCTOR, 
    CLEAR_CONSTRUCTOR,
} from '../constants';
import { initialState, constructorReducer } from "./burger-constructor";

const item0 = {
    ingredient: 0,
    _id: 0,
    uuid: "0"
}

const item1 = {
    ingredients: 1,
    _id: 1,
    uuid: "1"
}

describe('constructorReducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(
            initialState        
        )
    })
    it('should handle ADD INGREDIENT TO CONSTRUCTOR', () => {
        expect(constructorReducer(initialState, {type: ADD_INGREDIENT_TO_CONSTRUCTOR, item: item1})).toEqual(
            { ...initialState, ingredients: [item1] }
        )
    })
    it('should handle ADD BUN TO CONSTRUCTOR', () => {
        expect(constructorReducer(initialState, {type: ADD_BUN_TO_CONSTRUCTOR, item: item0 })).toEqual(
            { ...initialState, bun: item0 }
        )
    })    
    it('should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR', () => {
        expect(constructorReducer({...initialState, ingredients: [item0, item1]}, {type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR, id: "1"})).toEqual(
            { ...initialState, ingredients: [item0] }
        )
    })
    it('should handle MOVE_INGREDIENT_TO_CONSTRUCTOR', () => {
        expect(constructorReducer({...initialState, ingredients: [item0, item1]}, {type: MOVE_INGREDIENT_IN_CONSTRUCTOR, dragIndex: 0, hoverIndex: 1})).toEqual(
            { ...initialState, ingredients: [item1, item0] }
        )
    })
    it('should handle CLEAR CONSTRUCTOR', () => {
        expect(constructorReducer({ ...initialState, ingredients: [item0, item1] }, { type: CLEAR_CONSTRUCTOR })).toEqual(
            initialState
        )
    })
})