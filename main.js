/////search input
// Event listener for input field
// const unitSearchInput = document.getElementById("unitSearch");
// if (unitSearchInput) {
//   unitSearchInput.addEventListener("input", function () {
//     const searchTerm = this.value.trim().toLowerCase(); // Kiritilgan qidiruv raqami
//     const containerUnits = document.querySelectorAll(".container-unit");

//     containerUnits.forEach((unit) => {
//       const unitContent = unit
//         .querySelector(".forsearch")
//         .textContent.trim()
//         .toLowerCase(); // Har bir unitning .forsearch sinfi ichidagi matn

//       // .forsearch sinfi ichidagi matnda qidiruv raqami mavjud bo'lsa unitni ko'rsatish
//       if (unitContent.includes(searchTerm)) {
//         unit.style.display = "block";
//       } else {
//         unit.style.display = "none"; // Aks holda unitni yashirish
//       }
//     });
//   });
// }

/////////////////////////////

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
        input.style.color = "";
      } else {
        input.classList.remove("correct");
        input.classList.add("incorrect");
        input.style.color = "red"; // Qiymat noto'g'ri bo'lsa rangni o'chirish

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
});
// Inputlarni tanlash
const inputs = document.querySelectorAll("input.ans");

// Har bir input uchun avtomatik o'lchamni moslash
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    // Avtomatik o'lchamni moslash
    this.style.width = (this.value.length + 1) * 8 + "px";

    // Javobni olish
    const answerId = this.id.replace("ans", ""); // Javob elementning id-sidan raqamni olib tashlash
    const answerText = document
      .getElementById("ans" + answerId)
      .textContent.trim(); // Javob elementning matnini olish

    // Kiritilgan javob bilan moslashni tekshirish
    if (this.value.trim() === answerText) {
      this.style.backgroundColor = "lightgreen"; // Agar moslashsa, rangni ozgartirish
    } else {
      this.style.backgroundColor = ""; // Aks holda, rangni bekor qilish
    }
  });
});
// locale storage ///////////////////////////////
// Function to save the page state to local storage
function savePageState() {
  // Get all inputs
  var inputs = document.querySelectorAll("input.ans");
  var inputValues = {};

  // Store input values, background color, and width in an object
  inputs.forEach(function (input) {
    inputValues[input.id] = {
      value: input.value,
      backgroundColor: input.style.backgroundColor,
      width: input.style.width,
    };
  });

  // Convert object to JSON and save to local storage
  localStorage.setItem("pageState", JSON.stringify(inputValues));
}

// Function to restore the page state from local storage
// Function to restore the page state from local storage
function restorePageState() {
  // Retrieve saved data from local storage
  var savedData = localStorage.getItem("pageState");

  // If data exists and is not null, restore input values, background color, and width
  if (savedData) {
    savedData = JSON.parse(savedData);

    // Loop through saved data and restore input values, background color, and width
    Object.keys(savedData).forEach(function (id) {
      var input = document.getElementById(id);
      if (input) {
        var inputData = savedData[id];

        // Check if the properties exist before assigning them to input fields
        if (inputData && inputData.value) {
          input.value = inputData.value;
        }
        if (inputData && inputData.backgroundColor) {
          input.style.backgroundColor = inputData.backgroundColor;
        }
        if (inputData && inputData.width) {
          input.style.width = inputData.width;
        }
      }
    });
  }
}

// Event listener for page load
window.addEventListener("DOMContentLoaded", function () {
  // Restore page state
  restorePageState();

  // Add event listeners to inputs to save page state on input change
  document.querySelectorAll("input.ans").forEach(function (input) {
    input.addEventListener("input", savePageState);
  });
});

// prev next ///////////////
let currentUnitIndex = 0;
const containerUnits = document.querySelectorAll(".container-unit");

// Sahifa ochilganda saqlangan indeksni olish
const savedIndex = localStorage.getItem("currentUnitIndex");
if (savedIndex !== null) {
  currentUnitIndex = parseInt(savedIndex);
}

// Sahifa ochilganda saqlangan indeks bo'yicha to'g'ri unitni ko'rsatish
containerUnits.forEach((unit, index) => {
  if (index !== currentUnitIndex) {
    unit.style.display = "none";
  }
});

// Sahifani yuklash funksiyasi
function loadPage() {
  containerUnits[currentUnitIndex].style.display = "block";
}

// Sahifani yuklash
window.addEventListener("load", loadPage);

// Prev va Next tugmalariga hodisa qo'shish
function showPrevUnit() {
  containerUnits[currentUnitIndex].style.display = "none";
  currentUnitIndex--;
  if (currentUnitIndex < 0) {
    currentUnitIndex = containerUnits.length - 1;
  }
  containerUnits[currentUnitIndex].style.display = "block";
  // Yangilashdan oldin indeksni saqlash
  localStorage.setItem("currentUnitIndex", currentUnitIndex);
}

function showNextUnit() {
  containerUnits[currentUnitIndex].style.display = "none";
  currentUnitIndex++;
  if (currentUnitIndex >= containerUnits.length) {
    currentUnitIndex = 0;
  }
  containerUnits[currentUnitIndex].style.display = "block";
  // Yangilashdan oldin indeksni saqlash
  localStorage.setItem("currentUnitIndex", currentUnitIndex);
}

// Qo'shimcha - Belgilangan unitni ko'rsatish
function showSpecificUnit(index) {
  containerUnits[currentUnitIndex].style.display = "none";
  currentUnitIndex = index - 1;
  containerUnits[currentUnitIndex].style.display = "block";
  // Yangilashdan oldin indeksni saqlash
  localStorage.setItem("currentUnitIndex", currentUnitIndex);
}
