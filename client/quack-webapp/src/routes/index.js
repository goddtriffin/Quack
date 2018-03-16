import React from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';
import Blank from '../components/Blank/blank'

export default () => (
    <BrowserRouter>
        <Route exact path="/" component={Blank}/>  
    </BrowserRouter>
);