const form = document.querySelector(".form");
const clearBtn = document.querySelector('#clear');

form.addEventListener("submit", (event) => {
  event.preventDefault(); 
  sendFormData(); 
});
function sendFormData() {
  const name = document.querySelector('#name');
  const secondName = document.querySelector('#secondName');
  const email = document.querySelector('#email');
  const phone = document.querySelector('#phone');
  const agreeInput = document.querySelector('#agree');

  const personName = name.value.trim();
  const personSecondName = secondName.value.trim();
  const personEmail = email.value.trim();
  const personPhone = phone.value.trim();
  const personAgree = agreeInput.checked;

  if (!personName || !personSecondName || !personEmail || !personPhone) {
    return sentMessage('error', 'Все поля должны быть заполнены');
  }

  if (!personAgree) {
    return sentMessage('error', 'Необходимо согласие на обработку данных');
  }

  fetch(`https://polinashneider.space/user`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer: PolinaShneider' 
    },
    body: JSON.stringify({
      "name": personName,
      "secondName": personSecondName,
      "phone": personPhone,
      "email": personEmail,
      "agree": personAgree
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка сети или сервера');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      sentMessage('success', 'Форма успешно отправлена!');
      form.reset(); 
    })
    .catch((error) => {
      console.error(error);
      sentMessage('error', 'Ошибка при отправке данных');
    });
}

function sentMessage(type, text) {
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const message = document.createElement('div');
  message.classList.add('message');
  message.textContent = text;

    if (type === 'success') {
    message.classList.add('message--success');
  } else if (type === 'error') {
    message.classList.add('message--error');
  }

  form.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 5000);
}

clearBtn.addEventListener('click', function () {
  form.reset(); 
  const message = document.querySelector('.message');
  if (message) {
    message.remove(); 
  }
});