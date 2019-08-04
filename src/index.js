import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/widgets/Loading';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import initialize from './utils/config';

ReactDOM.render(<Loading />, document.getElementById('root'));

initialize().then(function() {
    ReactDOM.render(
        <Router>
          <React.Fragment>
            <ToastContainer />
            <App />
          </React.Fragment>
        </Router>
        , document.getElementById('root'));
  });
