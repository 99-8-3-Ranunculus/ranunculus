$(document).ready(function () {
    show_review();
});


function show_review() {
    $('.card-content').empty()
    $.ajax({
        type: 'GET',
        url: '/review/show',
        data: {},
        success: function (response) {
            let rows = response['reviews']
            for (let i = 0; i < rows.length; i++) {
                let nickName = rows[i]['nickName']
                let content = rows[i]['content']

                let temp_html = `    
                                <div class="card-content">
                                    <p id="card_title" class="title">
                                        “${content}”
                                    </p>
                                    <p id="card_subtitle" class="subtitle">
                                        - ${nickName}
                                    </p>
                                </div>
                                <hr>
                                `;
                $('#review_contents').append(temp_html)
            }
        }

    });
}


function save_review() {
    let nickName = '익명의 참가자' //여기에 회원 아이디
    let content = $('#content').val()

    if (content === '') {
        alert("리뷰 내용을 입력해주세요!")
    } else {
        $.ajax({
            type: 'POST',
            url: '/review/show',
            data: {
                nickNameGive: nickName,
                contentGive: content,
            },
            success: function (response) {
                alert(response['msg'])
                window.location.reload()
            }
        });

    }
}


// function toggle_review_form() {
//     $("#review_form").toggleClass("is-hidden")
// }


function if_not_member() {
    $("#review_form").toggleClass("is-hidden")
}


function logout() {
    $.removeCookie('mytoken');
    alert('정상 로그아웃 되었습니다.')
    window.location.href="/"
}
=======
// https://openweathermap.org/current
// https://openweathermap.org/weather-conditions
const API_KEY = "9eb9bef9a874a362a38c4362cb02b64e";

function onGeoSucess(position) {
    console.log(position)
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat)
    console.log(lon)

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}`;
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            const WIcon = document.querySelector("#weather span:first-child");
            const WTalk = document.querySelector("#weather span:last-child");
            const WMainList =[] ;
            const WIconDict= {
                'Rain' : "비오는 날 출력될 문구",
                'Drizzle' : " 이슬 비 오는날 출력될 문구",
                'Clear' : "맑은 날 출력될 문구",
                'Claud' : "흐린 날 출력될 문구",
                'Thunderstorm' : "천둥번개 치는 날 출력될 문구",
                'Snow' : "눈 오는 날 출력될 문구",
                'Normal' : "날씨 정보가 불러와 지지 않을 때 출력 될 문구"
            } ;
            // 들어오는 날씨 정보 리스트
            for (let i = 0; i < data.weather.length; i++){
                WMainList.push(data.weather[i].main)
            }
            console.log(WIconDict[WMainList[0]])
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather.at(1).icon}.png`;
            WIcon.innerHTML = `<img src="${iconUrl}">`;
            WTalk.innerText = WIconDict[WMainList[0]]
        })
}

function onGeoError() {
    alert("사용자의 위치를 찾을 수 없음");
}

function getWeather(data) {
    const WIcon = document.querySelector("#weather span:first-child");
    const WTalk = document.querySelector("#weather span:last-child");
    const WMain = data.weather[0].main
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    WIcon.innerHTML = `<img src="${iconUrl}">`;
    if (WMain === "rain") {
        WTalk.innerText = "비오는 날 문구"
    } else if (WMain === "") {
        WTalk.innerText = '';
    } else {
        WTalk.innerText = "그냥 문구"
    }
    console.log(data.weather[0].main);
}

navigator.geolocation.getCurrentPosition(onGeoSucess, onGeoError);
// https://developer.mozilla.org/ko/docs/Web/API/Geolocation/getCurrentPosition
>>>>>>> feature/byungno
