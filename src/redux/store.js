
import { configureStore } from "@reduxjs/toolkit"

import { default as habits } from "./reducers/habitsReducer"
import { default as app } from "./reducers/appReducer"
import { default as categories } from "./reducers/categoriesReducer"
import { default as operations } from "./reducers/operationsReducer"

const store = configureStore({
    reducer: {
        app,
        habits,
        categories,
        operations
    },
})

export default store
