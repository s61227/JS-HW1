var search = document.getElementById('searchPlace');
var list = document.querySelector('.placeList');
var placeBtn = document.querySelector('.hotBlock');
var data;
var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null); 

// xhr.onload 當確定資料有回傳時，便執行以下function
xhr.onload = function(){
    data = JSON.parse(xhr.responseText).result.records;
    updataZone();
}

// 監聽事件: 下拉選單選區域 & 按鈕點選區域 
search.addEventListener('change',updateData,false);
placeBtn.addEventListener('click',updateData,false);

//將JSON資料套入網頁中列出資料
function updateData(e){
    var select = e.target.value;
    var place = '';
    var total = data.length;
    for(var i=0; i<total; i++){
        if(select == data[i].Zone){
            document.querySelector('.placeTitle').textContent = data[i].Zone;
            place += '<li class="placeInfo"><section class="infoTop" style="background-image:url('+data[i].Picture1+')";><h3>'+data[i].Name+'</h3><small>'+data[i].Zone+'</small></section><section class="infoBottom"><p><span><i class="fa fa-clock-o" aria-hidden="true"></i></span><span>'+data[i].Opentime+'</span></p><p><span><i class="fa fa-map-marker" aria-hidden="true"></i></span><span>'+data[i].Add+'</span></p><p><span><i class="fa fa-mobile" aria-hidden="true"></i>'+data[i].Tel+'</span><span class="tag"><i class="fa fa-tag" aria-hidden="true"></i>'+data[i].Ticketinfo+'</span></p></section></li>';    
        }
        list.innerHTML = place;
    }
}

//撈出JSON資料裡有多少區域選項並列出
function updataZone(){
    var total = data.length;
    var newData = [];

    //用filter篩選濾掉重複的項目
    for(var i=0; i<total; i++){
        newData.push(data[i].Zone);
        newData = newData.filter(function(element, index, newData){
            return newData.indexOf(element)=== index;
        });
    }

    //將篩選過的項目資料列於網頁中 (用createElement)
    for(var i=0; i<newData.length; i++){
        var optionZone = document.createElement('option');
        optionZone.textContent = newData[i];
        optionZone.setAttribute('value',newData[i]);
        search.appendChild(optionZone);
    }   
}

