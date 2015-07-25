/**
 * Created by hywilliam on 7/24/15.
 */
$(document).ready(function () {
    $(window).on('load', function () {
        // 页面加载即瀑布流布局
        imgLocation();
        // 数据模拟
        var dataImg = {
            'data': [
                {'src': '1.jpg'},
                {'src': '5.jpg'},
                {'src': '6.jpg'},
                {'src': '7.jpg'},
                {'src': '8.jpg'},
                {'src': '9.jpg'}
            ]
        };
        // 鼠标滑动监听
        window.onscroll = function () {
            console.log(scrollside());
            if(scrollside()) {
                $.each(dataImg.data, function(index, val){
                    var box = $('<div>').addClass('box').appendTo($('#container'));
                    var content = $('<div>').addClass('content').appendTo(box);
//                    console.log('index')
                    $('<img>').attr('src', 'http://7xihsv.com1.z0.glb.clouddn.com/' + $(val).attr('src')).appendTo(content);
                });
                imgLocation();
            }
        };
    });
});
// 滚动加载
function scrollside() {
    var box = $('.box');
    // 最后一张图片距页面顶端的高度与最后一张图本身高度一半之和
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height()/2);
    // 文档高度
    var windowHeight = $(window).height();
    // 鼠标滚轮向下滚动距页顶的高度
    var scrollHeight = $(window).scrollTop();
//    console.log(scrollHeight + '------' + ducumentHeight + '--------'+ lastboxHeight);

    return  lastboxHeight < windowHeight + scrollHeight ? true : false;
}

// waterflow
function imgLocation() {
    var box = $('.box');    // 所有加载的图片
    var boxWidth = box.eq(0).width();   // 每张图的宽度，因为是等宽，拿第一张就ok
    var num = Math.floor($(window).width() / boxWidth);   //一排能放几张图
    var boxArr = [];    // 存放图片盒子的高度
    var minboxHeight;
    var minboxIndex;

    box.each(function (index, val) {
        // val 是当前获取的box对象
        //console.log(index + '-------' + val);
        var boxHeight = box.eq(index).height();
        if (index < num) {
            // 第一排
            boxArr[index] = boxHeight;
//            console.log(boxHeight);
        } else {
            minboxHeight = Math.min.apply(null, boxArr);    //获取当前最矮的图片盒子列
//            console.log(minboxHeight);
            minboxIndex = $.inArray(minboxHeight, boxArr);  //获取当前最矮图片盒子在数组中的索引
//            console.log(minboxIndex);
            // 设置当前新加入的图片的样式
            $(val).css({
                'position': 'absolute',
                'top'     : minboxHeight,
                'left'    : box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex] += box.eq(index).height();
        }
    })
}