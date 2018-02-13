import { render } from 'react-dom';

/* Invert comments for immutable */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerForBrowser, initializeCurrentLocation, Location } from 'redux-little-router';
// import { immutableRouterForBrowser } from 'redux-little-router/es/immutable';
// import { createStore, compose, applyMiddleware } from 'redux';
// import { combineReducers } from 'redux-immutable';
// import { Map, fromJS } from 'immutable';

import routes from './routes';
import wrap from './wrap';
import Demo from './demo';

/* Invert comments for immutable */
const { reducer, enhancer, middleware } = routerForBrowser({ routes });
const initialState = (window as any).__INITIAL_STATE || {};
// const { reducer, enhancer, middleware } = immutableRouterForBrowser({ routes });
// const initialState = (window as any).__INITIAL_STATE ? fromJS((window as any).__INITIAL_STATE) : Map();

const store = createStore(
  combineReducers({ router: reducer }),
  // If this is a server render, we grab the
  // initial state the hbs template inserted
  initialState,
  compose(
    enhancer,
    applyMiddleware(middleware),
    (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
  )
);

/* Invert comments for immutable */
const initialLocation: Location = store.getState().router;
// const initialLocation = store.getState().get('router').toJS();

if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

render(wrap(store)(Demo), document.getElementById('content'));
