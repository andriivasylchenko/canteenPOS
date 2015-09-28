var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};

// Called automatically after MFP framework initialization by WL.Client.init(wlInitOptions).
function wlCommonInit(){
	// Common initialization code goes here
    WL.Client.connect({
      onSuccess: function(){
        console.log('connected to MFP server');

        var event = new CustomEvent("initDone");
        document.dispatchEvent(event);
      },
      onFailure: function(){
        console.log('failed to connect to MFP server');
      }
    });

    MQA.startNewSession(
   {
      mode: "QA",
                         // or mode: "MARKET" for production mode.
       android: {
         appKey: "1g4e06c67eae0575dc16997c1cb522c50777ee1481g0g1g34740cc8" ,
         notificationsEnabled: true
		}
	},
       {
      success: function () {console.log("Session Started successfully");},
      error: function (string) { console.log("Session error" + string);}
	}
   );
}
