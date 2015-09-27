function getMenu(){
	var path = 'canteenmenu/3866b24dd5e764b21c056df7191fb1df';

	var input = {
		    method : 'get',
		    returnedContentType : 'json',
		    path : path,
		};

	return WL.Server.invokeHttp(input);

}
