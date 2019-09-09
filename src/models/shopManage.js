import { queryShop } from '@/services/shopManage';
const ShopModel = {
    namespace: 'shopManage',
    state: {
        shopData: [],
        total: 0,
    },
    effects: {
        *fetchShop(_, { call, put }) {
            const response = yield call(queryShop, _.payload);
            yield put({
                type: 'changeShopData',
                payload: response,
            });
        },
    },
    reducers: {
        changeShopData(state, action) {
            // console.log(action.payload);
            return {
                ...state,
                total: action.payload.data.total,
                shopData: action.payload.data.list
            };
        },
    },
};
export default ShopModel;
