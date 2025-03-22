const form = document.querySelector(".form");
const sentBtn = document.querySelector('#button');
const clearBtn = document.querySelector('#clear');

form.addEventListener("submit", (event) => {
  // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
  // https://learn.javascript.ru/default-browser-action
  event.preventDefault();
});


sentBtn.addEventListener('click', function () {
  const name = document.querySelector('#name');
  const secondName = document.querySelector('#secondName');
  const email = document.querySelector('#email');
  const phone = document.querySelector('#phone');
  const agreeInput = document.querySelector('#agree');

  const personName = name.value;
  const personSecondName = secondName.value;
  const personEmail = email.value;
  const personPhone = phone.value;
  const personAgree = agreeInput.checked;

  fetch(`https://polinashneider.space/user`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer: anmianne'
    },
    body: JSON.stringify({
      "name": personName,
      "secondName": personSecondName,
      "phone": personPhone,
      "email": personEmail,
      "agree": personAgree
    }),
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      sentMessage('success');

    })
    .catch((error) => {
      console.log(error);
      sentMessage('error');
    })
});

function sentMessage(type) {
  const message = document.createElement('div');
  message.classList.add('message');
  form.appendChild(message);

  if (type === 'success') {
    message.textContent = 'Форма успешно отправлена!';
  } else {
    message.textContent = 'Ошибка при отправке данных';
  }
};

clearBtn.addEventListener('click', function () {
  form.reset();
  const message = document.querySelector('.message');
  message.remove();
});
