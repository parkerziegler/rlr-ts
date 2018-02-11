import * as React from 'react';
import { Provider } from 'react-redux';

export default (store: any) => (Root: any) => (
  <Provider store={store}>
    <Root />
  </Provider>
);
