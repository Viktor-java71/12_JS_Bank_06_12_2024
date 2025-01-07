 const bank = [];
// Debit card
//deposit:если вносимая сумма больше 5000 - действие не совершается
//withdraw:нельзя уходить в минус
const bankAccount = {
  accountNumber: "123456789",
  accountHolderName: "Alice",
  balance: 0,
  deposit(sum) {
    //TODO
    sum >= 5 && sum <= 5000
      ? (this.balance += sum)
      : alert("Вводимая сумма для пополнения баланса некорректная");
  },
  withdraw(sum) {
    // TODO
    sum <= this.balance && sum > 0
      ? (this.balance -= sum)
      : alert("Вводимая сумма для снятия баланса некорректна");
  },
  checkBalance() {
    alert(this.balance + "€");
  },
};

 bankAccount.deposit(100)
console.log(bankAccount.balance);

bankAccount.withdraw(100)
console.log(bankAccount.balance); */


function createAccount() {
  const nameInput = document.getElementById('name');
  const name = nameInput.value.trim();
  if (name) {
    bank.push({
      ...bankAccount,
      accountNumber: `${bank.length + 1}`,
      accountHolderName: name
    });
    alert("Account created successfully");
    console.log(bank);
    nameInput.value = '';
  } else {
    alert("Enter your name")
  }
  updateAccountsList();
}
updateAccountsList();

function showAccounts() {
  updateAccountsList();
}
function updateAccountsList() {
  const accountList = document.getElementById('accountList');
  const showSection = document.getElementById('show');
  accountList.innerHTML = '';
  if (bank.length > 0) {
    showSection.style.display = 'block';
    for (const account of bank) {
      const li = document.createElement('li');
      li.textContent = `ID: ${account.accountNumber}, Name: ${account.accountHolderName}, Balance: ${account.balance}`;
      accountList.appendChild(li);
    }
  } else {
    showSection.style.display = 'none';
  }
} 
// Массив для хранения задач
/* let tasks = []; // Содержит объекты задач с текстом и статусом выполнения

// Ссылки на элементы DOM
const input = document.querySelector('.task-input'); // Поле ввода текста задачи
const createButton = document.querySelector('.actions .btn'); // Кнопка для создания новой задачи
const allButton = document.getElementById('all'); // Кнопка для отображения всех задач
const completedButton = document.getElementById('completed'); // Кнопка для отображения выполненных задач
const uncompletedButton = document.getElementById('uncompleted'); // Кнопка для отображения невыполненных задач
const list = document.querySelector('.list'); // Контейнер для списка задач

// Ссылки на элементы управления банковскими операциями
const withdrawBtn = document.getElementById('withdraw'); // Кнопка снятия денег
const depositBtn = document.getElementById('deposit'); // Кнопка внесения денег
const accountIdInput = document.getElementById('accountId'); // Поле ввода ID аккаунта
const amountInput = document.getElementById('amount'); // Поле ввода суммы

// Массив для хранения банковских счетов
let bank = [];

// Прототип банковского счёта
const bankAccount = {
  accountNumber: '',
  accountHolderName: '',
  balance: 0,
  deposit(sum) {
    if (sum > 0 && sum <= 5000) {
      this.balance += sum;
    } else {
      alert('Вводимая сумма для пополнения баланса некорректная');
    }
  },
  withdraw(sum) {
    if (sum > 0 && sum <= this.balance) {
      this.balance -= sum;
    } else {
      alert('Вводимая сумма для снятия некорректная или недостаточно средств');
    }
  },
};

// Функция для создания банковского счёта
function createBankAccount(name) {
  const newAccount = {
    ...bankAccount,
    accountNumber: (bank.length + 1).toString(),
    accountHolderName: name,
    balance: 0,
  };
  bank.push(newAccount);
}

// Функция для отображения задач
function renderTasks(filter = 'all') {
  list.innerHTML = ''; // Очищаем текущий список задач перед обновлением

  // Фильтруем задачи на основе выбранного фильтра
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isCompleted; // Возвращаем только выполненные задачи
    if (filter === 'uncompleted') return !task.isCompleted; // Возвращаем только невыполненные задачи
    return true; // Возвращаем все задачи, если фильтр 'all'
  });

  // Отрисовываем задачи
  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li'); // Создаем элемент списка для задачи
    li.className = 'list-item'; // Присваиваем базовый класс для задачи
    if (task.isCompleted) li.classList.add('list-item_done'); // Добавляем класс для выполненных задач
    li.textContent = task.text; // Устанавливаем текст задачи

    // Добавляем обработчик клика для изменения состояния задачи
    li.addEventListener('click', () => {
      tasks[index].isCompleted = !tasks[index].isCompleted; // Переключаем состояние задачи
      renderTasks(filter); // Перерисовываем список задач
    });

    list.appendChild(li); // Добавляем задачу в список
  });
}

// Функция для добавления задачи
function addTask() {
  const text = input.value.trim(); // Получаем текст из поля ввода
  if (text === '') return; // Если текст пустой, ничего не делаем

  tasks.push({ text, isCompleted: false }); // Добавляем новую задачу в массив
  input.value = ''; // Очищаем поле ввода
  renderTasks(); // Перерисовываем список задач
}

// Функция для выполнения банковской операции
function performBankOperation(operation) {
  const id = accountIdInput.value.trim(); // Получаем ID аккаунта
  const amount = parseFloat(amountInput.value.trim()); // Получаем сумму операции

  // Находим аккаунт по ID
  const account = bank.find(acc => acc.accountNumber === id);

  if (!account) {
    alert('Аккаунт не найден');
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert('Введите корректную сумму');
    return;
  }

  if (operation === 'withdraw') {
    account.withdraw(amount); // Выполняем снятие средств
  } else if (operation === 'deposit') {
    account.deposit(amount); // Выполняем пополнение средств
  }

  accountIdInput.value = ''; // Очищаем поле ввода ID
  amountInput.value = ''; // Очищаем поле ввода суммы
}

// Добавляем обработчики событий для банковских операций
withdrawBtn.addEventListener('click', () => performBankOperation('withdraw'));
depositBtn.addEventListener('click', () => performBankOperation('deposit'));

// Добавляем обработчики событий
createButton.addEventListener('click', addTask); // При нажатии на кнопку 'Создать' добавляем задачу
allButton.addEventListener('click', () => renderTasks('all')); // Отображаем все задачи при нажатии на кнопку 'все'
completedButton.addEventListener('click', () => renderTasks('completed')); // Отображаем выполненные задачи при нажатии на кнопку 'выполненные'
uncompletedButton.addEventListener('click', () => renderTasks('uncompleted')); // Отображаем невыполненные задачи при нажатии на кнопку 'невыполненные'

// Начальная отрисовка
renderTasks(); // Отображаем задачи при загрузке страницы
 */
// Массив для хранения задач
let tasks = []; // Содержит объекты задач с текстом и статусом выполнения

// Ссылки на элементы DOM
const input = document.querySelector('.task-input'); // Поле ввода текста задачи
const createButton = document.querySelector('.actions .btn'); // Кнопка для создания новой задачи
const allButton = document.getElementById('all'); // Кнопка для отображения всех задач
const completedButton = document.getElementById('completed'); // Кнопка для отображения выполненных задач
const uncompletedButton = document.getElementById('uncompleted'); // Кнопка для отображения невыполненных задач
const list = document.querySelector('.list'); // Контейнер для списка задач

// Ссылки на элементы управления банковскими операциями
const withdrawBtn = document.getElementById('withdraw'); // Кнопка снятия денег
const depositBtn = document.getElementById('deposit'); // Кнопка внесения денег
const accountIdInput = document.getElementById('accountId'); // Поле ввода ID аккаунта
const amountInput = document.getElementById('amount'); // Поле ввода суммы

// Массив для хранения банковских счетов
let bank = [];

// Прототип банковского счёта
const bankAccount = {
  accountNumber: '',
  accountHolderName: '',
  balance: 0,
  deposit(sum) {
    if (sum > 0 && sum <= 5000) {
      this.balance += sum;
    } else {
      alert('Вводимая сумма для пополнения баланса некорректная');
    }
  },
  withdraw(sum) {
    if (sum > 0 && sum <= this.balance) {
      this.balance -= sum;
    } else {
      alert('Вводимая сумма для снятия некорректная или недостаточно средств');
    }
  },
};

// Функция для создания банковского счёта
function createBankAccount(name) {
  const newAccount = {
    ...bankAccount,
    accountNumber: (bank.length + 1).toString(),
    accountHolderName: name,
    balance: 0,
  };
  bank.push(newAccount);
}

// Функция для отображения задач
function renderTasks(filter = 'all') {
  list.innerHTML = ''; // Очищаем текущий список задач перед обновлением

  // Фильтруем задачи на основе выбранного фильтра
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isCompleted; // Возвращаем только выполненные задачи
    if (filter === 'uncompleted') return !task.isCompleted; // Возвращаем только невыполненные задачи
    return true; // Возвращаем все задачи, если фильтр 'all'
  });

  // Отрисовываем задачи
  filteredTasks.map((task, index) => {
    const li = document.createElement('li'); // Создаем элемент списка для задачи
    li.className = 'list-item'; // Присваиваем базовый класс для задачи
    if (task.isCompleted) li.classList.add('list-item_done'); // Добавляем класс для выполненных задач
    li.textContent = task.text; // Устанавливаем текст задачи

    // Добавляем обработчик клика для изменения состояния задачи
    li.addEventListener('click', () => {
      tasks[index].isCompleted = !tasks[index].isCompleted; // Переключаем состояние задачи
      renderTasks(filter); // Перерисовываем список задач
    });

    list.appendChild(li); // Добавляем задачу в список
  });
}

// Функция для добавления задачи
function addTask() {
  const text = input.value.trim(); // Получаем текст из поля ввода
  if (text === '') return; // Если текст пустой, ничего не делаем

  tasks.push({ text, isCompleted: false }); // Добавляем новую задачу в массив
  input.value = ''; // Очищаем поле ввода
  renderTasks(); // Перерисовываем список задач
}

// Функция для выполнения банковской операции
function performBankOperation(operation) {
  const id = accountIdInput.value.trim(); // Получаем ID аккаунта
  const amount = parseFloat(amountInput.value.trim()); // Получаем сумму операции

  // Находим аккаунт по ID
  const account = bank.find(acc => acc.accountNumber === id);

  if (!account) {
    alert('Аккаунт не найден');
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert('Введите корректную сумму');
    return;
  }

  if (operation === 'withdraw') {
    account.withdraw(amount); // Выполняем снятие средств
  } else if (operation === 'deposit') {
    account.deposit(amount); // Выполняем пополнение средств
  }

  accountIdInput.value = ''; // Очищаем поле ввода ID
  amountInput.value = ''; // Очищаем поле ввода суммы
}

// Добавляем обработчики событий для банковских операций
withdrawBtn.addEventListener('click', () => performBankOperation('withdraw'));
depositBtn.addEventListener('click', () => performBankOperation('deposit'));

// Функция для создания нового аккаунта
function createAccount() {
  const nameInput = document.getElementById('name');
  const name = nameInput.value.trim();

  if (name) {
    createBankAccount(name); // Создаем банковский счёт
    updateAccountsList(); // Обновляем список аккаунтов
  } else {
    alert('Введите имя');
  }

  nameInput.value = ''; // Очищаем поле ввода
}

// Функция для отображения всех аккаунтов
function showAccounts() {
  updateAccountsList(); // Обновляем список аккаунтов
}

// Функция для обновления списка аккаунтов
function updateAccountsList() {
  const accountList = document.getElementById('accountList');
  const showSection = document.getElementById('show');

  accountList.innerHTML = ''; // Очищаем список перед обновлением

  if (bank.length > 0) {
    showSection.style.display = 'block'; // Показываем раздел со списком
    bank.map(account => {
      const li = document.createElement('li');
      li.textContent = `ID: ${account.accountNumber}, Name: ${account.accountHolderName}, Balance: ${account.balance}`;
      accountList.appendChild(li);
    });
  } else {
    showSection.style.display = 'none'; // Скрываем раздел, если аккаунтов нет
  }
}

// Добавляем обработчики событий
createButton.addEventListener('click', addTask); // При нажатии на кнопку 'Создать' добавляем задачу
allButton.addEventListener('click', () => renderTasks('all')); // Отображаем все задачи при нажатии на кнопку 'все'
completedButton.addEventListener('click', () => renderTasks('completed')); // Отображаем выполненные задачи при нажатии на кнопку 'выполненные'
uncompletedButton.addEventListener('click', () => renderTasks('uncompleted')); // Отображаем невыполненные задачи при нажатии на кнопку 'невыполненные'

// Добавляем обработчики событий для кнопок управления аккаунтами
document.querySelector('#create button:nth-of-type(1)').addEventListener('click', createAccount); // Обработчик для кнопки создания аккаунта
document.querySelector('#create button:nth-of-type(2)').addEventListener('click', showAccounts); // Обработчик для кнопки отображения всех аккаунтов

// Начальная отрисовка
renderTasks(); // Отображаем задачи при загрузке страницы
