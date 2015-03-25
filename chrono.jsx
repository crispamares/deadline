var Chrono = React.createClass({
    render: function() {
	return (
	    <div className="chrono">
	      <Clock countdown={this.props.countdown} />
	      <div className="controls">
		<input ref="fakeInput" type="number" defaultValue="7" min="0"/> 
		days. In
		<input ref="countdownInput" type="number" defaultValue="20" min="0"/> 
		minutes. 
                <button onClick={setClock}>Set</button>
	      </div>
	    </div>);
    },
    setClock: function() {
	this.refs.fakeInput.value
    }
});
