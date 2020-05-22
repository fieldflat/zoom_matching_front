'use strict';

$(function() {

  //
  // LT情報を返す(dataを元にLT情報を作成する)
  //
  function lt_information(data) {
    let str = `
    <div class="column is-one-third">
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
              <p class="subtitle is-6">@${data.user_id}</p>
            </div>
          </div>
          <div class="content">
            ${data.contents}
            <a href="#">#css</a> <a href="#">#responsive</a>
            <br>
            <time datetime="2016-1-1">${data.time}</time>
          </div>
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
        title: "タイトル1",
        user_id: "field_flat1",
        contents: "コンテンツ．コンテンツ．コンテンツ．1",
        time: "2020 1/4 15:00 ~ 16:00"
      },
      {
        title: "タイトル2",
        user_id: "field_flat2",
        contents: "コンテンツ．コンテンツ．コンテンツ．2",
        time: "2020 1/4 15:00 ~ 17:00"
      },
      {
        title: "タイトル3",
        user_id: "field_flat3",
        contents: "コンテンツ．コンテンツ．コンテンツ．3",
        time: "2020 1/4 15:00 ~ 18:00"
      },
      {
        title: "タイトル4",
        user_id: "field_flat4",
        contents: "コンテンツ．コンテンツ．コンテンツ．4",
        time: "2020 1/4 15:00 ~ 19:00"
      },
      {
        title: "タイトル5",
        user_id: "field_flat5",
        contents: "コンテンツ．コンテンツ．コンテンツ．5",
        time: "2020 1/4 15:00 ~ 20:00"
      },
      {
        title: "タイトル6",
        user_id: "field_flat6",
        contents: "コンテンツ．コンテンツ．コンテンツ．6",
        time: "2020 1/4 15:00 ~ 21:00"
      }
    ];

    for (let i = 0; i < num; i++) {
      $(".columns").append(lt_information(datas[i]));
    }
  }

  //
  // 最下部まで行ったらLT情報を読み込む
  //
  $(window).bind("scroll", function() {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight <= 0.02) {
      //スクロールの位置が下部5%の範囲に来た場合
      append_lt_information(6);
    } 
  });

  //
  // initial append
  // 
  append_lt_information(6);
})