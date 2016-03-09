var React = require('react');
var PropTypes = React.PropTypes;
var $ = global.jQuery = require('jquery');

var CommitList = require('./CommitList.js');
var Info = require('./Info.js');
var RepoListItem = require('./RepoListItem.js');

var App = React.createClass({
    getInitialState: function() {
        return { repos: [], info: [], commits: [], page: 1, urlCommits: "" };
    },
    componentDidMount: function() {
        var url = 'https://api.github.com/users/globocom/repos?per_page=1000';

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
                return parseInt(b.stargazers_count, 10) - parseInt(a.stargazers_count, 10);
            });

            this.setState({ repos: resultRepos });
        }.bind(this));
    },
    getMoreCommits: function() {
        var commitList = this.state.commits;
        var page = parseInt(this.state.page, 10) + 1;
        var urlCommits = this.state.urlCommits;

        urlCommits += "&page=" + page;

        this.serverRequest = $.ajax({
            url: urlCommits,
            type: 'GET',
            success: function(result){
                var count = 0;
                result.forEach(function(c) {
                    commitList.push(c);
                    count++;
                });

                if (count < 20) {
                    $('.pagination-commits').addClass('hidden');
                }
                this.setState({ commits: commitList, page: page });
            }.bind(this),
            error: function(e) {
                console.log(e); //or whatever
            }
        });
    },
    getCommits: function(urlCommits) {
        var commitList = [];
        var page = 1;

        urlCommits += "?per_page=20";

        this.serverRequest = $.ajax({
            url: urlCommits,
            type: 'GET',
            success: function(result){
                var count = 0;
                result.forEach(function(c) {
                    commitList.push(c);
                    count++;
                });

                if (count >= 20) {
                    $('.pagination-commits').removeClass('hidden');
                }
                this.setState({ commits: commitList, page: page, urlCommits: urlCommits });
            }.bind(this),
            error: function(e) {
                console.log(e); //or whatever
            }
        });
    },
    repoClick: function(id, urlCommits) {
        var clickedInfo = [];

        this.state.repos.forEach(function(r) {
            if (r.id == id) {
                clickedInfo.push(r);
            }
        });

        this.getCommits(urlCommits);

        this.setState({ info: clickedInfo, page: 1 });
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
                    key={c.sha}
                    sha={c.sha}
                    commit={c.commit}
                    author={c.author}
                    url={c.url} />
        });
        if(!commits.length) {
            commits = "";
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 blue">
                        <div className="row">
                            <h1 className="col-sm-offset-2">Repositórios Globo.com</h1>
                            <div className="col-sm-offset-2 col-sm-10 list-repos">
                                <div className="row">
                                    <ul className="list-group">{repos}</ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8 white">
                        <div className="row">
                            <div className="col-sm-11">
                                <h2>{infoName}</h2>
                                <div className="info-repos">{info}</div>
                                <div className="commits">{commits}</div>
                                <div className="pagination-commits hidden">
                                    <button type="button" className="btn btn-primary btn-lg center-block" onClick={this.getMoreCommits}>Carregar mais</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
});

module.exports = App;
