import { combineReducers } from 'redux';
import { appApi } from '../../api/rtkApi';

//reducers

export default combineReducers({
  [appApi.reducerPath]: appApi.reducer,
})