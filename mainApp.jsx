
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
	console.log("openWindow:", state);
	if (this.otherWindow === null || this.otherWindow.closed) { 
	    this.otherWindow = window.open(
		"index.html#!/fake/"+state.realCountdown+"/"+state.fakeCountdown+"/"+state.threshold+"/"+state.isRunning,
		"FakeClock",
		"width=800,height=600,resizable,scrollbars=yes");
	}
	    
    },

    setChrono: function(state) {
	if (this.otherWindow !== null) { 
	    this.otherWindow.window.location.assign("index.html#!/fake/"+state.realCountdown+"/"+state.fakeCountdown+"/"+state.threshold+"/"+state.isRunning);
	    this.otherWindow.window.location.reload(false);
	}
	else { 
	    this.openWindow(state);
	}
    },

    onPlay: function(state) {
	if (this.otherWindow !== null) { 
	    console.log("posting:", state);
	    this.otherWindow.postMessage(state, "*");
	}	
    },

    home: function() {
	return (<Chrono humanize={false} showControls={true} onPlay={this.onPlay} onSet={this.setChrono}
			fake={false}></Chrono>);
    },

    fake: function(realCountdown, fakeCountdown, threshold, playing) {
	console.log("Fake!!!!!");
	window.addEventListener("message", receiveMessage, false);

	function receiveMessage(event)
	{
	    console.log("posted:", event.data);
	    var state = event.data;

	    React.render(
		<Chrono 
			humanize={true} 
			play={state.isRunning}
			fake={true}
			realCountdown={state.realCountdown} 
			threshold={state.threshold}
			fakeCountdown={state.fakeCountdown}></Chrono>
		, document.getElementById('container'));
	}

        return (<Chrono 
			humanize={true} 
			play={playing === "true"}
			fake={true}
			realCountdown={parseInt(realCountdown)} 
			threshold={parseInt(threshold)}
			fakeCountdown={parseInt(fakeCountdown)}></Chrono>);
    },

    notFound: function(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
    }
});
    
