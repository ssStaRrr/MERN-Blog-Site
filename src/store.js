import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReduver from "./reducers/rootReducer";

const store = createStore(rootReduver, {}, compose(
    applyMiddleware(thunk),
    composeWithDevTools()
))

export default store;