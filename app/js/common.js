'use strict';

$(function () {

  //
  // base URL
  //

  // 開発環境
  const BackendBaseURL = "http://localhost:8080/";
  const FrontBaseURL = "file:///Users/hiratatomonori/Desktop/zoom_matching_front/app/";

  // 本番環境
  // const BackendBaseURL = "https://go-api-server-nult.herokuapp.com/";
  // const FrontBaseURL = "https://nult-9c9e8.web.app/";

  //
  // ログインしているかでnavbarの表示を変化させる。
  //
  if (window.sessionStorage.getItem("id") != "null") {
    console.log("aaa");
    $("#sign_up_button").hide();
    $("#login_button").hide();
    $("#user_name").show();
    $("#user_name").html(window.sessionStorage.getItem("display_name"));
    $("#logout_button").show();
  } else {
    $("#sign_up_button").show();
    $("#login_button").show();
    $("#user_name").hide();
    $("#logout_button").hide();
  }

  //
  // ログアウト
  //
  $("#logout_button").on("click", function () {
    window.sessionStorage.setItem('id', null);
    window.sessionStorage.setItem('user_id', null);
    window.sessionStorage.setItem('display_name', null);

    $("#sign_up_button").show();
    $("#login_button").show();
    $("#user_name").hide();
    $("#logout_button").hide();

    location.reload();
  });


})