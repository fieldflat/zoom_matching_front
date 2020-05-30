"use strict";

$(function() {

  //
  // base URL
  //

  // 開発環境
  const BackendBaseURL = "http://localhost:8080/";
  const FrontBaseURL = "file:///Users/hiratatomonori/Desktop/zoom_matching_front/app/";

  // 本番環境
  // const BackendBaseURL = "https://go-api-server-nult.herokuapp.com/";
  // const FrontBaseURL = "https://nult-9c9e8.web.app/";


  $("#scheduled_time_error").hide();
  $("#scheduled_day_error").hide();
  $("#title_error").hide();
  $("#contents_error").hide();
  $("#fee_error").hide();

  $("#submit_button").on("click", function() {
    $("#scheduled_time_error").hide();
    $("#scheduled_day_error").hide();
    $("#title_error").hide();
    $("#contents_error").hide();
    $("#fee_error").hide();

    const scheduled_time = $("#scheduled_time").val();
    const scheduled_day = $("#scheduled_day").val();
    const title = $("#title").val();
    const contents = $("#contents").val();
    const fee = $("#fee").val();

    console.log(title, contents, scheduled_time, scheduled_day);

    if (scheduled_time == "" || scheduled_day == "" || title == "" || contents == "") {
      if (scheduled_time == "") {
        $("#scheduled_time_error").show();
      }
      if (scheduled_day == "") {
        $("#scheduled_day_error").show();
      }
      if (title == "") {
        $("#title_error").show();
      }
      if (contents == "") {
        $("#contents_error").show();
      }
    } else {
      const day_list = scheduled_day.split("-");
      const time_list = scheduled_time.split(":");
      const date = new Date(
        day_list[0],
        day_list[1]-1,
        day_list[2],
        time_list[0],
        time_list[1],
        time_list[2]
      );

      const scheduled_date_list = date.toString().split(" ");
      const scheduled_date =
        scheduled_date_list[0] +
        " " +
        scheduled_date_list[1] +
        " " +
        scheduled_date_list[2] +
        " " +
        scheduled_date_list[4] +
        " JST " +
        scheduled_date_list[3];
        
      console.log(scheduled_date);

      $.ajax({
        url: BackendBaseURL + "posts",
        type: "POST",
        data: {
          title: title,
          contents: contents,
          scheduled_date: scheduled_date,
          deadline_date: scheduled_date,
          uid: window.sessionStorage.getItem("user_id"),
          fee: fee
        },
        dataType: "json",
        timespan: 10000
      })
        .done(function(data, textStatus, jqXHR) {
          $("#submit_button").addClass("is-loading");
          setTimeout(function() {
            window.location.href = "index.html";
          }, 3000);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {})
        .always(function() {});
    }
  });
});
