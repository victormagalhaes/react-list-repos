(function () {
    'use strict';
    var $ = global.jQuery = require('jquery');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var bootstrap = require('bootstrap');

    var RepoListItem = React.createClass({
        render: function() {
            return (
                <li key={this.props.id}>{this.props.name} - {this.props.stars}</li>
            );
        }
    });

    var RepoList = React.createClass({
        getInitialState: function(){
            // The pictures array will be populated via AJAX, and

            return { repos: [] };
        },
        componentDidMount: function() {
            var url = 'https://api.github.com/users/' + this.props.repoUser + '/repos?per_page=1000';

            this.serverRequest = $.get(url, function (result) {
                var resultRepos = result.map(function(r) {
                    return {
                        id: r.id,
                        name: r.name,
                        stars: r.stars
                    };
                });

                this.setState({ repos: resultRepos });
            }.bind(this));
        },
        render: function() {
            var self = this;

            var repos = this.state.repos.map(function(r) {
                return <RepoListItem key={r.id} name={r.name} stars={r.stargazers_count} />
            });

            if(!repos.length){
                repos = <p>Carregando repositórios...</p>;
            }

            return (
                <div className="container-fluid">
                    <div className="row">
                            <h1>Repositórios {this.props.repoUser}</h1>
                            <div className="col-sm-6">
                                <div className="row">{repos}</div>
                            </div>
                    </div>
                </div>
            );
        }
    });

    ReactDOM.render(
        <RepoList repoUser="globocom"/>,
        document.getElementById('container')
    );
}());
