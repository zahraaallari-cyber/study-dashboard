let subjects = [];

function addSubject() {
  let name = document.getElementById("subject").value;
  let hours = parseFloat(document.getElementById("hours").value);

  if (!name || hours <= 0) {
    alert("Enter valid data!");
    return;
  }

  subjects.push({ name, hours });

  document.getElementById("subject").value = "";
  document.getElementById("hours").value = "";

  updateList();
}

function updateList() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;

  subjects.forEach((sub, index) => {
    total += sub.hours;

    let li = document.createElement("li");
    li.innerHTML = `${sub.name} - ${sub.hours}h 
    <button onclick="deleteSubject(${index})">❌</button>`;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = "📊 Total Hours: " + total;
}

function deleteSubject(index) {
  subjects.splice(index, 1);
  updateList();
}

function calculateDays() {
  let days = parseFloat(document.getElementById("days").value);
  let total = subjects.reduce((sum, sub) => sum + sub.hours, 0);

  if (days <= 0) return;

  let result = total / days;
  document.getElementById("perDay").innerText =
    "📅 " + result.toFixed(2) + " hours per day";
}

/* 🔥 تحويل النص إلى Wave */
function waveText(text) {
  return text.split("").map((letter, i) => {
    return `<span style="animation-delay:${i * 0.1}s">${letter}</span>`;
  }).join("");
}

function updateProgress() {
  let studied = parseFloat(document.getElementById("studied").value);
  let total = subjects.reduce((sum, sub) => sum + sub.hours, 0);

  if (total === 0) return;

  let percent = (studied / total) * 100;

  if (percent > 100) percent = 100;
  if (percent < 0) percent = 0;

  document.getElementById("progressBar").style.width = percent + "%";

  document.getElementById("progressText").innerText =
    percent.toFixed(1) + "% completed";

  let message = "";

  if (percent >= 80) {
    message = " Great job! Almost done!";
  } else if (percent >= 50) {
    message = " Keep going!";
  } else {
    message = " You can do it!";
  }

  document.getElementById("message").innerHTML =
    `<div class="wave">${waveText(message)}</div>`;
}