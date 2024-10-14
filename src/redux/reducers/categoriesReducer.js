import { produce } from "immer";
import { ADD_CATEGORY } from "actions/categoriesActions";

const initialState = {
    items: Object.create(null),
    itemsIdsArray: []
}

export default function categories(state = initialState, action) {    
    return produce(state, draft => {
        switch (action.type) {
            case ADD_CATEGORY:             
                draft.items[action.payload.id] = action.payload;
                draft.itemsIdsArray.push(action.payload.id);
                break;
            default:
                return state;
                break;
        }
    })
}