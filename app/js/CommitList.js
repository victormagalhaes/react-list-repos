var React = require('react');
var PropTypes = React.PropTypes;

var CommitList = React.createClass({
    render: function() {
        var date = this.props.commit.author.date.split('T')[0];
        return (
            <div key={this.props.sha} className="media commit-item">
                <div className="media-body">
                    <h4 className="media-heading">
                        {this.props.commit.author.name}<div className="pull-right"><small>{date}</small></div>
                    </h4>
                    <div className="content-commit">
                        <div className="sha">#{this.props.sha}</div>
                        <div className="message">{this.props.commit.message}</div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CommitList;
