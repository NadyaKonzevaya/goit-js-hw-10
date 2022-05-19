import './css/styles.css';

// Задание - поиск стран
// Создай фронтенд часть приложения поиска данных о стране по её частичному или полному имени.

// 1. HTTP-запросы
// Используй публичный API Rest Countries, а именно ресурс name, 
// возвращающий массив объектов стран удовлетворивших критерий поиска.
// 2. Добавь минимальное оформление элементов интерфейса.

// 3.Напиши функцию fetchCountries(name) которая делает HTTP-запрос на ресурс name
//  и возвращает промис с массивом стран - результатом запроса.
// Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.


// 4. Фильтрация полей
// В ответе от бэкенда возвращаются объекты, большая часть свойств которых тебе не пригодится. 
// Чтобы сократить объем передаваемых данных добавь строку параметров запроса - 
// так этот бэкенд реализует фильтрацию полей.Ознакомься с документацией синтаксиса фильтров.

// Тебе нужны только следующие свойства:
// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков

// 5. Поле поиска
// Название страны для поиска пользователь вводит в текстовое поле input#search-box. 
// HTTP - запросы выполняются при наборе имени страны, то есть по событию input.
// Но, делать запрос при каждом нажатии клавиши нельзя, 
// так как одновременно получится много запросов и они будут выполняться в непредсказуемом порядке.
// Необходимо применить приём Debounce на обработчике события и делать HTTP-запрос спустя 300мс после того, 
// как пользователь перестал вводить текст.Используй пакет lodash.debounce.
// 6. Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка списка стран или информации о стране пропадает.
// 7. Выполни санитизацию введенной строки методом trim(), это решит проблему когда в поле ввода только пробелы или они есть в начале и в конце строки.

// 8. Интерфейс
// Если в ответе бэкенд вернул больше чем 10 стран, в интерфейсе пояляется уведомление о том, 
// что имя должно быть более специфичным.Для уведомлений используй библиотеку notiflix и 
// выводи такую строку "Too many matches found. Please enter a more specific name.".


// 9. Too many matches alert
// Если бэкенд вернул от 2-х до 10-х стран, под тестовым полем отображается список найденных стран. 
// Каждый элемент списка состоит из флага и имени страны.

// 10. Country list UI
// Если результат запроса это массив с одной страной, в интерфейсе отображается разметка карточки с данными о стране: флаг, название, столица, население и языки.

// Country info UI
// ⚠️ Достаточно чтобы приложение работало для большинства стран. Некоторые страны, такие как Sudan, могут создавать проблемы, поскольку название страны является частью названия другой страны, South Sudan. Не нужно беспокоиться об этих исключениях.

// 11. Обработка ошибки
// Если пользователь ввёл имя страны которой не существует, бэкенд вернёт не пустой массив, а ошибку со статус кодом 404 - не найдено. Если это не обработать, то пользователь никогда не узнает о том, что поиск не дал результатов. Добавь уведомление "Oops, there is no country with that name" в случае ошибки используя библиотеку notiflix.

// 12. Error alert
// ⚠️ Не забывай о том, что fetch не считает 404 ошибкой, поэтому необходимо явно отклонить промис чтобы можно было словить и обработать ошибку.

import countryCardTpl from "./templates/country-card.hbs";
import countriesTpl from "./templates/counties.hbs"
import { fetchCountries } from "./fetchCountries";
const Handlebars = require("handlebars");
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
// fetchCountries("Sweden");

const refs = {
    searchQuery: document.querySelector("#search-box"),
    countryCard: document.querySelector(".country-info"),
    countriesList: document.querySelector(".country-list"),
}
console.log(refs.searchQuery)
refs.searchQuery.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    clearMarkup();
    const searchName = event.target.value.trim();
    console.log(searchName);

    fetchCountries(searchName).then(value => {
            console.log(value);
            console.log(value.length);
            if (value.length === 1) {
                renderCountryCard(value);
            } else if (value.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else {
                renderCountriesList(value);
            }
        }).catch(onFetchError)
    }
   
   


function renderCountryCard(country) {
    const markup = countryCardTpl(country[0]);
    refs.countryCard.innerHTML = markup;
}

function renderCountriesList(countries) {
    const markup = countriesTpl(countries);
    refs.countriesList.innerHTML = markup;
}

function clearMarkup() {
    refs.countryCard.innerHTML = "";
    refs.countriesList.innerHTML = "";
}

function onFetchError(error) {
     Notiflix.Notify.failure("Oops, there is no country with that name");
}