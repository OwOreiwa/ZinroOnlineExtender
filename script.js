window.addEventListener("load", function(){
    if(window.location.href == "https://zinro.net/m/end.php?ad=inter" || window.location.href == "https://zinro.net/m/end.php?message=%E6%9D%91%E3%81%8B%E3%82%89%E9%80%80%E5%87%BA%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F") window.location.href = "https://zinro.net/"
}, false);

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "Action") {
        var Ck = Cookies.get("extender_RoomList");
        if(Ck == "Default" || Ck === undefined){
            Cookies.set("extender_RoomList", "Lowlight", {expires:1});
            LowlightRoom_Sus();
            LowlightRoom_Chat();
            LowlightRoom_Friends();
        }
        else if(Ck == "Lowlight"){
            Cookies.set("extender_RoomList", "Remove", {expires:1});
            LowlightRoom_Sus();
            RemoveRoom_Chat();
            RemoveRoom_Friends();
        }
        else if(Ck == "Remove"){
            Cookies.set("extender_RoomList", "Default", {expires:1});
            DefaultRoom_Sus();
            DefaultRoom_Chat();
            DefaultRoom_Friends();
        }
	}
});

var Ck = Cookies.get("extender_RoomList");
if(Ck == "Default" || Ck === undefined){
    window.addEventListener("load", DefaultRoom_Sus, false);
    window.addEventListener("load", DefaultRoom_Chat, false);
    window.addEventListener("load", DefaultRoom_Friends, false);
}
else if(Ck == "Lowlight"){
    window.addEventListener("load", LowlightRoom_Sus, false);
    window.addEventListener("load", LowlightRoom_Chat, false);
    window.addEventListener("load", LowlightRoom_Friends, false);
}
else if(Ck == "Remove"){
    window.addEventListener("load", LowlightRoom_Sus, false);
    window.addEventListener("load", RemoveRoom_Chat, false);
    window.addEventListener("load", RemoveRoom_Friends, false);
}

$("body").click(HighlightDisconnected);
$("body").click(HighlightTroll);
window.addEventListener("load", addRoleSettings, false);

$('.btn:contains("開始")'+'.btn:not(.dropdown-toggle)').removeAttr("href");
$('.btn:contains("開始")'+'.btn:not(.dropdown-toggle)').click(confirmStartGame);

//------------------------------

$('.btn:contains("メモ")').after('<a class="btn" onclick="$(\'#extender_FT\').toggle();" style="margin-left: 10px;">占い先</a>');
$('#memo').after('<div id="extender_FT" style="margin-top: 5px; display: none; background-color: darkgray; border: 4px solid gray; border-radius: 20px; padding: 10px; margin-bottom: 10px;"><table id="extender_FT_table" style="background-color: dimgray; text-align: center; width: 100%; table-layout: fixed;"></table></div>');
$('#extender_FT').prepend('<h3 style="width: 100%; margin-left: auto; margin-right: auto; border-bottom: 2px solid gray"></h3>');
$('#extender_FT').prepend('<input type="text" id="extender_FT_addRow_name" style="margin-bottom: 0px;"></input>');
$('#extender_FT').prepend('<button type="button" id="extender_FT_addRow" style="margin-left: 10px">占い師追加</button>');
$('#extender_FT').prepend('<button type="button" id="extender_FT_saveTable" style="margin-left: 10px">表保存</button>');
$('#extender_FT').prepend('<button type="button" id="extender_FT_createTable">表作成</button>');
$('#extender_FT').prepend('<button type="button" id="extender_FT_deleteTable">表削除</button>');
$('.btn:contains("占い先")').click(function(){
    var Ck = Cookies.get("extender_FT_table");
    $("#extender_FT_table").empty();
    $("#extender_FT_table").append(Ck);
});
$('#extender_FT_saveTable').click(function(){
    Cookies.set("extender_FT_table", $("#extender_FT_table").html(), {expires:1});
    window.alert("表を保存しました。");
});
$('#extender_FT_createTable').click(function(){
    var ans = window.confirm("表を現在の生存プレイヤーで上書きします。\r\nよろしいですか？");
    if(ans){
        $('#extender_FT_table').append('<thead id="extender_FT_head"><tr id="extender_FT_head_tr"></tr></thead>');
        $('#extender_FT_table').append('<tbody id="extender_FT_body"></tbody>');

        var playerName = $('span[style=""][data-toggle="modal"]').map(function(){
            return $(this).text();
        }).get();
        $('#extender_FT_head_tr').children().remove();
        $.each(playerName, function(){
            $('#extender_FT_head_tr').children().remove();
        })
        $('#extender_FT_head_tr').append('<th></th>');
        $.each(playerName, function(){
            $('#extender_FT_head_tr').append('<th>'+this+'</th>');
        })

        Cookies.set("extender_FT_table", $("#extender_FT_table").html(), {expires:1});
    }
});
$('#extender_FT_deleteTable').click(function(){
    var ans = window.confirm("表を削除します。\r\nよろしいですか？");
    if(ans){
        $("#extender_FT_table").empty();
        Cookies.remove("extender_FT_table");
    }
});
$('#extender_FT_addRow').click(function(){
    var addRowName = $('#extender_FT_addRow_name').val();
    if(addRowName){
        var playerName = $('span[style=""][data-toggle="modal"]').map(function(){
            return $(this).text();
        }).get();
        $('#extender_FT_body').append('<tr></tr>');
        $('#extender_FT_addRow_name').val("");
        $('#extender_FT_body tr:last').append('<td id="extender_FT_body_name">'+addRowName+'</td>');
        $.each(playerName, function(){
            $('#extender_FT_body tr:last').append('<td id="extender_FT_body_input"></td>');
        })
    }
    $('#extender_FT_addRow_name').focus();
    $("#extender_FT_body #extender_FT_body_input").css("border", "solid 1px");
    $("#extender_FT_body #extender_FT_body_name").css("font-weight", "bold");
});
$('#extender_FT_table').on("click", "#extender_FT_body_name", function(){
    $(this).parent().remove();
});
$('#extender_FT_table').on("click", "#extender_FT_body_input", function(){
    if(!$(this).text().length) $(this).text("白");
    else if($(this).text().includes("白")) $(this).text("黒");
    else if($(this).text().includes("黒")) $(this).text("");
});

//------------------------------

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
$('.btn:contains("占い先")').after('<a class="btn" onclick="$(\'#extender_Command\').toggle();" >コマンド</a>');
$('#extender_FT').after('<div id="extender_Command" style="margin-top: 5px; display: none; background-color: darkgray; border: 4px solid gray; border-radius: 20px; padding: 10px; margin-bottom: 10px;"></div>');
$('#extender_Command').append('<a class="btn">[WHO]</a>');
$('.btn:contains("[WHO]")').click(function(){
    var playerName = $('span[style=""][data-toggle="modal"]').map(function(){
        return $(this).text();
    }).get();
    var result = playerName[getRandomInt(playerName.length)]
    $('#extender_Command_result').text(result);
});
$('#extender_Command').append('<a class="btn">[DICE]</a>');
$('.btn:contains("[DICE]")').click(function(){
    var result = getRandomInt(100);
    $('#extender_Command_result').text(result);
});
$('#extender_Command').append('<h3 style="width: 100%; margin-left: auto; margin-right: auto; border-bottom: 2px solid gray"></h3>');
$('#extender_Command').append('<h4 id="extender_Command_result">ここに結果が表示されます。</h4>');

//------------------------------

$("#message").click(function(){
    $("#message div:not('#message_text')").on({
        "mouseenter": function(){
            var filterName = $(this).children(":first-child").text();
            var filterMessages = $("#message div:not('#message_text') > .from-normal:contains(" + filterName + "), #message div:not('#message_text') > .from-system:contains(" + filterName + ")").parent();
            var filterNewMessages = $("#message > div:not('#message_text'):first:contains(" + filterName + ")");
            $("#message div:not('#message_text')").not(this).not(filterMessages).not(filterNewMessages).css("opacity", "25%");
        },
        "mouseleave": function(){
            $("#message div:not('#message_text')").css("opacity", "100%");
        }
    })
});

//------------------------------

function DefaultRoom_Chat(){
    $(".label:contains('雑談系'), .label:contains('身内')").parent().css({
        "background": "",
        "display": "",
    });
}
function DefaultRoom_Friends(){
    $(".icon-lock").parent().parent().css({
        "background": "",
        "display": "",
    });
}
function DefaultRoom_Sus(){
    for(let i=20; i<=50; i++){
        $("td:contains(" + i + "人)").css("background", "");
    }
}

function LowlightRoom_Chat(){
    $(".label:contains('雑談系')").parent().css("background", "darkgray");
    $(".label:contains('身内')").parent().css("background", "gray");
}
function LowlightRoom_Friends(){
    $(".icon-lock").parent().parent().css("background", "dimgray");
}
function LowlightRoom_Sus(){
    for(let i=20; i<=50; i++){
        $("td:contains(" + i + "人)").css("background", "silver");
    }
}

function RemoveRoom_Chat(){
    $(".label:contains('雑談系'), .label:contains('身内')").parent().css("display", "none");
}
function RemoveRoom_Friends(){
    $(".icon-lock").parent().parent().css("display", "none");
}

function HighlightDisconnected(){
    var icon = $(".icon-ban-circle");

    if(icon.length != 0){
        $(icon[0]).closest(".table").css("borderCollapse", "collapse");
        for(let i=0; i<icon.length; i++){
            $(icon[i]).closest("tr").attr("id", "Disconnected");
            $(icon[i]).closest("tr").find(".label:contains('CPU')").closest("tr").attr("id", "CPU");
        }
        $("tbody #Disconnected").css({
            "border": "2px solid red",
            "opacity": "25%",
        });
    }
}

function HighlightTroll(){
    var playerName = $(".icon-signal").closest("tr").find("span[data-toggle='modal']");
    var trollName = ["田代","たしろ","松潤","まつじゅん","まつずん","木公シ閏","木公氵閏"];

    for(let i=0; i<playerName.length; i++){
        for(let j=0; j<trollName.length; j++){
            if(~$(playerName[i]).text().indexOf(trollName[j])){
                $(playerName[i]).closest("table").css({
                    "borderCollapse": "collapse",
                });
                $(playerName[i]).closest("tr").css({
                    "border": "2px solid purple",
                    "opacity": "25%",
                });
            }
        }
    }
}

function confirmStartGame(){
    $("body").trigger("click")
    var capa = $("select[name=teiin]").val();
    var playerName = $('span[style=""][data-toggle="modal"]').map(function(){
        return $(this).text();
    }).get();
    var playerNum = playerName.length;
    var disconnectedPlayer = $("tbody #Disconnected");
    
    if(playerNum != capa){
        var ans = window.confirm("現在のプレイヤー数が定員を満たしていません。\r\nゲームを開始しますか？");
        if(ans){
            if(disconnectedPlayer.length != 0){
                var ans = window.confirm("回線落ちしているプレイヤーが存在します。\r\nゲームを開始しますか？");
                if(ans) window.location.href = "/m/player.php?mode=start";
            }
            else window.location.href = "/m/player.php?mode=start";
        }
    }
    else if(disconnectedPlayer.length != 0){
        var ans = window.confirm("回線落ちしているプレイヤーが存在します。\r\nゲームを開始しますか？");
        if(ans) window.location.href = "/m/player.php?mode=start";
    }
    else{
        window.location.href = "/m/player.php?mode=start";
    }
}

function addRoleSettings(){
    'use strict';
    const addBtn = (h, title, func) => {
        return $('<button style="width: 55px; margin: 2px;" type="button" id="extenderBtn">').text(title).click(func).click(preventMash).appendTo(h);
    }

    const h = $("<div>").css({
        "text-align": "center",
        "background-color": "darkgray",
        "border": "10px double gray",
        "border-radius": "20px",
        "margin-bottom": "20px",
    })
    $("input[value=村設定変更]").before(h)
    h.append("<h3>配役設定</h3>");
    h.attr("id", "rolesSetting");

    h.append('<h3 style="width: 80%; margin-left: auto; margin-right: auto; border-bottom: 2px solid gray"></h3>');

    addBtn(h, "10a狩", () => {
        $('select[name=job_1]').val(2);     //人狼
        $('select[name=job_4]').val(1);     //占い師
        $('select[name=job_3]').val(1);     //狩人
        $('select[name=job_5]').val(1);     //霊能者
        $('select[name=job_6]').val(1);     //狂人
        $('select[name=job_7]').val(0);     //狂信者
        $('select[name=job_19]').val(0);    //黒猫
        $('select[name=job_8]').val(0);     //妖狐
        $('select[name=job_9]').val(0);     //背徳者
        $('select[name=job_16]').val(0);    //てるてる
        $('select[name=job_17]').val(0);    //恋人
        $('select[name=job_10]').val(0);    //猫又
        $('select[name=job_11]').val(0);    //共有者
        $('select[name=job_18]').val(0);    //パン屋
        $('select[name=job_12]').val(0);    //役人
        $('select[name=job_13]').val(0);    //怪盗
        $('select[name=job_14]').val(0);    //狼憑き
        $('select[name=job_15]').val(0);    //ものまね
        $('input[name=yakukakenashi]').prop("checked", false);   //役欠けなし
    });
    addBtn(h, "12a猫", () => {
        $('select[name=job_1]').val(3);     //人狼
        $('select[name=job_4]').val(1);     //占い師
        $('select[name=job_3]').val(1);     //狩人
        $('select[name=job_5]').val(1);     //霊能者
        $('select[name=job_6]').val(1);     //狂人
        $('select[name=job_7]').val(0);     //狂信者
        $('select[name=job_19]').val(0);    //黒猫
        $('select[name=job_8]').val(0);     //妖狐
        $('select[name=job_9]').val(0);     //背徳者
        $('select[name=job_16]').val(0);    //てるてる
        $('select[name=job_17]').val(0);    //恋人
        $('select[name=job_10]').val(1);    //猫又
        $('select[name=job_11]').val(0);    //共有者
        $('select[name=job_18]').val(0);    //パン屋
        $('select[name=job_12]').val(0);    //役人
        $('select[name=job_13]').val(0);    //怪盗
        $('select[name=job_14]').val(0);    //狼憑き
        $('select[name=job_15]').val(0);    //ものまね
        $('input[name=yakukakenashi]').prop("checked", false);   //役欠けなし
    });
    addBtn(h, "14d猫", () => {
        $('select[name=job_1]').val(3);     //人狼
        $('select[name=job_4]').val(1);     //占い師
        $('select[name=job_3]').val(1);     //狩人
        $('select[name=job_5]').val(1);     //霊能者
        $('select[name=job_6]').val(0);     //狂人
        $('select[name=job_7]').val(1);     //狂信者
        $('select[name=job_19]').val(0);    //黒猫
        $('select[name=job_8]').val(1);     //妖狐
        $('select[name=job_9]').val(1);     //背徳者
        $('select[name=job_16]').val(0);    //てるてる
        $('select[name=job_17]').val(0);    //恋人
        $('select[name=job_10]').val(1);    //猫又
        $('select[name=job_11]').val(2);    //共有者
        $('select[name=job_18]').val(0);    //パン屋
        $('select[name=job_12]').val(0);    //役人
        $('select[name=job_13]').val(0);    //怪盗
        $('select[name=job_14]').val(0);    //狼憑き
        $('select[name=job_15]').val(0);    //ものまね
        $('input[name=yakukakenashi]').prop("checked", false);   //役欠けなし
    });

    h.append('<h3 style="width: 50%; margin-left: auto; margin-right: auto; border-bottom: 1px solid gray"></h3>');

    addBtn(h, "8cfo", () => {
        $('select[name=job_1]').val(2);     //人狼
        $('select[name=job_4]').val(1);     //占い師
        $('select[name=job_3]').val(0);     //狩人
        $('select[name=job_5]').val(1);     //霊能者
        $('select[name=job_6]').val(1);     //狂人
        $('select[name=job_7]').val(0);     //狂信者
        $('select[name=job_19]').val(0);    //黒猫
        $('select[name=job_8]').val(0);     //妖狐
        $('select[name=job_9]').val(0);     //背徳者
        $('select[name=job_16]').val(0);    //てるてる
        $('select[name=job_17]').val(0);    //恋人
        $('select[name=job_10]').val(0);    //猫又
        $('select[name=job_11]').val(2);    //共有者
        $('select[name=job_18]').val(0);    //パン屋
        $('select[name=job_12]').val(0);    //役人
        $('select[name=job_13]').val(0);    //怪盗
        $('select[name=job_14]').val(0);    //狼憑き
        $('select[name=job_15]').val(0);    //ものまね
        $('input[name=yakukakenashi]').prop("checked", false);   //役欠けなし
    });
    addBtn(h, "12b", () => {
        $('select[name=job_1]').val(2);     //人狼
        $('select[name=job_4]').val(1);     //占い師
        $('select[name=job_3]').val(1);     //狩人
        $('select[name=job_5]').val(1);     //霊能者
        $('select[name=job_6]').val(1);     //狂人
        $('select[name=job_7]').val(0);     //狂信者
        $('select[name=job_19]').val(0);    //黒猫
        $('select[name=job_8]').val(1);     //妖狐
        $('select[name=job_9]').val(0);     //背徳者
        $('select[name=job_16]').val(0);    //てるてる
        $('select[name=job_17]').val(0);    //恋人
        $('select[name=job_10]').val(0);    //猫又
        $('select[name=job_11]').val(0);    //共有者
        $('select[name=job_18]').val(0);    //パン屋
        $('select[name=job_12]').val(0);    //役人
        $('select[name=job_13]').val(0);    //怪盗
        $('select[name=job_14]').val(0);    //狼憑き
        $('select[name=job_15]').val(0);    //ものまね
        $('input[name=yakukakenashi]').prop("checked", false);   //役欠けなし
    });
    addBtn(h, "17a", () => {
        $('select[name=job_1]').val(3);     //人狼
        $('select[name=job_4]').val(1);     //占い師
        $('select[name=job_3]').val(1);     //狩人
        $('select[name=job_5]').val(1);     //霊能者
        $('select[name=job_6]').val(1);     //狂人
        $('select[name=job_7]').val(0);     //狂信者
        $('select[name=job_19]').val(0);    //黒猫
        $('select[name=job_8]').val(1);     //妖狐
        $('select[name=job_9]').val(0);     //背徳者
        $('select[name=job_16]').val(0);    //てるてる
        $('select[name=job_17]').val(0);    //恋人
        $('select[name=job_10]').val(0);    //猫又
        $('select[name=job_11]').val(2);    //共有者
        $('select[name=job_18]').val(0);    //パン屋
        $('select[name=job_12]').val(0);    //役人
        $('select[name=job_13]').val(0);    //怪盗
        $('select[name=job_14]').val(0);    //狼憑き
        $('select[name=job_15]').val(0);    //ものまね
        $('input[name=yakukakenashi]').prop("checked", false);   //役欠けなし
    });

    h.append('<h3 style="width: 50%; margin-left: auto; margin-right: auto; border-bottom: 1px solid gray"></h3>');

    addBtn(h, "八割", () => {
        $('select[name=job_1]').val(2);     //人狼
        $('select[name=job_4]').val(2);     //占い師
        $('select[name=job_3]').val(0);     //狩人
        $('select[name=job_5]').val(0);     //霊能者
        $('select[name=job_6]').val(1);     //狂人
        $('select[name=job_7]').val(0);     //狂信者
        $('select[name=job_19]').val(0);    //黒猫
        $('select[name=job_8]').val(0);     //妖狐
        $('select[name=job_9]').val(0);     //背徳者
        $('select[name=job_16]').val(0);    //てるてる
        $('select[name=job_17]').val(0);    //恋人
        $('select[name=job_10]').val(0);    //猫又
        $('select[name=job_11]').val(0);    //共有者
        $('select[name=job_18]').val(0);    //パン屋
        $('select[name=job_12]').val(0);    //役人
        $('select[name=job_13]').val(1);    //怪盗
        $('select[name=job_14]').val(0);    //狼憑き
        $('select[name=job_15]').val(0);    //ものまね
        $('input[name=yakukakenashi]').prop("checked", false);   //役欠けなし
    });
    addBtn(h, "夏至", () => {
        $('select[name=job_1]').val(1);     //人狼
        $('select[name=job_4]').val(0);     //占い師
        $('select[name=job_3]').val(0);     //狩人
        $('select[name=job_5]').val(0);     //霊能者
        $('select[name=job_6]').val(1);     //狂人
        $('select[name=job_7]').val(0);     //狂信者
        $('select[name=job_19]').val(0);    //黒猫
        $('select[name=job_8]').val(0);     //妖狐
        $('select[name=job_9]').val(0);     //背徳者
        $('select[name=job_16]').val(0);    //てるてる
        $('select[name=job_17]').val(0);    //恋人
        $('select[name=job_10]').val(0);    //猫又
        $('select[name=job_11]').val(0);    //共有者
        $('select[name=job_18]').val(0);    //パン屋
        $('select[name=job_12]').val(0);    //役人
        $('select[name=job_13]').val(0);    //怪盗
        $('select[name=job_14]').val(0);    //狼憑き
        $('select[name=job_15]').val(0);    //ものまね
        $('input[name=yakukakenashi]').prop("checked", true);   //役欠けなし
    });
    addBtn(h, "微細", () => {
        $('select[name=job_1]').val(2);     //人狼
        $('select[name=job_4]').val(1);     //占い師
        $('select[name=job_3]').val(1);     //狩人
        $('select[name=job_5]').val(1);     //霊能者
        $('select[name=job_6]').val(0);     //狂人
        $('select[name=job_7]').val(0);     //狂信者
        $('select[name=job_19]').val(1);    //黒猫
        $('select[name=job_8]').val(1);     //妖狐
        $('select[name=job_9]').val(1);     //背徳者
        $('select[name=job_16]').val(0);    //てるてる
        $('select[name=job_17]').val(2);    //恋人
        $('select[name=job_10]').val(1);    //猫又
        $('select[name=job_11]').val(0);    //共有者
        $('select[name=job_18]').val(0);    //パン屋
        $('select[name=job_12]').val(0);    //役人
        $('select[name=job_13]').val(0);    //怪盗
        $('select[name=job_14]').val(1);    //狼憑き
        $('select[name=job_15]').val(0);    //ものまね
        $('input[name=yakukakenashi]').prop("checked", false);   //役欠けなし
    });

    h.append('<h3 style="margin: 10px"></h3>');
};

var timer = false;
function preventMash(){
    if (timer != false)  clearTimeout(timer);
	timer = setTimeout(function() {
		$('input[value=村設定変更]').trigger("click");
		timer = false;
	}, 1000);
}
