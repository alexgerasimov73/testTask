// Объявление переменных

const cardNumbers = document.getElementsByClassName('bank_card__number');
const cardName = document.querySelector('.bank_card__name');
const cvvCode = document.querySelector('.cvv_code');
const arrows = document.getElementsByClassName('arrow');
const bankCardMonth = document.querySelector('.bank_card__month');
const bankCardYear = document.querySelector('.bank_card__year');
const inputFields = document.querySelectorAll('input');
const bankCardButton = document.querySelector('.bank_card_btn');
const menuButton = document.querySelector('.menu_button');
const menuItems = document.getElementsByClassName('menu__item');


// Функция для подстановки рандомных значений номера чека и суммы

function getPayInformation() {
	const accountNumber = (Math.random() * 10000000000000).toFixed();
    document.getElementsByClassName('pay_information__info')[0]
    	.textContent = accountNumber;

    const sum = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    document.getElementsByClassName('pay_information__info')[1]
    	.textContent = `${sum} руб.`;
}

document.addEventListener('DOMContentLoaded', getPayInformation);


/*Функция валидации количества и типа введенных символов*/

function checkValue() {
	if (this.value.length >= 4) {
		const nextInput = this.nextElementSibling;
		nextInput.focus();
		this.value = this.value.slice(0, 4);	
	}
	this.value = this.value.replace(/\D/g, '');
}

/*Функция добавления красной границы для непрошедших валидацию инпутов*/

function wrongEnter(self, number) {
	const value = self.value.split(' ').join('');
	if (value.length < number) {
		self.classList.add('red_border');
	} else {
		self.classList.remove('red_border');
	}
}

/*Добавление событий для валидации и добавления красной границы
 для поля ввода номера*/

for (const cardNumber of cardNumbers) {
	cardNumber.addEventListener('input', checkValue);
	cardNumber.addEventListener('input', function() {
		wrongEnter(this, 4);
	});
}

/*Добавление событий для валидации и добавления красной границы
 для поля ввода имени*/ 

cardName.addEventListener('input', (e) => {
	const regular = /[^A-Za-z ]/g.exec(e.currentTarget.value);
    e.currentTarget.value = e.currentTarget.value.replace(regular, '');
    e.currentTarget.value = e.currentTarget.value.toUpperCase();
});
cardName.addEventListener('input', function() {
		wrongEnter(this, 4);
	});

/*Добавление событий для валидации и добавления красной границы
 для поля ввода CVV кода*/

cvvCode.addEventListener('input', (e) => 
	e.currentTarget.value = e.currentTarget.value.slice(0, 3));
cvvCode.addEventListener('input', function() {
		wrongEnter(this, 3);
	});

let el = document.querySelector('.arrow_year');

function show(elem) {
	let event;
	    event = document.createEvent('MouseEvents');
	    event.initMouseEvent('mousedown', true, true, window);
	    elem.dispatchEvent(event);
}

for (let i = 0; i < arrows.length; i++) {
	//console.log(i)
	arrows[i].addEventListener('click', function() {
		show(el);
	});
}		

// Функция установки текущего года в поле select

function optionYear() {
	const year = new Date().getFullYear();
	for (let i = year; i <= year + 10; i++) {
		const option = document.createElement('option');
		option.textContent = i;
		bankCardYear.appendChild(option);
	}
}

optionYear();

// Код и функция установки текущего месяца в поле select

const currentMonth = document.createElement('option');
let monthValue = new Date().getMonth() + 1;
monthValue < 10 ? monthValue = '0' + monthValue : monthValue;
currentMonth.textContent = monthValue;
bankCardMonth.appendChild(currentMonth);

function optionMonth() {
	let months = [];
	let selectedMonth = bankCardMonth.value;
	const existingOptions = bankCardMonth.querySelectorAll('option');
	for (let elem of existingOptions) {
		bankCardMonth.removeChild(elem);
	}
	
	if (bankCardYear.value == new Date().getFullYear()) {
		for (let i = new Date().getMonth() + 1; i <= 12; i++) {
			i < 10 ? i = '0' + i : i;
			months.push(i);
		}
	} else {
		for (let i = 1; i <= 12; i++) {
			i < 10 ? i = '0' + i : i;
			months.push(i);
		}
	}
	for (let month of months) {
		const option = document.createElement('option');
		option.textContent = month;
		bankCardMonth.appendChild(option);
	}
	bankCardMonth.value = selectedMonth;
}

optionMonth();

bankCardYear.addEventListener('change', optionMonth);


// Код и функция активации кнопки отправки данных при прохождении валидации

bankCardButton.disabled = true; //по умолчанию кнопка отключена

function sendData() {
	for (const input of inputFields) {
    	if (input.value === '' ||
    	 input.classList.contains('red_border')) {
      		bankCardButton.disabled = true;
      		return;
    	} 
    }
    bankCardButton.disabled = false;
}

for (const input of inputFields) {
	input.addEventListener('input', sendData);
}


/*Функция показа кнопки раскрытия меню на устройствах 
с диагональю меньше 480px*/

function showButton() {
	if (window.innerWidth <= 479) {
		menuButton.classList.remove('hide');
		for (const item of menuItems) {
			item.classList.add('hide');
		}
	} else {
		menuButton.classList.add('hide');
		for (const item of menuItems) {
			item.classList.remove('hide');
		}
	}
}

showButton();

window.addEventListener('resize', showButton);

menuButton.addEventListener('click', () => {
	for (const item of menuItems) {
		item.classList.toggle('hide');
	}
});