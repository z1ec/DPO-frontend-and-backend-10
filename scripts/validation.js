document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");

  if (!form) {
    return;
  }

  const fields = {
    fullname: document.getElementById("fullname"),
    phone: document.getElementById("phone"),
    email: document.getElementById("email"),
    message: document.getElementById("message"),
    agreement: document.getElementById("agreement"),
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors(form);

    const formData = {
      fullname: fields.fullname.value.trim(),
      phone: fields.phone.value.trim(),
      email: fields.email.value.trim(),
      message: fields.message.value.trim(),
      agreement: fields.agreement.checked,
    };

    let isValid = true;

    const fullnameWords = formData.fullname
      .split(/\s+/)
      .filter((word) => word.length > 0);

    if (formData.fullname === "") {
      showError(fields.fullname, "Введите ФИО.");
      isValid = false;
    } else if (fullnameWords.length < 2) {
      showError(fields.fullname, "Введите минимум фамилию и имя.");
      isValid = false;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (formData.phone === "") {
      showError(fields.phone, "Введите номер телефона.");
      isValid = false;
    } else if (phoneDigits.length < 10) {
      showError(fields.phone, "Номер должен содержать не менее 10 цифр.");
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email === "") {
      showError(fields.email, "Введите email.");
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      showError(fields.email, "Введите корректный email.");
      isValid = false;
    }

    if (formData.message.length > 500) {
      showError(fields.message, "Сообщение не должно превышать 500 символов.");
      isValid = false;
    }

    if (!formData.agreement) {
      showCheckboxError(fields.agreement, "Подтвердите согласие на обработку данных.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    document.dispatchEvent(
      new CustomEvent("formValid", {
        detail: {
          fullname: formData.fullname,
          phone: formData.phone,
          email: formData.email,
          message: formData.message || "(не заполнено)",
        },
      }),
    );

    window.alert("Форма успешно отправлена. Данные выведены в консоль.");
    form.reset();
  });

  [fields.fullname, fields.phone, fields.email, fields.message].forEach((field) => {
    field.addEventListener("input", () => clearFieldError(field));
  });

  fields.agreement.addEventListener("change", () => clearCheckboxError(fields.agreement));
  form.addEventListener("reset", () => {
    window.setTimeout(() => clearErrors(form), 0);
  });
});

function showError(field, message) {
  field.classList.add("is-danger");

  const error = document.createElement("p");
  error.className = "error-text";
  error.textContent = message;
  error.dataset.errorFor = field.id;

  field.closest(".field").append(error);
}

function clearFieldError(field) {
  field.classList.remove("is-danger");

  const error = document.querySelector(`[data-error-for="${field.id}"]`);
  if (error) {
    error.remove();
  }
}

function showCheckboxError(checkbox, message) {
  const wrapper = checkbox.closest(".checkbox-field");
  wrapper.classList.add("is-danger");

  const error = document.createElement("p");
  error.className = "error-text";
  error.textContent = message;
  error.dataset.errorFor = checkbox.id;

  wrapper.insertAdjacentElement("afterend", error);
}

function clearCheckboxError(checkbox) {
  const wrapper = checkbox.closest(".checkbox-field");
  wrapper.classList.remove("is-danger");

  const error = document.querySelector(`[data-error-for="${checkbox.id}"]`);
  if (error) {
    error.remove();
  }
}

function clearErrors(form) {
  form.querySelectorAll(".is-danger").forEach((element) => {
    element.classList.remove("is-danger");
  });

  form.querySelectorAll(".error-text").forEach((element) => {
    element.remove();
  });
}
