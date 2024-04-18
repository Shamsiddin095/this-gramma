window.addEventListener("DOMContentLoaded", function () {
  var answers = document.querySelectorAll(".answers span");
  var inputs = document.querySelectorAll(".ans");

  function checkAnswers() {
    var correctAnswered = true;

    inputs.forEach(function (input, index) {
      var inputValue = input.value.trim().toLowerCase();
      var answer = answers[index].textContent.trim().toLowerCase();

      if (inputValue === answer) {
        input.classList.remove("incorrect");
        input.classList.add("correct");
        input.style.backgroundColor = "lightgreen";
      } else {
        input.classList.remove("correct");
        input.classList.add("incorrect");
        input.style.backgroundColor = ""; // Qiymat noto'g'ri bo'lsa rangni o'chirish

        correctAnswered = false;
      }
    });

    if (correctAnswered) {
      inputs.forEach(function (input) {
        input.value = "";
        input.classList.remove("correct", "incorrect");
        input.style.backgroundColor = ""; // Qiymat to'g'ri bo'lsa rangni o'chirish
      });
    }
  }

  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      var inputValue = input.value.trim();
      if (inputValue !== "") {
        checkAnswers();
        var inputTextWidth = inputValue.length * 10;
        input.style.width = inputTextWidth + "px";
      }
    });
  });

  answers.forEach(function (answer, index) {
    var inputId = "ans" + (index + 1);
    var input = document.getElementById(inputId);
    var inputWidth = answer.textContent.length * 14;
    input.style.width = inputWidth + "px";
  });
});
