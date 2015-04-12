
var App = React.createClass({
    mixins: [ReactMiniRouter.RouterMixin]
    ,

    otherWindow: null,

    routes: {
        '/': 'home',
        '/fake/:countdown/:threshold/:fakeCountdownStep/:playing': 'fake'
    },

    render: function() {
        return this.renderCurrentRoute();
    },

    openWindow: function(state) {
	console.log(this.otherWindow);
	if (this.otherWindow === null || this.otherWindow.closed) { 
	    this.otherWindow = window.open(
		"index.html#!/fake/"+state.countdown+"/"+state.threshold+"/"+state.fakeCountdownStep+"/"+state.isRunning,
		"FakeClock",
		"width=800,height=600,resizable,scrollbars=yes");
	}
	    
    },

    setChrono: function(state) {
	this.openWindow(state)
	if (this.otherWindow !== null) { 
	    this.otherWindow.window.location.assign("index.html#!/fake/"+state.countdown+"/"+state.threshold+"/"+state.fakeCountdownStep+"/"+ state.isRunning);
	    this.otherWindow.window.location.reload(false);
	}
    },

    onPlay: function(state) {
	if (this.otherWindow !== null) { 
	    this.otherWindow.postMessage(state, "*");
	}	
    },

    home: function() {
	return (<Chrono humanize={false} showControls={true} onPlay={this.onPlay} onSet={this.setChrono}
			fake={false}></Chrono>);
    },

    fake: function(countdown, threshold, fakeCountdownStep, playing) {
	
	window.addEventListener("message", receiveMessage, false);

	function receiveMessage(event)
	{
	    console.log(event.data);
	    var state = event.data;

	    React.render(
		<Chrono 
			humanize={true} 
			play={state.isRunning}
			countdown={state.countdown} 
			threshold={state.threshold}
			fakeCountdownStep={state.fakeCountdownStep}></Chrono>
		, document.getElementById('container'));
	}

        return (<Chrono 
			humanize={true} 
			play={playing === "true"}
			countdown={parseInt(countdown)} 
			threshold={parseInt(threshold)}
			fakeCountdownStep={parseInt(fakeCountdownStep)}></Chrono>);
    },

    notFound: function(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
    }
});
    
