var Chrono = React.createClass({
    getInitialState: function() {
	return {
	    countdown: null,
	    isRunning: false,
	    realCountdownStep: null,
	    fakeCountdownStep: null,
	    intervalId: null
	};
    },
    setClock: function() {
	
	var days = parseInt(React.findDOMNode(this.refs.fakeInput).value);
	var minutes = parseInt(React.findDOMNode(this.refs.countdownInput).value)

	var realCountdown = moment.duration(minutes, 'minutes').asMilliseconds();
	var fakeCountdowm = moment.duration(days, 'days').asMilliseconds();

	this.state.realCountdownStep = 50;
	this.state.fakeCountdownStep = fakeCountdowm * this.state.realCountdownStep  / realCountdown;

	this.state.countdown = fakeCountdowm;

	this.setState(self.state);
    },
    play: function () {
	if (this.state.isRunning) {
	    clearInterval(this.state.intervalId);
	    this.state.isRunning = false;
	}
	else { 
	    var self = this;
	    this.state.isRunning = true;
	    this.state.intervalId = setInterval(function() {
		self.state.countdown = self.state.countdown - self.state.fakeCountdownStep;
		self.setState(self.state);
	    }, this.state.realCountdownStep);
	}
	this.setState(this.state);
    },
    render: function() {
	var playMsg = (this.state.isRunning) ? "Pause" : "Play";
	var hurry = ((this.state.countdown / this.state.fakeCountdownStep) * this.state.realCountdownStep)  < moment.duration(10, 'seconds');
	console.log(((this.state.countdown / this.state.fakeCountdownStep) * this.state.realCountdownStep));
	return (
	    <div className="chrono">
	      <Clock countdown={this.state.countdown} hurry={hurry}/>
	      <div className="controls">
		<input ref="fakeInput" type="number" defaultValue="7" min="0"/> 
		days. In
		<input ref="countdownInput" type="number" defaultValue="20" min="0"/> 
		minutes. 
                <button onClick={this.setClock}>Set</button>
                <button onClick={this.play}>{playMsg}</button>
	      </div>
	    </div>);
    }
});
