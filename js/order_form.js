document.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.getElementById("orderForm");
  const successAlert = document.getElementById("orderSuccessAlert");
  const closeBtn = successAlert.querySelector(".btn-close");

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault(); 
    if (!orderForm.checkValidity()) {
      orderForm.reportValidity();
      return;
    }

    successAlert.classList.remove("d-none");

    successAlert.scrollIntoView({ behavior: "smooth", block: "center" });

    orderForm.reset();
    orderForm.classList.remove("was-validated");
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      successAlert.classList.add("d-none");
    });
  }
});
