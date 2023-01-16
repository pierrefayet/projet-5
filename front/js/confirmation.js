const url = window.location.search;
const urlParams = new URLSearchParams(url);
const oderId = urlParams.get("orderId");
const orderIdInput = document.querySelector("#orderId");
orderIdInput.textContent = oderId;
