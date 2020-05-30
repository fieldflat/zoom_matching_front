"use strict";

$(function() {
  //
  // base URL
  //

  // 開発環境
  // const BackendBaseURL = "http://localhost:8080/";
  // const FrontBaseURL = "file:///Users/hiratatomonori/Desktop/zoom_matching_front/app/";

  // 本番環境
  const BackendBaseURL = "https://go-api-server-nult.herokuapp.com/";
  const FrontBaseURL = "https://nult-9c9e8.web.app/";

  //
  // サインインボタン押下後の処理 (sessionにidとdisplay_nameを保持)
  //
  $("#sign_in_button").on("click", function(){

    $("#first_name_error").hide();
    $("#last_name_error").hide();
    $("#display_name_error").hide();
    $("#user_id_error").hide();
    $("#email_error").hide();
    $("#password_error").hide();
    $("#user_id_duplicate_error").hide();

    let first_name = $("#first_name").val();
    let last_name = $("#last_name").val();
    let display_name = $("#display_name").val();
    let uid = $("#user_id").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let hash_password = (new jsSHA(password, 'ASCII')).getHash('SHA-512', 'HEX');

    if (first_name == "" || last_name == "" || display_name == "" || uid == "" || email == "" || password == "") {
      if (first_name == "") {
        $("#first_name_error").show();
      } 
      if (last_name == "") {
        $("#last_name_error").show();
      } 
      if (display_name == "") {
        $("#display_name_error").show();
      } 
      if (uid == "") {
        $("#user_id_error").show();
      } 
      if (email == "") {
        $("#email_error").show();
      } 
      if (password == "") {
        $("#password_error").show();
      }
    } else {
      $.ajax({
        url: BackendBaseURL + "users",
        type: "POST",
        data: {
          first_name: first_name,
          last_name: last_name,
          display_name: display_name,
          uid: uid,
          email: email,
          password: hash_password,
        },
        dataType: "json",
        timespan: 10000,
      }).done(function (data, textStatus, jqXHR) {
        window.sessionStorage.setItem('id', data.data.ID);
        window.sessionStorage.setItem('user_id', data.data.uid);
        window.sessionStorage.setItem('display_name', data.data.display_name);

        $("#sign_in_button").addClass("is-loading");

        setTimeout(function () {
          window.location.href = "index.html";
        }, 3000);

      }).fail(function (jqXHR, textStatus, errorThrown) {
        $("#user_id_duplicate_error").show();

      }).always(function () {

      });
    }
    
  });

});
