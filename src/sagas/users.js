import {takeEvery, call, fork, put, takeLatest, take} from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

//worker sage
function* getUsers(){
    try{
        const result = yield call(api.getUsers);
        console.log(result);
        //dispatch success action
        yield put(actions.getUsersSuccess({
            items: result.data.data
        }));
    }catch (e) {
        console.log(e);
        yield put(actions.usersError({
            error: 'An error occurred when trying to get the users'
        }));
    }
}
//every time GET_USERS_REQUEST call getUsers worker...
function* watchGetUsersRequest(){
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}
//worker
function* createUser(action){
    console.log(action);
    try {
        yield call(api.createUser, {firstName: action.payload.firstName, lastName: action.payload.lastName});
        yield call(getUsers);
    } catch (e) {
        console.log(e);
        yield put(actions.usersError({
            error: 'An error occurred when trying to create the user'
        }));
    }
}

//worker
function* deleteUser({userId}){
    try{
        yield call(api.deleteUser, userId);
        yield call(getUsers);
    } catch (e) {
        console.log(e);
        yield put(actions.usersError({
            error: 'An error occurred when trying to delete the user'
        }));
    }
}

//listener
function* watchDeleteUserRequest() {
    while (true){
        const action = yield take(actions.Types.DELETE_USER_REQUEST);
        yield call(deleteUser, {
            userId: action.payload.userId
        });
    }
}

//listener
function* watchCreateUserRequest(){
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}
const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest)
];


export default usersSagas;