var Chrono = React.createClass({
    render: function() {
	return (
	    <div className="chrono">
	      <Clock countdown={this.props.countdown} />
	      <div className="controls">
		<input type="number" defaultValue="7" min="0"/> days. In
		<input type="number" defaultValue="20" min="0"/> minutes. 							  
                <button>Start</button>
	      </div>
	    </div>);
    }
});
