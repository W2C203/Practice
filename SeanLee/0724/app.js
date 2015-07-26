/**
 * Created by seanlee on 15-7-24.
 */
$(document).ready(function() {
    $(window).on('load', function() {
        //加载瀑布流布局
        imgLocation();
        //模拟滚动时加载的图片
        var dataImg = {
            "data": [
                {"src": '1.jpg'},
                {"src": '2.jpg'},
                {"src": '3.jpg'},
                {"src": '4.jpg'},
                {"src": '5.jpg'}
            ]
        };
        //鼠标滚动监听，有点问题:一开始没有滚动条则不触发
        window.onscroll = function() {
            console.log(scrollside());
            if(scrollside()) {//滚动继续加载图片
                $.each(dataImg.data, function(index, value) {
                    var box = $('<div>').addClass('box').appendTo($('#container'));
                    var content = $('<div>').addClass('content').appendTo(box);
//                    console.log("./img/" + $(value).attr("src"));
                    //$(value)将value转换成JQ对象，也可直接写value['src']
                    $('<img>').attr('src', './img/' + $(value).attr('src')).appendTo(content);
                });
                imgLocation();
            }
        };
    });
});

//滚动判断
function scrollside() {
    var box = $('.box');
    var lastboxHeight = box.last().get(0).offsetTop
        + Math.floor(box.last().height() / 2);//最底端盒子一半距最顶端的高度
    var docHeight = $(window).height();//window.hetght是可视区高度，document.height是文档高度，文档高度是顶部到最底部
    var scrollHeight = $(window).scrollTop();//鼠标滚动高度，滚动条滚动距离
    return (lastboxHeight < scrollHeight + docHeight)?true:false;//true则允许滚动
}

//瀑布流
function imgLocation() {
    var box = $('.box');
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);//一排中图片个数
    var boxArr = [];//储存各个列图片总高度
    box.each(function(index, value) {
//        console.log(index + "--" + value);
        var boxHeight = box.eq(index).height();//获取图片高度
        if(index < num) {
            boxArr[index] = boxHeight;//第一排图片高度
//            console.log(index + ": " + boxHeight);
        }else {
            var minboxHeight = Math.min.apply(null, boxArr);//获取最小盒子高度，即哪一列最短
//            console.log(minboxHeight);
            var minboxIndex = $.inArray(minboxHeight, boxArr);//获取最小盒子高度位置
//            console.log(minboxIndex);
//            console.log(value);//很多div
            //设置css样式
            $(value).css({
                'position': 'absolute',//位置绝对
                'top': minboxHeight,//距浏览器顶部为最小盒子高度
                //距浏览器左部为当前列数距浏览器左边的距离
                'left': box.eq(minboxIndex).position().left
            });
//            console.log(box.eq(minboxIndex).position);
            boxArr[minboxIndex] += box.eq(index).height();
        }
    });
}