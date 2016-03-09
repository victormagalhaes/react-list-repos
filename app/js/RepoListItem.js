var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var RepoListItem = React.createClass({
    clickHandler: function() {
        this.props.onClick(this.props.id, this.props.commits_url);
    },
    render: function() {
        var url = "/" + this.props.name;
        return (
            <li key={this.props.key} className="list-group-item" onClick={this.clickHandler}>
                <Link to={url}>{this.props.name}</Link>
            </li>
        );
    }
});

module.exports = RepoListItem;
