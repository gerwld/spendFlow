import { produce } from "immer";
import { ADD_OPERATION } from "actions/operationsActions";

const initialState = {
    items: {},
    itemsIdsArray: []
}

export default function operations(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case ADD_OPERATION:
                draft.items[action.payload.id] = action.payload;
                draft.itemsIdsArray.push(action.payload.id);
                break;
            default:
                return state;
                break;
        }
    })
}