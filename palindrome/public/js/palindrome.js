(function () {
  const form = document.getElementById("palindrome-form");
  document.getElementById("error").classList.add("error-hidden");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        const phrase = document.getElementById("palindrome").value;
        document.getElementById("error").classList.add("error-hidden");

        if (phrase.trim().length === 0) {
          document.getElementById("error").classList.remove("error-hidden");
          return;
        }
        let str = removeAlphanumerics(phrase.toLowerCase());
        if (str === "") {
          document.getElementById("error").classList.remove("error-hidden");
          return;
        }
        let result = isPalindrome(str);
        let orderedList = document.getElementById("attempts");
        if (result) {
          let li = document.createElement("li");
          li.innerHTML = phrase;
          li.className = "is-palindrome";
          orderedList.appendChild(li);
        } else {
          let li = document.createElement("li");
          li.innerHTML = phrase;
          li.className = "not-palindrome";
          orderedList.appendChild(li);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  function isPalindrome(phrase) {
    let reversestr = reverseString(phrase);
    if (phrase === reversestr) {
      return true;
    }
    return false;
  }
  //function reused from https://www.freecodecamp.org/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/

  function reverseString(str) {
    if (str === "") return "";
    else return reverseString(str.substr(1)) + str.charAt(0);
  }

  function removeAlphanumerics(phrase) {
    let str = phrase;
    const checker = /[^a-z0-9]/g;
    return str.replace(checker, "");
  }
})();
