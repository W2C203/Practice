function handleurl(url) {
	var obj = {};
	var str = url.split("?")[1];//string after the ?
	var map = str.split("&");//divide into Array accroding to the &
	for(var i=0;i<map.length;i++){
		var x = map[i].split("=")[0];//key
		var y = map[i].split("=")[1];//value
		obj[x] = y;//add to the object
	}
    return obj;
}
url = "http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e";
obj = handleurl(url);
//console.log(obj);//{ a: '1', b: '2', c: '', d: 'xxx', e: undefined }