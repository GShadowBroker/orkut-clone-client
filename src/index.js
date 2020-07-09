import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './services/client'

ReactDOM.render(
  <ApolloProvider client={ client }>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);