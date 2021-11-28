(function ($) {
  document.getElementById("show").classList.add("show-hidden");

  $("#searchForm").submit(function (e) {});
  var form = $("#searchForm");
  if (form) {
    // form.addEventListener("submit", (e) => {
    //   e.preventDefault();
    //   try {
    //     const phrase = document.getElementById("palindrome").value;
    //     document.getElementById("error").classList.add("error-hidden");
    //     if (phrase.trim().length === 0) {
    //       document.getElementById("error").classList.remove("error-hidden");
    //       return;
    //     }
    //     let str = removeAlphanumerics(phrase.toLowerCase());
    //     if (str === "") {
    //       document.getElementById("error").classList.remove("error-hidden");
    //       return;
    //     }
    //     let result = isPalindrome(str);
    //     let orderedList = document.getElementById("attempts");
    //     if (result) {
    //       let li = document.createElement("li");
    //       li.innerHTML = phrase;
    //       li.className = "is-palindrome";
    //       orderedList.appendChild(li);
    //     } else {
    //       let li = document.createElement("li");
    //       li.innerHTML = phrase;
    //       li.className = "not-palindrome";
    //       orderedList.appendChild(li);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    //});
  }
})(jQuery);

(function ($) {
  $("#show").hide();
  $("#homeLink").hide();
  let error = $("#error").hide();

  const tvurl = "http://api.tvmaze.com/shows";
  let requestConfig = {
    method: "GET",
    url: tvurl,
  };
  //page load ajax
  $.ajax(requestConfig).then(function (response) {
    let data = response;
    console.log(response);
    let ul = $("#showList");
    data.forEach((key) => {
      let li = $("<li class='tvlist'> </li>");
      let link = $(
        "<a class= 'tvlink' id = " +
          key.id +
          " href=" +
          key._links.self.href +
          ">" +
          key.name +
          "</a>"
      );
      li.append(link);
      ul.append(li);
    });
  });

  //search ajax
  $("#search").click(function (e) {
    e.preventDefault();
    $("#showList").text("");
    $("#homeLink").show();
    $("#show").text("");

    let text = $("#search_term").val();
    if (text.trim().length === 0) {
      $("#showList").hide();
      error.show();
      return;
    }
    let tvurl = "http://api.tvmaze.com/search/shows?q=" + text.trim() + "";
    let requestConfig = {
      method: "GET",
      url: tvurl,
    };

    $.ajax(requestConfig).then(function (response) {
      let data = response;
      console.log(response);
      $("#showList").show();
      error.hide();
      let ul = $("#showList");
      data.forEach((key) => {
        let li = $("<li class='tvlist'> </li>");
        let link = $(
          "<a id =" +
            key.show.id +
            " href=" +
            key.show._links.self.href +
            ">" +
            key.show.name +
            "</a>"
        );
        li.append(link);
        ul.append(li);
      });
    });
  });

  $(document).on("click", "#showList li a", function (e) {
    $("#showList").hide();
    $("#homeLink").show();

    e.preventDefault();
    let tvurl = this.href;
    let requestConfig = {
      method: "GET",
      url: tvurl,
    };
    $.ajax(requestConfig).then(function (response) {
      console.log(response);
      let data = response;
      let show = $("#show");
      show.text("");
      show.show();
      const na = "N/A";

      let h1 = $("<h1>" + data.name + "</h1>");
      let imageName =
        data.name == null ? na : data.name.replace(/\s/g, "&nbsp;");
      let medium =
        data.image == null
          ? "../public/images/no_image.jpeg"
          : data.image.medium;
      let img = $("<img src=" + medium + " alt=" + imageName + ">");
      show.append(h1);
      show.append(img);

      let dl = $("<dl></dl>");

      let languages = "<dt>Languages</dt>";
      let lang = data.language == "" ? na : data.language;
      languages += "<dd>" + lang + "</dd>";
      dl.append(languages);

      show.append(dl);

      let genreBlock = $("<dt>Genre</dt>");
      let genredd = $("<dd></dd>");
      let genreUl = $("<ul></ul>");
      let genre = data.genres;
      if (!genre.length) {
        genre = na;
        genreUl.append("<li>" + genre + "</li>");
      } else {
        genre.forEach((x) => {
          genreUl.append("<li>" + x + "</li>");
        });
      }
      genredd.append(genreUl);

      dl.append(genreBlock);
      dl.append(genredd);

      let ratingBlock = "<dt>Average Rating</dt>";
      let rating = data.rating.average == null ? na : data.rating.average;
      ratingBlock += "<dd>" + rating + "</dd>";

      dl.append(ratingBlock);

      let netBlock = "<dt>Network</dt>";
      let net = data.network == null ? na : data.network.name;
      netBlock += "<dd>" + net + "</dd>";

      dl.append(netBlock);

      let summaryBlock = "<dt>Summary</dt>";
      let summary = data.summary == null ? na : data.summary;
      summaryBlock += "<dd>" + summary + "</dd>";

      dl.append(summaryBlock);
    });
  });

  // $("#homeLink").click(function () {
  //   $("");
  // });
})(jQuery);
