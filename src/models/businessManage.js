import { queryBusines } from '@/services/businessManage';
const BusinesModel = {
    namespace: 'business',
    state: {
        businesData: [],
        total: 0,
    },
    effects: {
        *fetchBusines(_, { call, put }) {
            console.log(_)
            const response = yield call(queryBusines, _.payload);
            yield put({
                type: 'changeBusinesData',
                payload: response,
            });
        },
    },
    reducers: {
        changeBusinesData(state, action) {
            console.log(action);
            return {
                ...state,
                total: action.payload.data.total,
                businesData: action.payload.data.list
            };
        },
    },
};
export default BusinesModel;
