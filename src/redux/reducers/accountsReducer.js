import { produce } from "immer";
import { ADD_ACCOUNT } from "@actions/accountsActions";

const initialState = {
        isInit: false,
        items: {
          '11ca139d-f3f7-4adf-b45f-a37d27e716f2': {
            title: 'ING Account',
            icon: 'Receipt',
            color: '#FF6633',
            type: 'ACCOUNT_TYPE_DEBIT',
            id: '11ca139d-f3f7-4adf-b45f-a37d27e716f2'
          },
          '050368d1-07a1-4ef3-ac07-18d6d5f54026': {
            title: 'PayPal',
            icon: 'Globe',
            color: '#4DB3FF',
            type: 'ACCOUNT_TYPE_DEBIT',
            id: '050368d1-07a1-4ef3-ac07-18d6d5f54026'
          },
          '794e1eac-f08c-49aa-9315-4ce52b18aef0': {
            title: 'On new car',
            icon: 'Car',
            color: '#1AB399',
            type: 'ACCOUNT_TYPE_DEBIT',
            id: '794e1eac-f08c-49aa-9315-4ce52b18aef0'
          },
          '93e354f7-5be7-4d2e-a838-6445063ee70a': {
            title: 'Debt (general)',
            icon: 'Calculator',
            color: '#66664D',
            type: 'ACCOUNT_TYPE_DEBT',
            id: '93e354f7-5be7-4d2e-a838-6445063ee70a'
          }
        },
        itemsIdsArray: [
            '11ca139d-f3f7-4adf-b45f-a37d27e716f2',
            '050368d1-07a1-4ef3-ac07-18d6d5f54026',
            '794e1eac-f08c-49aa-9315-4ce52b18aef0',
            '93e354f7-5be7-4d2e-a838-6445063ee70a',
        ]
}



export default function accounts(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
          case "SET_ACCOUNTS_INIT":
            draft.isInit = action.payload;
            break;
          case "ACCOUNTS_SATURATE_FROM_STORAGE":
              draft.items = action.items;
              draft.itemsIdsArray = action.itemsIdsArray;
              break;
            case ADD_ACCOUNT:
                draft.items[action.payload.id] = action.payload;
                draft.itemsIdsArray.push(action.payload.id);
                break;
            default:
                return state;
                break;
        }
    })
}