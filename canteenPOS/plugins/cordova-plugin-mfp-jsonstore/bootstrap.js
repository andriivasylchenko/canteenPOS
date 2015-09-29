
document.addEventListener('mfpready', loadJSONStore, false);
function loadJSONStore(){

	if(typeof WL !== 'undefined' && WL._JSONStoreImpl){
		//console.log('Developer is injecting scripts manually');
		/*
		<script src="worklight/static_app_props.js"></script>
		<script src="cordova.js"></script>
		<script src="worklight/wljq.js"></script>
		<script src="worklight/worklight.js"></script>
		<script src="worklight/checksum.js"></script>
		<script src="worklight/jsonstore.js"></script>
		*/
		mfpjsonstoreready();
	} else {
		//console.log('Inject MFP JSONStore Scripts dynamically');
		loadJSONStoreScript();
	}

	function mfpjsonstoreready(){
		//console.log("bootstrap.js dispatching mfpjsonstoreready event");
		var wlevent = new Event('mfpjsonstoreready');
		// Dispatch the event.
		document.dispatchEvent(wlevent);
	}

	function loadJSONStoreScript(){
		//console.log("injecting script jsonstore.js");
		injectScript("worklight/jsonstore.js",mfpjsonstoreready,bootError);
	}
	
	function injectScript(url, onload, onerror) {
	    var script = document.createElement("script");
	    // onload fires even when script fails loads with an error.
	    script.onload = onload;
	    // onerror fires for malformed URLs.
	    script.onerror = onerror;
	    script.src = url;
	    document.head.appendChild(script);
	}

	function bootError(){
		console.error("jsonstore bootstrap.js failed to inject script worklight/jsonstore.js");
	}

}
