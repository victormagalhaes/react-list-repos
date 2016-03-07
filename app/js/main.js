(function () {
    'use strict';
    var $ = global.jQuery = require('jquery');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var bootstrap = require('bootstrap');

    var CommitList = React.createClass({
        render: function() {
            return (
                <li key={this.props.sha} className="commit-item">

                    {this.props.commit.author.name}: {this.props.commit.message}
                </li>
            );
        }
    });

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
            this.props.onClick(this.props.id, this.props.commits_url);
        },
        render: function() {
            return (
                <li key={this.props.key} className="list-group-item" onClick={this.clickHandler}>{this.props.name}</li>
            );
        }
    });

    var RepoList = React.createClass({
        getInitialState: function() {
            return { repos: [], info: [], commits: [] };
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
                        commits_url: r.commits_url.replace("{/sha}", ""),
                    };
                }).sort(function(a, b) {
                    // Descending sort from stars count
                    return parseInt(b.stargazers_count, 10) - parseInt(a.stargazers_count, 10);
                });

                this.setState({ repos: resultRepos, info: [], commits: [] });
            }.bind(this));
        },
        repoClick: function(id, urlCommits) {
            var clickedInfo = [];
            var commitList = [];

            this.state.repos.forEach(function(r) {
                if (r.id == id) {
                    clickedInfo.push(r);
                }
            });

            this.serverRequest = $.get(urlCommits, function(result) {
                result.forEach(function(c) {
                    commitList.push(c);
                });

                this.setState({ commits: commitList});
            }.bind(this));

            this.setState({ info: clickedInfo });
        },
        render: function() {
            var self = this;

            // Repo's list
            var repos = this.state.repos.map(function(r) {
                return <RepoListItem
                        key={r.id}
                        id={r.id}
                        name={r.name}
                        stargazers_count={r.stargazers_count}
                        commits_url={r.commits_url}
                        onClick={self.repoClick} />
            });
            if(!repos.length){
                repos = <i className="fa fa-spin fa-spinner"></i>;
            }

            // Info's list
            var infoName = "Clique em um repositório";
            var info = this.state.info.map(function(i) {
                infoName = i.name;
                return <Info
                        key={i.id}
                        id={i.id}
                        name={i.name}
                        stargazers_count={i.stargazers_count}
                        forks_count={i.forks_count} />
            });
            if(!info.length){
                info = <i className="fa fa-github"></i>;
            }

            // And commit's list
            var commits = this.state.commits.map(function(c) {
                return <CommitList
                        sha={c.sha}
                        commit={c.commit}
                        url={c.url} />
            });
            if(!commits.length){
                commits = <i className="fa fa-spin fa-spinner"></i>;
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
                                <div className="col-sm-11 commits">{commits}</div>
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
