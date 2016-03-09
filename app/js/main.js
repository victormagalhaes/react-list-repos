(function () {
    'use strict';
    var React = require('react');
    var ReactDOM = require('react-dom');
    var bootstrap = require('bootstrap');
    var Router = require('react-router').Router;
    var Route = require('react-router').Route;
    var Link = require('react-router').Link;
    var browserHistory = require('react-router').browserHistory;

    var App = require('./App.js');
    var Info = require('./Info.js');

    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path=":name" component={Info}/>
            </Route>
        </Router>,
        document.getElementById('container')
    );
}());
