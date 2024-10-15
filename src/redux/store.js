
import { configureStore } from "@reduxjs/toolkit"

import { default as app } from "./reducers/appReducer"
import { default as accounts } from "./reducers/accountsReducer"
import { default as categories } from "./reducers/categoriesReducer"
import { default as operations } from "./reducers/operationsReducer"

const store = configureStore({
    reducer: {
        app,
        accounts,
        categories,
        operations,
    },
})

export default store
