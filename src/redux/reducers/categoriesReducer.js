import { produce } from "immer";
import { ADD_CATEGORY } from "@actions/categoriesActions";

const initialState = {
    items: {
        "95a6885b-64ab-468c-9334-62c4095df459": { title: 'Entertainment', icon: "Popcorn", color: '#ff3939', type: "CATEGORY_TYPE_EXPENSES" },
        "b592f039-b4d6-420a-b731-0964172ed142": { title: 'Groceries', icon: "Apple", color: '#3988ff', type: "CATEGORY_TYPE_EXPENSES" },
        "565d778b-c046-45aa-ad3f-030a8637ab3e": { title: 'Education', icon: "BookHeart", color: '#ff8c39', type: "CATEGORY_TYPE_EXPENSES" },
        "82b12426-3e5e-4bc1-a4b5-f5cce2f8ccd3": { title: 'Transport', icon: "BusFront", color: '#39ff6e', type: "CATEGORY_TYPE_EXPENSES" },
        "f6f45a3c-4317-477d-8702-1bf9078d8717": { title: 'Savings', icon: "Landmark", color: '#3999ff', type: "CATEGORY_TYPE_EXPENSES" },
        "974e8c37-9ddd-43c9-bd51-c5bd082c4f79": { title: 'Pets', icon: "Cat", color: '#decd36', type: "CATEGORY_TYPE_EXPENSES" },
        "86d4fc4a-27e7-4158-9739-d642c7de0d6e": { title: 'Debt Payments', icon: "ArrowBigDownDash", color: '#ff39ff', type: "CATEGORY_TYPE_EXPENSES" },
        "f70bf064-8782-4c7b-87e0-5f61d8d784c7": { title: 'Insurance', icon: "ShieldCheck", color: '#31e2cd', type: "CATEGORY_TYPE_EXPENSES" },
        "4209d0ac-115e-4cd5-b095-620dcb146e2c": { title: 'Subscriptions', icon: "EthernetPort", color: '#6147f5', type: "CATEGORY_TYPE_EXPENSES" },
        "171f8c71-c076-46a2-82c1-12eed9c81c7c": { title: 'Salary', icon: "Wallet", color: '#47b5f5', type: "CATEGORY_TYPE_INCOMES" },
    },
    itemsIdsArray: [
        "95a6885b-64ab-468c-9334-62c4095df459",
        "b592f039-b4d6-420a-b731-0964172ed142",
        "565d778b-c046-45aa-ad3f-030a8637ab3e",
        "82b12426-3e5e-4bc1-a4b5-f5cce2f8ccd3",
        "f6f45a3c-4317-477d-8702-1bf9078d8717",
        "974e8c37-9ddd-43c9-bd51-c5bd082c4f79",
        "86d4fc4a-27e7-4158-9739-d642c7de0d6e",
        "f70bf064-8782-4c7b-87e0-5f61d8d784c7",
        "4209d0ac-115e-4cd5-b095-620dcb146e2c",
        "171f8c71-c076-46a2-82c1-12eed9c81c7c"
    ]
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