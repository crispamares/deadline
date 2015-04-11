var Chrono = React.createClass({
    getInitialState: function() {
	return {
	    countdown: null,
	    isRunning: false,
	    realCountdownStep: null,
	    fakeCountdownStep: null,
	    threshold: null,  
	    intervalId: null
	};
    },
    setClock: function() {
	
	var days = parseFloat(React.findDOMNode(this.refs.fakeInput).value);
	var minutes = parseInt(React.findDOMNode(this.refs.countdownInput).value);
	var realSeconds = parseInt(React.findDOMNode(this.refs.countdownThreshold).value);

	var threshold = moment.duration(realSeconds, 'seconds');
	var realCountdown = moment.duration(minutes, 'minutes').asMilliseconds();
	var fakeCountdowm = moment.duration(days, 'days').asMilliseconds();

	this.state.realCountdownStep = 50;
	this.state.fakeCountdownStep = fakeCountdowm * this.state.realCountdownStep / realCountdown;

	this.state.countdown = fakeCountdowm;
	this.state.threshold = threshold;

	this.setState(self.state);
    },
    _inHurry: function() {
	return ((this.state.countdown / this.state.fakeCountdownStep) * this.state.realCountdownStep)  
	             < this.state.threshold;
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
		var step = self.state.fakeCountdownStep; 
		if (self._inHurry()) {
		    step =  50;
		    self.state.countdown = Math.min(self.state.countdown, self.state.threshold);
		}
		self.state.countdown = self.state.countdown - step;
		self.setState(self.state);
	    }, this.state.realCountdownStep);
	}
	this.setState(this.state);
    },
    render: function() {
	var playMsg = (this.state.isRunning) ? "Pause" : "Play";
	var threshold = this.state.threshold;
	var hurry = this._inHurry();
	console.log(((this.state.countdown / this.state.fakeCountdownStep) * this.state.realCountdownStep));
	return (
	    <div className="chrono">
	      <Clock countdown={this.state.countdown} hurry={hurry}/>
	      <div className="controls">
		<input ref="fakeInput" type="number" defaultValue="7" min="0" step="any"/> 
		days. In
		<input ref="countdownInput" type="number" defaultValue="20" min="0"/> 
		minutes. The last 
		<input ref="countdownThreshold" type="number" defaultValue="60" min="0"/> 
		seconds are real. 
                <button onClick={this.setClock}>Set</button>
                <button onClick={this.play}>{playMsg}</button>
	      </div>
	    </div>);
    }
});
