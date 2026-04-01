document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("formValid", (event) => {
    const formData = event.detail;
    const timestamp = new Date().toLocaleString("ru-RU");

    console.clear();
    console.log("ФИО:", formData.fullname);
    console.log("Телефон:", formData.phone);
    console.log("Email:", formData.email);
    console.log("Сообщение:", formData.message);
    console.log("Время отправки:", timestamp);
  });
});
