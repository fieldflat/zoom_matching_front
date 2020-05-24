"use strict";

$(function() {
  
  //
  // ログインボタン押下後の処理 (sessionにidとdisplay_nameを保持)
  //

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
  // サインインボタン押下後の処理 (sessionにidとdisplay_nameを保持)
  //
  $("#login_submit_button").on("click", function () {

    $("#user_id_error").hide();
    $("#password_error").hide();

    let uid = $("#user_id").val();
    let password = $("#password").val();
    let hash_password = (new jsSHA(password, 'ASCII')).getHash('SHA-512', 'HEX');

    if (uid == "" || password == "") {
      if (uid == "") {
        $("#user_id_error").show();
      }
      if (password == "") {
        $("#password_error").show();
      }
    } else {
      $.ajax({
        url: BackendBaseURL + "login",
        type: "POST",
        data: {
          uid: uid,
          password: hash_password,
        },
        dataType: "json",
        timespan: 10000,
      }).done(function (data, textStatus, jqXHR) {
        window.sessionStorage.setItem('id', data.data.ID);
        window.sessionStorage.setItem('user_id', data.data.uid);
        window.sessionStorage.setItem('display_name', data.data.display_name);

        $("#login_submit_button").addClass("is-loading");

        setTimeout(function () {
          window.location.href = "index.html";
        }, 3000);

      }).fail(function (jqXHR, textStatus, errorThrown) {
        $("#login_submit_button").addClass("is-loading");
        setTimeout(function () {
          $("#user_not_found").show();
          $("#login_submit_button").removeClass("is-loading");
        }, 2000);

      }).always(function () {

      });
    }

  });
  
});
