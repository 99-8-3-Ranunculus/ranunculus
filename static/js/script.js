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