chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "Action") {
        window.alert('部屋をお掃除するお！');
        for(var i=1; i<5; i++){
            RemoveRoom_Friends();
            RemoveRoom_Chat();
        }
	}
});

window.addEventListener("load", addRoleSettings, false);

function RemoveRoom_Chat(){
    var label = document.getElementsByClassName('label');

    for(var i=0; label.length>i; i++){
        if(label[i].textContent === undefined) continue;
        if(label[i].textContent.includes('雑談系')){
            //console.log(label[i].textContent)
            label[i].parentElement.parentElement.remove();
        }
        if(label[i].textContent.includes('身内')){
            //console.log(label[i].textContent)
            label[i].parentElement.parentElement.remove();
        }
    }
}

function RemoveRoom_Friends(){
    var icon = document.getElementsByClassName('icon-lock');

    if(icon.length != 0){
        for(var i=0; icon.length>i; i++){
            icon[i].parentElement.parentElement.parentElement.remove();
        }
    }
}

function addRoleSettings(){
    'use strict';
    const addBtn = (h, title, func) => {
        return $("<button>").text(title).click(func).appendTo(h);
    }

    const h = $("<div>").css({
        "text-align": "center",
        "background-color": "darkgray",
        "border": "3px solid gray",
        "border-radius": "10px",
    }).prependTo(".voteAction").append("<h3>配役設定</h3>");
    h.attr("id", "rolesSetting");

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
        $('select[name=teiin]').val(10).trigger("change");
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
        $('select[name=teiin]').val(12).trigger("change");
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
        $('select[name=teiin]').val(14).trigger("change");
    });
};
