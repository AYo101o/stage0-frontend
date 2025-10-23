
const timeElement = document.getElementById("userTime");

function updateTime() {
  const now = new Date();
  timeElement.textContent = now.toLocaleString();
  timeElement.setAttribute("data-milliseconds", Date.now()); }

updateTime();
setInterval(updateTime, 1000);


updateTime();

