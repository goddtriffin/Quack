import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login/login';
import Register from './components/Login/register';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AUTH_TOKEN } from './constants'
import { BatchLink } from "apollo-link-batch";

const httpLink = createHttpLink({
	uri: 'http://endor-vm2.cs.purdue.edu:4000/graphql',
	credentials: 'same-origin'
});

const authToken = localStorage.getItem(AUTH_TOKEN);

const middlewareLink = new ApolloLink((operation, forward) => {
  	if (authToken) {
		operation.setContext({
			headers: {
				type: 'instructor',
				authorization: authToken,
				"Access-Control-Allow-Credentials" : "*",
			}
		});
	}
	
  	return forward(operation)
})

const client = new ApolloClient({
	link: middlewareLink.concat(httpLink),
	cache: new InMemoryCache(),
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