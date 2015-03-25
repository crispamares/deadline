var Clock = React.createClass({
    render: function() {
	    var countdown = moment.duration(this.props.countdown);
	    countdown = (countdown < 0) ? 0 : countdown.humanize();
	    return (
	    <div className="clock">
		    <p>{countdown}</p>
	    </div>);
    }
});
    
