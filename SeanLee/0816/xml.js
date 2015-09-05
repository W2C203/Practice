/**
 * Created by seanlee on 15-8-16.
 */
function getXMLHttpRequest() {//创建XML请求
    try {
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
    catch (e) {
        return new XMLHttpRequest();
    }
}
function XMLHttp(getPost, url, data, callback) {
    var req = getXMLHttpRequest();
    data = changeForm(data);
    if (getPost.toUpperCase() == 'GET') {
        url = url + '?' + data;
    }
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            callback(req.responseText);
        } else {
            console.log(req.readyState);
            console.log(req.status);
            console.log(req.statusText);
            console.log("something wrong");
        }
    };
    req.open(getPost, url, true);
    req.setRequestHeader("content-Type", "application/x-www-form-urlencoded; charset=gbk;");
    if (getPost.toUpperCase() == 'GET') {
        req.send(null);
    } else if (getPost.toUpperCase() == 'POST') {
        req.send(data);
    }
}
function changeForm(data) {//对象转HTTP请求格式
    var str = '';
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            str += '&' + i + '=' + data[i];
        }
    }
    return str.substr(1);
}
function doSomething(data) {
    document.getElementById('area').value = data;
}
window.onload = function () {
    var doc = document;
    var btn1 = doc.getElementById("get");
    var btn2 = doc.getElementById("post");
    btn1.addEventListener('click', function () {
        var area = doc.getElementById('area');
        var myData = area.value;
        XMLHttp('GET', 'http://localhost:3333', {myArg: myData}, doSomething);
    });
    btn2.addEventListener('click', function () {
        var area = doc.getElementById('area');
        var myData = area.value;
        XMLHttp('POST', 'http://localhost:3333', {myArg: myData}, doSomething);
    });
};