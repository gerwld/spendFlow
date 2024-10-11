import { produce } from "immer";

const initialState = {
 
}

export default function operations(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {

            default:
                return state;
                break;
        }
    })
}