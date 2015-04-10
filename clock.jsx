function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

var Clock = React.createClass({
    render: function() {
	var countdown = moment.duration(this.props.countdown);
	countdown = (countdown < 0) ? 0 : countdown;
	if (!this.props.hurry) {
	    countdown = countdown.humanize();
	}
	else {
	    countdown = zeroPad(countdown.minutes(),2) + ":" + zeroPad(countdown.seconds(), 2) 
	}
	return (
	    <div className={this.props.hurry ? 'clock hurry' : 'clock'}>
		    <p>{countdown}</p>
	    </div>);
    }
});
    
