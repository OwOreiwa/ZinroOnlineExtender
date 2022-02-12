chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "Action") {
        window.alert('部屋をお掃除するお！');
        for(var i=1; i<5; i++){
            RemoveRoom_Friends();
            RemoveRoom_Chat();
        }
	}
});

function RemoveRoom_Chat(){
    var label = document.getElementsByClassName('label');

    for(var i=0; label.length>i; i++){
        if(label[i].textContent === undefined) continue;
        if(label[i].textContent.includes('雑談系')){
            label[i].parentElement.parentElement.remove();
        }
        if(label[i].textContent.includes('身内')){
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
