function myDirectory() {
	var myURL = location.href;
	var i = 0;
	for (;myURL.indexOf("/",i)>0;i=myURL.indexOf("/",i)+1) {}
	return myURL.substr(0,i);
}

function callFile(method,args,returnCall) {
	var arguments = "";
	var firstArg = true;
	for (var property in args) {
		if (firstArg) firstArg = false;
		else arguments += "&";
		arguments += property+"="+args[property];
	}
	var fileCall = myDirectory()+"php/"+method+".php?"+arguments;
	
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else {
		// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			window[returnCall](xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET",fileCall,false);
	xmlhttp.send();
}

function parseURLParams() {
	var url = location.href;
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}