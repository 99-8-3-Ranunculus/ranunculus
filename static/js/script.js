////////// 메인 페이지 //////////

// https://openweathermap.org/current
// https://openweathermap.org/weather-conditions
const API_KEY = "9eb9bef9a874a362a38c4362cb02b64e";

const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
};

function onGeoSucess(position) {
    console.log(position)
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}`;
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const WIcon = document.querySelector("#weather span:first-child");
            const WTalk = document.querySelector("#weather span:last-child");
            const WMainList = [];
            const WIconDict = {
                'Rain': "비오는 날엔 라이트한 시트러스 ",
                'Drizzle': " 추적추적 이슬비에 허벌 시프레",
                'Clear': "화창한 날 그대에게 워터리 플로럴",
                'Clouds': "날이 흐려도 그대의 향기는 진합니다. ",
                'Thunderstorm': "강렬한 천둥같은 오리엔탈 머스크",
                'Snow': "포근한 눈처럼 푸제르 파우더리",
                'Normal': "그대에게 향기를"
            };
            console.log("여기 아래에 data.weather 어레이")
            console.log(data.weather)
            console.log(data.weather.at(0).icon)
            // 들어오는 날씨 정보 리스트
            for (let i = 0; i < data.weather.length; i++) {
                WMainList.push(data.weather[i].main)
            }
            console.log(WMainList.at(0))

            const iconUrl = `https://openweathermap.org/img/wn/${data.weather.at(0).icon}.png`;
            WIcon.innerHTML = `<img src="${iconUrl}">`;
            WTalk.innerText = WIconDict[WMainList.at(0)]
        })
}

function onGeoError() {
    alert("사용자의 위치를 찾을 수 없음");
    const WTalk = document.querySelector("#weather span:last-child");
    WIcon.innerHTML = ``
    WTalk.innerText = "꽃처럼 향기로운 당신에게"
}

navigator.geolocation.getCurrentPosition(onGeoSucess, onGeoError, options);
// https://developer.mozilla.org/ko/docs/Web/API/Geolocation/getCurrentPosition


////////// 메인 페이지 끝 //////////


////////// 리뷰 페이지 //////////

function show_review() {
    $('#review_contents').empty()
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
    let nickName = document.querySelector(".user_name_hi span strong").innerText
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

////////// 리뷰 페이지 끝 //////////

function logout() {
    $.removeCookie('mytoken');
    alert('로그아웃 되었습니다.')
    window.location.href = "/"
}