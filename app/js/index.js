'use strict';

$(function() {

  //
  // base URL
  //

  // 開発環境
  const BackendBaseURL = "http://localhost:8080/";
  const FrontBaseURL = "file:///Users/hiratatomonori/Desktop/zoom_matching_front/app/";

  // 本番環境
  // const BackendBaseURL = "http://localhost:8080/";
  // const FrontBaseURL = "file:///Users/hiratatomonori/Desktop/zoom_matching_front/app/";

  //
  // LT情報を返す(dataを元にLT情報を作成する)
  //
  function lt_information(data) {
    let str = `
      <div class="column is-one-third show_action" id="${data.id}">
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
              <p class="content">${data.content}</p>
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2016-1-1">${data.time}</time>
            </div>
            <p id="article_id">id: ${data.id}</p>
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
    
    let datas = [
      {
        id: Math.floor(Math.random() * Math.floor(10 ** 10)),
        title: "タイトル1",
        user_id: "field_flat1",
        content: "コンテンツ．コンテンツ．コンテンツ．1",
        time: "2020 1/4 15:00 ~ 16:00"
      },
      {
        id: Math.floor(Math.random() * Math.floor(10 ** 10)),
        title: "タイトル2",
        user_id: "field_flat2",
        content: "コンテンツ．コンテンツ．コンテンツ．2",
        time: "2020 1/4 15:00 ~ 17:00"
      },
      {
        id: Math.floor(Math.random() * Math.floor(10 ** 10)),
        title: "タイトル3",
        user_id: "field_flat3",
        content: "コンテンツ．コンテンツ．コンテンツ．3",
        time: "2020 1/4 15:00 ~ 18:00"
      },
      {
        id: Math.floor(Math.random() * Math.floor(10 ** 10)),
        title: "タイトル4",
        user_id: "field_flat4",
        content: "コンテンツ．コンテンツ．コンテンツ．4",
        time: "2020 1/4 15:00 ~ 19:00"
      },
      {
        id: Math.floor(Math.random() * Math.floor(10 ** 10)),
        title: "タイトル5",
        user_id: "field_flat5",
        content: "コンテンツ．コンテンツ．コンテンツ．5",
        time: "2020 1/4 15:00 ~ 20:00"
      },
      {
        id: Math.floor(Math.random() * Math.floor(10 ** 10)),
        title: "タイトル6",
        user_id: "field_flat6",
        content: "コンテンツ．コンテンツ．コンテンツ．6",
        time: "2020 1/4 15:00 ~ 21:00"
      }
    ];

    for (let i = 0; i < num; i++) {
      $(".columns").append(lt_information(datas[i]));
    }
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
  $(window).on("scroll", function() {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight <= 0.02) {
      //スクロールの位置が下部2%の範囲に来た場合
      append_lt_information(6);
      console.log(window.sessionStorage.getItem("session_save"));
    }
  });

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