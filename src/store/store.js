import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middleware = applyMiddleware(thunk);

const store = createStore(reducer, middleware);

store.subscribe(() => {
  console.log('[Subscription]', store.getState());
});

export default store;


