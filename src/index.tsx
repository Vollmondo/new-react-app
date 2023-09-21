import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ModalWindowState } from './context/ModalWindowContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import {PersistGate} from "redux-persist/integration/react"
import {persistStore} from "redux-persist"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let persistor = persistStore(store)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ModalWindowState>
          <App />
        </ModalWindowState>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();