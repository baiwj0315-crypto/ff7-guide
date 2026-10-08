
(function () {
  var form = document.getElementById("movie-search");
  var toast = document.getElementById("movie-toast");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var query = document.getElementById("et-search").value.trim();
    if (!query) {
      toast.textContent = "未接入 TMDB。留空时应用会加载热门电影，这里同样没有可显示的列表。";
      return;
    }
    toast.textContent = "未接入 TMDB，无法查询「" + query + "」。本站不包含 API 密钥，也不会显示虚构影片。";
  });
})();
