chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "Action") {
        for(let i=1; i<5; i++){
            RemoveRoom_Friends();
            RemoveRoom_Chat();
        }
	}
});

window.addEventListener("load", LowlightRoom_Chat, false);
window.addEventListener("load", LowlightRoom_Friends, false);
$("body").click(HighlightDisconnected);
$("body").click(HighlightTroll);
window.addEventListener("load", addRoleSettings, false);

$('.btn:contains("開始")').removeAttr("href");
$('.btn:contains("開始")').click(function(){
    $("body").trigger("click")
    var capa = $("select[name=teiin]").val();
    if($("#all_players").children("div").text().slice(-3).includes(capa) != 1){
        var ans = window.confirm("現在のプレイヤー数が定員を満たしていません。\r\nゲームを開始しますか？");
        if(ans){
            window.location.href = "/m/player.php?mode=start";
        }
    }
    else if($("table").css("border-collapse") == "collapse"){
        var ans = window.confirm("回線落ちしているプレイヤーが存在します。\r\nゲームを開始しますか？");
        if(ans){
            window.location.href = "/m/player.php?mode=start";
        }
    }
    else{
        window.location.href = "/m/player.php?mode=start";
    }
});

//------------------------------

function LowlightRoom_Chat(){
    $('.label:contains("雑談系"), .label:contains("身内")').parent().css("background", "gray");
}

function LowlightRoom_Friends(){
    $('.icon-lock').parent().parent().css("background", "gray");
}

function RemoveRoom_Chat(){
    $('.label:contains("雑談系"), .label:contains("身内")').parent().remove();
}

function RemoveRoom_Friends(){
    $('.icon-lock').parent().parent().remove();
}

function HighlightDisconnected(){
    var icon = document.getElementsByClassName('icon-ban-circle');

    if(icon.length != 0){
        icon[0].parentElement.parentElement.parentElement.parentElement.parentElement.style.borderCollapse = "collapse";
        for(let i=0; icon.length>i; i++){
            if(!icon[i].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.textContent.includes("CPU") &&
            !icon[i].parentElement.parentElement.textContent.includes("観戦者")){
                icon[i].parentElement.parentElement.parentElement.style.border = "2px solid red";
                icon[i].parentElement.parentElement.parentElement.style.opacity = "25%";
            }
        }
    }
}

function HighlightTroll(){
    var playerName = document.getElementsByClassName('icon-signal');
    
    if(playerName.length != 0){
        for(let i=0; playerName.length>i; i++){
            if(playerName[i].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.textContent.includes("田代") ||
            playerName[i].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.textContent.includes("松潤")){
                playerName[0].parentElement.parentElement.parentElement.parentElement.parentElement.style.borderCollapse = "collapse";
                playerName[i].parentElement.parentElement.parentElement.style.border = "2px solid purple";
                playerName[i].parentElement.parentElement.parentElement.style.opacity = "25%";
            }
        }
    }
}

var timer = false;
function preventMash(){
    if (timer != false)  clearTimeout(timer);
	timer = setTimeout(function() {
		$('input[value=村設定変更]').trigger("click");
		timer = false;
	}, 2000);
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
