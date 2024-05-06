// VARIÁVEIS E SELEÇÕES DE ELEMENTOS

const apiKey = "6a416c25f7f0d0dda1a45e20378d7949";

const cityInput = document.querySelector("#city-input");
const searchBT = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElementy = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherData = document.querySelector("#weather-data"); 

const cityErrorElement = document.querySelector("#error-message span"); 
const errorMessageContainer = document.querySelector("#error-message"); 
const loader = document.querySelector("#loader"); 


// FUNÇÕES

    // FUNÇÃO DE LOADING

        const toggleLoader = () => {
            loader.classList.toggle("hide");
        }

    // FUNÇÃO QUE ESCONDE AS DIVS

        const hideInformation = () => {
            errorMessageContainer.classList.add("hide");
            weatherData.classList.add("hide");
        };


    // TRATAMENTO DE ERROS

        const showErrorMessage = () => {
            cityErrorElement.innerText = cityInput.value //Linha de modificação
            errorMessageContainer.classList.remove("hide");
        };


    //    REQUISIÇÃO NA API DO CLIMA
        const getWeatherData = async(city) =>{
            toggleLoader();
            const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

            const response = await fetch(apiWeatherURL);
            const data = await response.json();

            toggleLoader();

            return data;

        };


    //Função que recebe a cidade do input, chama a função de requisição dos dados e substitui na tela os elementos HTML
        const showWeatherData = async(city) => {
            hideInformation(); // Esconde as informações a cada nova pesquisa

            const data = await getWeatherData(city);

            if(data.cod === "404"){ // Verifica se a cidade existe 
                showErrorMessage();
                return
            }
            
            getWeatherData(city);

            cityElement.innerText = data.name;
            tempElement.innerText = parseInt(data.main.temp);
            descElement.innerText = data.weather[0].description;
            weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
            umidityElementy.innerText = `${data.main.humidity}%`;
            windElement.innerText = `${data.wind.speed} km/h`; 


            weatherData.classList.remove("hide"); //Remove a classe "hide" da div "weatherData". O "classlist" serve para fazer alguma ação com a classe ou manipular elementos.
            
        };



// EVENTOS

searchBT.addEventListener("click", (e) => { //"e" é o valor/conteúdo de evento do click. O objeto do evento "e" contém informações sobre o evento de click.
    e.preventDefault(); // O comando preventDefault evita o envio do formulário
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => { //e captura o valor/código da tecla
    if(e.code === "Enter") {
        e.preventDefault();
        const city = cityInput.value; //Valor do campo input
        showWeatherData(city);
         
    } 
});
