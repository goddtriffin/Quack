import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login/login';
import Register from './components/Login/register';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://endor-vm2.cs.purdue.edu:4000/graphql' }),
  cache: new InMemoryCache()
});

ReactDOM.render(
<ApolloProvider client={client}>
    <Router>
        <Switch>
            <Route exact path="/auth/login" component={Login}/> 
            <Route exact path="/auth/register" component={Register}/> 
            <Route component={App}/>
        </Switch>
    </Router>
</ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
