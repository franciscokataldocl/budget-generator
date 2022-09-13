import { configureStore } from "@reduxjs/toolkit";
import {credentials} from './slices/credentials';
import { budgets } from './slices/budget';


export default configureStore({
    reducer:{
        credentials,
        budgets
    }
})