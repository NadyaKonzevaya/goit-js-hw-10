// Делаем fetch переиспользуемым и оборачиваем его в функцию,
// разделяем действия: забрать данные и нарисовать по этим данным разметку в разные места
    // т.е. выносим второй then и catch из функции fetchPokemon и return первый fetch
    // (теперь фунция только возвращает данные с сервера и парсит их ( response.json()))
    // и выносим функцию fetch, связанную с сервером в отдельный файл!!!

    // наш корневой адрес для запроса
const BASE = "https://restcountries.com/v2";


export function fetchCountries(name) {
  
    const url = `${BASE}/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            console.log(response);
            return response.json();
        })

}


