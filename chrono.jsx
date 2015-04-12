var Chrono = React.createClass({

    getInitialState: function() {
	console.log("#####", this.props.countdown);
	return {
	    countdown: this.props.countdown || null,
	    isRunning: false,
	    realCountdownStep: 50,
	    fakeCountdownStep: this.props.fakeCountdownStep || null,
	    threshold: this.props.threshold || null,  
	    intervalId: null
	};
    },

    componentDidMount: function() {
	console.log("mounted:", this.state);
	if (this.props.play) {
	    this.play();
	}
    },

    componentWillReceiveProps: function(nextProps) {
	console.log(nextProps.play, this.state.isRunning);
	if (nextProps.play !== this.state.isRunning) {
	    this.play();
	}
    },

    componentWillUnmount: function() {

	clearInterval(this.state.intervalId);

    },

    setClock: function() {
	
	var days = parseFloat(React.findDOMNode(this.refs.fakeInput).value);
	var minutes = parseInt(React.findDOMNode(this.refs.countdownInput).value);
	var realSeconds = parseInt(React.findDOMNode(this.refs.countdownThreshold).value);

	var threshold = moment.duration(realSeconds, 'seconds').asMilliseconds();
	var realCountdown = moment.duration(minutes, 'minutes').asMilliseconds();
	var fakeCountdowm = moment.duration(days, 'days').asMilliseconds();

	this.state.realCountdownStep = 50;
	this.state.fakeCountdownStep = fakeCountdowm * this.state.realCountdownStep / realCountdown;

	this.state.countdown = (this.props.fake) ? fakeCountdowm : realCountdown;
	this.state.threshold = threshold;

	this.setState(this.state);
	this.props.onSet && this.props.onSet(this.state);
    },
    _inHurry: function() {
	if (this.props.fake) {
	    return ((this.state.countdown / this.state.fakeCountdownStep) * this.state.realCountdownStep)  
	        < this.state.threshold;
	}
	else {
	    return this.state.countdown < this.state.threshold;
	}
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
		var step = (self.props.fake) ? self.state.fakeCountdownStep : self.state.realCountdownStep; 
		if (self._inHurry()) {
		    step =  50;
		    self.state.countdown = Math.min(self.state.countdown, self.state.threshold);
		}
		self.state.countdown = self.state.countdown - step;
		self.setState(self.state);
	    }, this.state.realCountdownStep);
	}
	this.props.onPlay && this.props.onPlay(this.state);
	this.setState(this.state);
    },
    render: function() {
	var playMsg = (this.state.isRunning) ? "Pause" : "Play";
	var threshold = this.state.threshold;
	var hurry = this._inHurry();
	//console.log(((this.state.countdown / this.state.fakeCountdownStep) * this.state.realCountdownStep));

	var Controls = "";
	if (this.props.showControls) {
	    Controls = (
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
	    )
	}

	return (
	    <div className="chrono">
	      <Clock countdown={this.state.countdown} hurry={hurry} humanize={this.props.humanize}/>
	      {Controls}
	    </div>);
    }
});
