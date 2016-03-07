(function () {
    'use strict';
    var $ = global.jQuery = require('jquery');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var bootstrap = require('bootstrap');

    var Info = React.createClass({
        render: function() {
            return (
                <div key={this.props.id} className="info">
                    <h3><i className="fa fa-star"></i> {this.props.stargazers_count} <i className="fa fa-code-fork"></i> {this.props.forks_count}</h3>
                </div>
            );
        }
    });

    var RepoListItem = React.createClass({
        clickHandler: function() {
            this.props.onClick(this.props.id);
        },
        render: function() {
            return (
                <li key={this.props.key} className="list-group-item" onClick={this.clickHandler}>{this.props.name}</li>
            );
        }
    });

    var RepoList = React.createClass({
        getInitialState: function() {
            return { repos: [], info: [] };
        },
        componentDidMount: function() {
            var url = 'https://api.github.com/users/' + this.props.repoUser + '/repos?per_page=1000';

            this.serverRequest = $.get(url, function (result) {
                var resultRepos = result.map(function(r) {
                    return {
                        id: r.id,
                        name: r.name,
                        stargazers_count: r.stargazers_count,
                        forks_count: r.forks_count,
                    };
                }).sort(function(a, b) {
                    // Descending sort from stars count
                    return parseInt(b.stargazers_count, 10) - parseInt(a.stargazers_count, 10);
                });

                this.setState({ repos: resultRepos, info: [] });
            }.bind(this));
        },
        repoClick: function(id) {
            var clickedInfo = [];

            this.state.repos.forEach(function(r) {
                if (r.id == id) {
                    clickedInfo.push(r);
                }
            });

            this.setState({ info: clickedInfo });
        },
        render: function() {
            var self = this;

            var repos = this.state.repos.map(function(r) {
                return <RepoListItem key={r.id} id={r.id} name={r.name} stargazers_count={r.stargazers_count} onClick={self.repoClick} />
            });

            if(!repos.length){
                repos = <i className="fa fa-spin fa-spinner"></i>;
            }

            var infoName = "Clique em um repositório";

            var info = this.state.info.map(function(i) {
                infoName = i.name;
                return <Info key={i.id} id={i.id} name={i.name} stargazers_count={i.stargazers_count} forks_count={i.forks_count} />
            });

            if(!info.length){
                info = <i className="fa fa-github"></i>;
            }

            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 blue">
                            <div className="row">
                                <h1 className="col-sm-offset-2">Repositórios {this.props.repoUser}</h1>
                                <div className="col-sm-offset-2 col-sm-10 list-repos">
                                    <div className="row">
                                        <ul className="list-group">{repos}</ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 white">
                            <div className="row">
                                <h2 className="col-sm-11">{infoName}</h2>
                                <div className="col-sm-11 info-repos">{info}</div>
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
