import { produce } from "immer";

const initialState = {
 
}

export default function categories(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {

            default:
                return state;
                break;
        }
    })
}