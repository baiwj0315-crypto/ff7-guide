
(function () {
  var KEY = "ff7-guide-reviews";
  var SEED = [{ author: "张三", date: "2024-12-03", content: "萨菲罗斯男人中的男人。" }];
  var listEl = document.getElementById("review-list");
  var form = document.getElementById("review-form");
  var toast = document.getElementById("toast");

  function load() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { raw = null; }
    if (!raw) return SEED.slice();
    try {
      var data = JSON.parse(raw);
      if (!Array.isArray(data) || data.length === 0) return SEED.slice();
      return data;
    } catch (e) {
      return SEED.slice();
    }
  }

  function save(items) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
  }

  function render(items) {
    listEl.innerHTML = "";
    items.forEach(function (item) {
      var article = document.createElement("article");
      article.className = "review";
      var head = document.createElement("div");
      head.className = "review-head";
      var author = document.createElement("strong");
      author.textContent = item.author || "";
      var time = document.createElement("time");
      time.textContent = item.date || "";
      time.dateTime = item.date || "";
      head.appendChild(author);
      head.appendChild(time);
      var body = document.createElement("p");
      body.textContent = item.content || "";
      article.appendChild(head);
      article.appendChild(body);
      listEl.appendChild(article);
    });
  }

  var items = load();
  save(items);
  render(items);

  document.getElementById("btn-add").addEventListener("click", function () {
    form.hidden = false;
    toast.textContent = "";
    document.getElementById("author").focus();
  });
  document.getElementById("btn-cancel").addEventListener("click", function () {
    form.reset();
    form.hidden = true;
    toast.textContent = "";
  });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var author = document.getElementById("author").value.trim();
    var content = document.getElementById("content").value.trim();
    if (!author || !content) {
      toast.textContent = "请填写发布人和评价内容";
      return;
    }
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var day = String(now.getDate()).padStart(2, "0");
    var date = now.getFullYear() + "-" + month + "-" + day;
    items = load();
    items.push({ author: author, date: date, content: content });
    save(items);
    render(items);
    form.reset();
    form.hidden = true;
    toast.textContent = "发布成功";
  });
})();
