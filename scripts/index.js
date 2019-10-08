

$(function () {
    // 功能1：模拟京东搜索框
    $("#search input").focus(function () {
        $(this).addClass("focus");
        if ($(this).val() === this.defaultValue) {
            $(this).val("");
        }
    }).blur(function () {
        $(this).remove("focus");
        if ($(this).val() === "") {
            $(this).val = this.defaultValue;
        }
    }).keyup(function (e) {
        if (e.which === 13) {
            alert("回车提交表单！")
        }
    })

    // 功能2：网页换肤 ??未实现效果
    //需求：点击skin里li按钮，按钮变为选中状态，导航栏背景色改为相应的颜色
    // $("#skin li").click(function(){
    //     $(this).addClass("selected")
    //         .siblings().removeClass("selected");
    //     $("#skincssfile").prop("href","./styles/skin/"+this.id+".css");
    //     //存入cookie
    // })

    var $li = $("#skin li");
    $li.click(function () {
        switchSkin(this.id);
    });
    var cookie_skin = $.cookie("MyCssSkin");
    if (cookie_skin) {
        switchSkin(cookie_skin);
    }

    function switchSkin(skinName) {
        $("#" + skinName).addClass("selected")
            .siblings().removeClass("selected");
        $("#cssfile").prop("href", "../styles/skin/" + skinName + ".css");
        $.cookie("MyCssSkin", skinName, { path: '/', expires: 10 });
    }

    //功能三： 导航效果
    $("#nav li").hover(function () {
        $(this).find(".jnNav").show();
    }, function () {
        $(this).find(".jnNav").hide();
    })

    //功能4：右侧上部产品广告效果
    var $imgrolls = $("#jnImageroll div a");
    $imgrolls.css("opacity", "0.7");
    var len = $imgrolls.length;
    var index = 0;
    var adTimer = null;
    $imgrolls.mouseover(function () {
        index = $imgrolls.index(this);
        showImg(index);
    }).eq(0).mouseover();

    $("#jnImageroll").hover(function () {
        if (adTimer) {
            clearInterval(adTimer);
        }
    }, function () {
        adTimer = setInterval(function () {
            showImg(index);
            index++;
            if (index == len) { index = 0 }
        }, 5000)
    }).trigger("mouseleave");


    // 功能5：右侧最新动态模块内容添加超链接提示
    var x = 10,
        y = 20;

    $("a.tooltip").mouseover(function (e) {
        this.myTitle = this.title;
        this.title = "";
        var tooltip = "<div id='tooltip'>" + this.myTitle + "</div>";
        $("body").append(tooltip);
        $("#tooltip").css({
            "top": (e.pageY + y) + "px",
            "left": (e.pageX + x) + "px"
        }).show("fast");
    }).mouseout(function () {
        this.title = this.myTitle;
        $("#tooltip").remove();
    }).mousemove(function (e) {
        $("#tooltip").css({
            "top": (e.pageY + y) + "px",
            "left": (e.pageX + x) + "px"
        });
    });




    // 功能6：右侧下部品牌活动横行滚动条
    $("#jnBrandTab li a").click(function () {
        $(this).parent().addClass("chos")
            .siblings().removeClass("chos");

        var idx = $("#jnBrandTab li a").index(this);
        showBrandList(idx);
        return false;
    }).eq(0).click();

    // 8.右侧下部光标划过产品列表效果
    $("#jnBrandList li").each(function (index) {
        var $img = $(this).find("img");
        var img_w = $img.width();
        var img_h = $img.height();
        var spanHtml = '<span style="position:absolute;top:0;left:5px;width:' + img_w + 'px;height:' + img_h + 'px;" class="imageMask"></span>';
        $(spanHtml).appendTo(this);
    })
    $("#jnBrandList").delegate(".imageMask", "hover", function () {
        $(this).toggleClass("imageOver");
    });





})


// 显示不同的幻灯片
function showImg(index) {
    var $rollobj = $("#jnImageroll");
    var $rolllist = $rollobj.find("div a");
    var newhref = $rolllist.eq(index).prop("href");
    $("#JS_imgWrap").prop("href", newhref)
        .find("img").eq(index).stop(true, true).fadeIn()
        .siblings().fadeOut();
    $rolllist.removeClass("chos").css("opacity", "0.7")
        .eq(index).addClass("chos").css("opacity", "1");
}
// 显示不同的模块
function showBrandList(index) {
    var rollWidth = $("#jnBrandList").find("li").outerWidth() * 4;
    $("#jnBrandList").stop(true, false).animate({ left: -rollWidth * index }, 1000);
}