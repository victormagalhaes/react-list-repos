(function () {
    'use strict';
    var $ = global.jQuery = require('jquery');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var bootstrap = require('bootstrap');

    var RepoListItem = React.createClass({
        render: function() {
            return (
                <li key={this.props.id} className="list-group-item">{this.props.name} - Estrelas: {this.props.stargazers_count} - Forks: {this.props.forks_count}</li>
            );
        }
    });

    var RepoList = React.createClass({
        getInitialState: function() {
            return { repos: [] };
        },
        componentDidMount: function() {
            var url = 'https://api.github.com/users/' + this.props.repoUser + '/repos?per_page=1000';

            this.serverRequest = $.get(url, function (result) {
                var resultRepos = result.map(function(r) {
                    return {
                        id: r.id,
                        name: r.name,
                        stargazers_count: r.stargazers_count,
                        forks_count: r.forks_count
                    };
                }).sort(function(a, b) {
                    return parseInt(b.stargazers_count, 10) - parseInt(a.stargazers_count, 10);
                });

                this.setState({ repos: resultRepos });
            }.bind(this));
        },
        render: function() {
            var self = this;

            var repos = this.state.repos.map(function(r) {
                return <RepoListItem key={r.id} name={r.name} stargazers_count={r.stargazers_count} forks_count={r.forks_count} />
            });

            if(!repos.length){
                repos = <p>Carregando repositórios...</p>;
            }

            return (
                <div className="container-fluid">
                    <div className="row">
                        <h1>Repositórios {this.props.repoUser}</h1>
                        <div className="col-sm-6 blue">
                            <div className="row">
                                <div className="col-sm-offset-6 col-sm-6 list-repos">
                                    <div className="row">
                                        <ul className="list-group">{repos}</ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 white">
                            <div className="row">
                                <div className="col-sm-6 info-repos">
                                    <div className="row">
                                        Ninja
                                    </div>
                                </div>
                            </div>
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
