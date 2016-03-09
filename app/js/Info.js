var React = require('react');
var PropTypes = React.PropTypes;

var Info = React.createClass({
    render: function() {
        return (
            <div key={this.props.id} className="info">
                <h3><i className="fa fa-star"></i> {this.props.stargazers_count} <i className="fa fa-code-fork"></i> {this.props.forks_count}</h3>
            </div>
        );
    }
});

module.exports = Info;
