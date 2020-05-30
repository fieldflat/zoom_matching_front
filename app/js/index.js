'use strict';

$(function() {

  //
  // base URL
  //

  // 開発環境
  const BackendBaseURL = "http://localhost:8080/";
  const FrontBaseURL = "file:///Users/hiratatomonori/Desktop/zoom_matching_front/app/";

  // 本番環境
  const BackendBaseURL = "https://go-api-server-nult.herokuapp.com/";
  const FrontBaseURL = "https://nult-9c9e8.web.app/";

  //
  // LT情報を返す(dataを元にLT情報を作成する)
  //
  function lt_information(data) {
    console.log(data);

    let str = `
      <div class="column is-one-third show_action" id="${data.ID}">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">${data.title}</p>
                <p class="subtitle user_id is-6">@${data.user_id}</p>
              </div>
            </div>
            <div class="contents">
              <p class="content">${data.contents}</p>
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2016-1-1">${data.scheduled_date}</time>
            </div>
            <p id="article_id">id: ${data.ID}</p>
          </div>
        </div>
      </div>
    `;

    return str
  };


  //
  // LT情報をcolumnsに追加する
  //
  function append_lt_information(num) {
    
    // LT情報をajaxで取得する

    $.ajax({
      url: BackendBaseURL + "posts",
      type: "GET",
      dataType: "json",
      timespan: 10000,
    }).done(function (data, textStatus, jqXHR) {
      const datas = data.data;
      for(let i = 0; i < datas.length; i++) {
        $(".columns").append(lt_information(datas[i]));
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {

    }).always(function () {

    });
  }

  //
  // initial append
  // 
  append_lt_information(6);
  // window.sessionStorage.setItem('session_save', 1);
  // console.log(window.sessionStorage.getItem("session_save"));

  //
  // 最下部まで行ったらLT情報を読み込む
  //
  // $(window).on("scroll", function() {
  //   var scrollHeight = $(document).height();
  //   var scrollPosition = $(window).height() + $(window).scrollTop();
  //   if ((scrollHeight - scrollPosition) / scrollHeight <= 0.02) {
  //     //スクロールの位置が下部2%の範囲に来た場合
  //     append_lt_information(6);
  //     console.log(window.sessionStorage.getItem("session_save"));
  //   }
  // });

  //
  // modalを表示させる
  //
  $(document).on("click", ".show_action", function() {
    let title = $(this).find(".title").text();
    let user_id = $(this).find(".user_id").text();
    let content = $(this).find(".content").text();
    let time = $(this).find("time").text();
    let article_id = $(this).find("#article_id").text();

    $(".modal-card-title").html(title);
    $(".modal-user-id").html(user_id);
    $(".modal-content").html(content);
    $(".modal-time").html(time);
    $(".modal-article-id").html(article_id);

    $("div.modal").addClass("is-active");
  });

  // 
  // modalを非表示にする
  //
  $("div.modal-background,button.modal-close").on("click", function() {
    $("div.modal").removeClass("is-active");
  });

})