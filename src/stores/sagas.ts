import { all } from 'redux-saga/effects';
// import authSagas from './auth/saga';
// import todoSagas from './todo/saga';
import chatSagas from './actions/Chat/saga'
import surveyListSagas from './actions/Survey/surveyList/saga';
import surveyDetailSagas from './actions/Survey/surveyDetail/saga';

export default function* rootSaga() {
  yield all([
    // authSagas(),
    // todoSagas(),
    chatSagas(),
    surveyListSagas(),
    surveyDetailSagas(),
  ]);
}
