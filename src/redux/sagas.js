
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';


export default function* rootSaga() {
    yield all([
        authSaga(),
        // groupPermissionSaga(),
        // customerSaga(),
        // userSaga(),
        // childrenSaga(),
        // predictionSaga(),
        // medicineSaga(),
        // statisticSaga(),
        // agentSaga(),
        // bankSaga(),
        // reportSaga(),
        // trainingScheduleSaga(),
        // resourceSaga()
    ])
}