import { queryStaff, changeStatus } from '@/services/staff';
const StaffModel = {
    namespace: 'staff',
    state: {
        staffData: [],
        total: 0,
    },
    effects: {
        *fetchStaff(_, { call, put }) {
            const response = yield call(queryStaff, _.payload);
            yield put({
                type: 'changeStaffData',
                payload: response,
            });
        },
        *fetchChangeStatus(_, { call, put }) {
            const response = yield call(changeStatus, _.payload.forms);
            yield put({
                type: 'fetchStaff',
                payload: _.payload.form,
            });
        },
    },
    reducers: {
        changeStaffData(state, action) {
            // console.log(action.payload);
            return {
                ...state,
                total: action.payload.data.total,
                staffData: action.payload.data.list
            };
        },
    },
};
export default StaffModel;
