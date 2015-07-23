(function($) {
    $(document).ready(function(){

        // putting lines by the pre blocks
        $("pre").each(function(){
            var pre = $(this).text().split("\n");
            var lines = new Array(pre.length+1);
            for(var i = 0; i < pre.length; i++) {
                var wrap = Math.floor(pre[i].split("").length / 70)
                if (pre[i]==""&&i==pre.length-1) {
                    lines.splice(i, 1);
                } else {
                    lines[i] = i+1;
                    for(var j = 0; j < wrap; j++) {
                        lines[i] += "\n";
                    }
                }
            }
            $(this).before("<pre class='lines'>" + lines.join("\n") + "</pre>");
        });

        var headings = [];

        var collectHeaders = function(){
            headings.push({"top":$(this).offset().top - 15,"text":$(this).text()});
        }

        if($(".markdown-body h1").length > 1) $(".markdown-body h1").each(collectHeaders)
        else if($(".markdown-body h2").length > 1) $(".markdown-body h2").each(collectHeaders)
        else if($(".markdown-body h3").length > 1) $(".markdown-body h3").each(collectHeaders)

        $(window).scroll(function(){
            if(headings.length==0) return true;
            var scrolltop = $(window).scrollTop() || 0;
            if(headings[0] && scrolltop < headings[0].top) {
                $(".current-section").css({"opacity":0,"visibility":"hidden"});
                return false;
            }
            $(".current-section").css({"opacity":1,"visibility":"visible"});
            for(var i in headings) {
                if(scrolltop >= headings[i].top) {
                    $(".current-section .name").text(headings[i].text);
                }
            }
        });

        $(".current-section a").click(function(){
            $(window).scrollTop(0);
            return false;
        })
    });
})(jQuery);


////////////////// here changed by Joe

function add(obj,person){//person 信息放入 obj中
    obj["person"]=person;
    //console.log(obj)
    return obj;
}
function fill(template_id,fill_id){     //  获取指定元素id模板 填充数据data后 插回到到id前

    var source = $("#"+template_id).html();                 //取得模板
    var template = Handlebars.compile(source);
    var result = template(arguments[2]);           //将数据 填充到模板
    $("#"+fill_id).before(result);//整个模块显示的地方
}
$.getJSON("data.json", function (data) {        // 注意再chrome浏览器中 无法引用本地的文件   可以用webstorm解决！！
    //for(i=0;i<data.task.length-1;i++)         //与下面的等价
    $.each(data.task,function(i,obj){      //取得json中的对象task 遍历
        var temp = add(obj,data.person);   //将两个对象合并返回 obj 等价于 data.task[i]
        fill("template1","fill_here",temp);  // 参数为模板id 最终加入DOM结构ID 需添加的数据
    })
});



