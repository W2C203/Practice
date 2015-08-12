$(window).on('load', function () {
    waterfall();
    var dataInt={"data":[
                    {"src":'1.jpg'},
                    {"src":'2.jpg'},
                    {"src":'3.jpg'}
                ]};
    $(window).on('scroll',function(){
        if(checkScrollSlide()){
            console.log("刷图")
            $.each(dataInt.data,function(index,value){
                var oBox=$('<div>').addClass('box').appendTo($('#main'));  //创建一个div
                var oPic=$('<div>').addClass('pic').appendTo(oBox);
                var oIma=$('<img>').attr('src','images/'+ value['src']).appendTo(oPic);
                //console.log(value['src'])

            })
            waterfall();
        }
    })
})
function waterfall() {
    var $boxs = $('#main>div');    //为了区分是jquery对象 一般变量开始符号是$
    var w = $boxs.eq(0).outerWidth(); //一列的宽度     width定义的width
    var cols = Math.floor($(window).width() / w);
    $('#main').width(w * cols).css('margin', '0 auto');

    var hArr = [];
    $boxs.each(function (index, value) { //索引
        var h = $boxs.eq(index).outerHeight();
        if (index < cols) {
            hArr[index] = h;
        } else {
            var minH = Math.min.apply(null, hArr);
            var minHIndex = $.inArray(minH, hArr);  //返回参数1在参数2的索引
            $(value).css({     // 转换为jquery对象
                'position': 'absolute',
                'top': minH + 'px',
                'left': minHIndex * w + 'px'
            })
            hArr[minHIndex]+=$boxs.eq(index).outerHeight();
        }
    })
}

function checkScrollSlide(){
    var $lastBox=$('#main>div').last();
    var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    var scrollTop=$(window).scrollTop(); //滚动高度
    var documentH=$(window).height();    //可视区高度
    return (lastBoxDis<scrollTop+documentH)?true:false;
}


//for (var i = 0; i < th.length; i++) {
//    th[i].addEventListener('click', function () {
//        var td = document.getElementsByTagName('td');
//        console.log(td.length)
//        var sortList = [];
//        function (num) {
//            return function () {
//                for (var j = i; j < td.length; j += th.length) {
//                    console.log("i:" + i + "  j:" + j)
//                    sortList.push(td[j].innerHTML);
//                }
//            }
//        }(i);
//        console.log(sortList)
//    })
//}