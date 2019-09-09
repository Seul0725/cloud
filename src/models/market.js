import { queryMarket, saveOrUpdateMarket } from '@/services/market';
const MarketModel = {
    namespace: 'market',
    state: {
        marketData: [],
        total: 0,
    },
    effects: {
        *fetchMarket(_, { call, put }) {
            const response = yield call(queryMarket, _.payload);
            yield put({
                type: 'changeMarketData',
                payload: response,
            });
        },
        *saveMarket(_, { call, put }) {
            const response = yield call(saveOrUpdateMarket, _.payload.forms);
            yield put({
                type: 'fetchMarket',
                payload: _.payload.page,
            });
        },
    },
    reducers: {
        changeMarketData(state, action) {
            // console.log(action.payload);
            return {
                ...state,
                total: action.payload.data.total,
                marketData: action.payload.data.list
            };
        },
    },
};
export default MarketModel;
