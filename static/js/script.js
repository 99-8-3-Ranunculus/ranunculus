////////// 메인 페이지 //////////


// https://openweathermap.org/current
// https://openweathermap.org/weather-conditions
const API_KEY = "9eb9bef9a874a362a38c4362cb02b64e";

const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
};

// 제주시 lat = 33.4895

function wetherSparta() {
    const api_url = 'http://spartacodingclub.shop/sparta_api/weather/seoul'

    $.ajax({
        type: "GET",
        url: api_url,
        data: {},
        success: function (response) {
            console.log(response)
            console.log(response.icon)
            let icon = response.icon.split('/').at(-1)
            console.log(icon)
            console.log(icon.substring(0,2))

            const WIconDict = {
                '01': "화창한 날 그대에게, 워터리 플로럴",
                '02': "새털 구름같은 포근함, 시프레 클라우드. ",
                '03': "날이 흐려도 진한 향기, 클라우드 오데. ",
                '04': "어둑어둑 꿀꿀한 날, 베이브 클라우드. ",
                '09': "추적추적 내리는 비엔, 라이트 시트러스 ",
                '10': " 보슬보슬 보슬비를 닮은, 허벌 시프레",
                '11': "천둥같이 강렬한, 오리엔탈 머스크",
                '13': "포근한 눈처럼, 푸제르 파우더리",
                '50': "안개꽂 짙은 촉촉 싱그러운, 베이브 브렛",
                'Normal': "그대에게 향기를"
            };
            const WIcon = document.querySelector("#weather span:first-child");
            const WTalk = document.querySelector("#weather span:last-child");
            const iconUrl = `https://openweathermap.org/img/wn/${icon.substring(0,2)}d.png`
            WIcon.innerHTML = `<img src="${iconUrl}">`;
            WTalk.innerText = WIconDict[icon.substring(0,2)]
        }
    })
}

//
// function onGeoSucess(position) {
//     console.log(position)
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;
//     const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}`;
//     fetch(API_URL)
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data)
//             const WIcon = document.querySelector("#weather span:first-child");
//             const WTalk = document.querySelector("#weather span:last-child");
//             const WMainList = [];
//             const WIconDict = {
//                 'Rain': "추적추적 내리는 비엔, 라이트 시트러스 ",
//                 'Drizzle': " 보슬보슬 보슬비를 닮은, 허벌 시프레",
//                 'Clear': "화창한 날 그대에게, 워터리 플로럴",
//                 'Clouds': "날이 흐려도 진한 향기, 클라우드 오데. ",
//                 'Thunderstorm': "천둥같이 강렬한, 오리엔탈 머스크",
//                 'Snow': "포근한 눈처럼, 푸제르 파우더리",
//                 'Mist': "안개꽂 짙은 촉촉 싱그러운, 베이브 브렛",
//                 'Normal': "그대에게 향기를"
//             };
//             console.log("여기 아래에 data.weather 어레이")
//             console.log(data.weather)
//             console.log(data.weather.at(0).icon)
//             // 들어오는 날씨 정보 리스트
//             for (let i = 0; i < data.weather.length; i++) {
//                 WMainList.push(data.weather[i].main)
//             }
//             console.log(WMainList.at(0))
//
//             const iconUrl = `https://openweathermap.org/img/wn/${data.weather.at(0).icon}.png`;
//             WIcon.innerHTML = `<img src="${iconUrl}">`;
//             WTalk.innerText = WIconDict[WMainList.at(0)]
//         })
// }
//
// function onGeoError() {
//     alert("사용자의 위치를 찾을 수 없음");
//     const WIcon = document.querySelector("#weather span:first-child");
//     const WTalk = document.querySelector("#weather span:last-child");
//     WIcon.innerHTML = `<i style="margin: 10px 10px 10px 10px" class="fa fa-pagelines fa-2x" aria-hidden="true"></i>`
//     WTalk.innerText = "꽃처럼 향기로운 당신에게"
// }

// navigator.geolocation.getCurrentPosition(onGeoSucess, onGeoError, options);
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
                                <div id="review_contents" class="card">
                                    <div class="card-content">
                                        <p id="card_title" class="title">
                                            “${content}”
                                        </p>
                                        <p id="card_subtitle" class="subtitle">
                                            - ${nickName}
                                        </p>
                                    </div>
                                </div><br>  
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


////////// 로그인 페이지 //////////

function sign_up() {
    let username = $("#input-username").val()
    let password = $("#input-password").val()
    let password2 = $("#input-password2").val()
    let number = $("#input-number").val()
    console.log(username, password, password2, number)

    if ($("#help-id").hasClass("is-danger")) {
        alert("아이디를 다시 확인해주세요.")
        return;
    } else if (!$("#help-id").hasClass("is-success")) {
        alert("아이디 중복확인을 해주세요.")
        return;
    }

    if (password == "") {
        $("#help-password").text("비밀번호를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-password").focus()
        return;
    } else if (!is_password(password)) {
        $("#help-password").text("비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자").removeClass("is-safe").addClass("is-danger")
        $("#input-password").focus()
        return
    } else {
        $("#help-password").text("사용할 수 있는 비밀번호입니다.").removeClass("is-danger").addClass("is-success")
    }

    if (password2 == "") {
        $("#help-password2").text("비밀번호를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-password2").focus()
        return;
    } else if (password2 != password) {
        $("#help-password2").text("비밀번호가 일치하지 않습니다.").removeClass("is-safe").addClass("is-danger")
        $("#input-password2").focus()
        return;
    } else {
        $("#help-password2").text("비밀번호가 일치합니다.").removeClass("is-danger").addClass("is-success")
    }

    if (number == "") {
        $("#help-number").text("전화번호를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#help-number").focus()
        return;
    } else if (!is_number(number)) {
        $("#help-number").text("전화번호 형식을 확인해주세요. 000-0000-000").removeClass("is-safe").addClass("is-danger")
        return;
    } else {
        $("#help-number").text("바른 형식입니다.").removeClass("is-danger").addClass("is-success")
    }

    $.ajax({
        type: "POST",
        url: "/sign_up/save",
        data: {
            username_give: username,
            password_give: password,
            number_give: number
        },
        success: function (response) {
            alert("회원가입을 축하드립니다!")
            window.location.replace("/login")
        }
    });
}

function sign_in() {
    let username = $("#input-username").val()
    let password = $("#input-password").val()

    if (username == "") {
        $("#help-id-login").text("아이디를 입력해주세요.")
        $("#input-username").focus()
        return;
    } else {
        $("#help-id-login").text("")
    }

    if (password == "") {
        $("#help-password-login").text("비밀번호를 입력해주세요.")
        $("#input-password").focus()
        return;
    } else {
        $("#help-password-login").text("")
    }

    $.ajax({
        type: "POST",
        url: "/sign_in",
        data: {
            username_give: username,
            password_give: password
        },
        success: function (response) {
            if (response['result'] == 'success') {
                $.cookie('mytoken', response['token'], {path: '/'});
                alert(response['msg'])
                window.location.replace("/")
            } else {
                alert(response['msg'])
            }
        }
    });
}

function sign_out() {
    $.removeCookie('mytoken');
    alert('정상적으로 로그아웃 되었습니다.')
    window.location.href = "/"
}

function toggle_sign_up() {
    $("#sign-up-box").toggleClass("is-hidden")
    $("#div-sign-in-or-up").toggleClass("is-hidden")
    $("#help-id-login").toggleClass("is-hidden")
    $("#help-password-login").toggleClass("is-hidden")
    $("#btn-check-dup").toggleClass("is-hidden")
    $("#help-id").toggleClass("is-hidden")
    $("#help-password").toggleClass("is-hidden")
    $("#help-password2").toggleClass("is-hidden")
    $("#help-number").toggleClass("is-hidden")
}

function is_nickname(asValue) {
    var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
    return regExp.test(asValue);
}

function is_password(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    return regExp.test(asValue);
}

function is_number(asValue) {
    var regEXP = /^\d{2,3}-\d{3,4}-\d{4}$/;
    return regEXP.test(asValue);
}

function check_dup() {
    let username = $("#input-username").val()
    console.log(username)

    if (username === "") {
        $("#help-id").text("아이디를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-username").focus()
        return;
    }

    if (!is_nickname(username)) {
        $("#help-id").text("아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이").removeClass("is-safe").addClass("is-danger")
        $("#input-username").focus()
        return;
    }

    $("#help-id").addClass("is-loading")

    $.ajax({
        type: "POST",
        url: "/sign_up/check_dup",
        data: {
            username_give: username
        },
        success: function (response) {

            if (response["exists"]) {
                $("#help-id").text("이미 존재하는 아이디입니다.").removeClass("is-safe").addClass("is-danger")
                $("#input-username").focus()
            } else {
                $("#help-id").text("사용할 수 있는 아이디입니다.").removeClass("is-danger").addClass("is-success")
            }
            $("#help-id").removeClass("is-loading")

        }
    });
}

////////// 로그인 페이지 끝 //////////