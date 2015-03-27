var Clock = React.createClass({
    render: function() {
	    var countdown = moment.duration(this.props.countdown);
	    countdown = (countdown < 0) ? 0 : countdown.humanize();
	    return (
	    <div className={this.props.hurry ? 'clock hurry' : 'clock'}>
		    <p>{countdown}</p>
	    </div>);
    }
});
    
