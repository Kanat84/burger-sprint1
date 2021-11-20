/*import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);

export default store;*/

import { rootReducer } from "./reducers";
import { wsMiddleWare } from "./middleware/wsMiddleWare";
import { configureStore } from "@reduxjs/toolkit";
import { wsActions } from "./actions/ws";

const orderMiddleWare = wsMiddleWare(wsActions)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(orderMiddleWare)
  }
})

export default store;