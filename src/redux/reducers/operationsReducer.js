import { produce } from "immer";
import { ADD_OPERATION, EDIT_OPERATION, DELETE_OPERATION } from "@actions/operationsActions";

const initialState = {
    isInit: false,
    items: {},
    itemsIdsArray: []
}

export default function operations(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case "SET_OPERATIONS_INIT":
                draft.isInit = action.payload;
                break;
            case "OPERATIONS_SATURATE_FROM_STORAGE":
                draft.items = action.items;
                draft.itemsIdsArray = action.itemsIdsArray;
                break;
            case ADD_OPERATION:
                draft.items[action.payload.id] = action.payload;
                draft.itemsIdsArray.unshift(action.payload.id);
                break;
            case EDIT_OPERATION: 
                draft.items[action.id] = action.payload;
                break;
            case DELETE_OPERATION:
                delete draft.items[action.id]
                const index = draft.itemsIdsArray.indexOf(action.id);
                if (index > -1) 
                    draft.itemsIdsArray.splice(index, 1);
                break;
            default:
                return state;
                break;
        }
    })
}