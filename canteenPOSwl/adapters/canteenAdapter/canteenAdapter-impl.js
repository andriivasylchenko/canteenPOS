function getMenu(){
	var path = 'canteenmenu/3866b24dd5e764b21c056df7191fb1df';

	var input = {
		    method : 'get',
		    returnedContentType : 'json',
		    path : path,
		};

	return WL.Server.invokeHttp(input);

}

function addOrder(order){
	var path = 'canteenorders/';

	var input = {
		    method : 'post',
		    returnedContentType : 'json',
		    path : path,
				body : {
					contentType: 'application/json',
					content: order
				}
		};

	return WL.Server.invokeHttp(input);

}

function getOrders(){
	var path = 'canteenorders/_all_docs?include_docs=true';

	var input = {
		    method : 'get',
		    returnedContentType : 'json',
		    path : path,
		};

	return WL.Server.invokeHttp(input);

}
