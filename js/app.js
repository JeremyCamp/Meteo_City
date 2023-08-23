function apiCall(ville) {
    const apiKey = 'af270e864f94bab1704f19ffe1b63da8';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        let iconHTML = "";
            if (data.weather[0].main === "Clouds") {
                iconHTML = `<i class="fa-solid fa-cloud fa-beat-fade iconMeteo" style="color: #949699;"></i>`;
            } else if (data.weather[0].main === "Rain") {
                iconHTML = `<i class="fa-solid fa-cloud-showers-heavy fa-beat-fade iconMeteo" style="color: #3d75d6;"></i>`;
            } else if (data.weather[0].main === "Clear") {
                iconHTML = `<i class="fa-solid fa-sun fa-spin iconMeteo" style="color: #fff71a;"></i>`;
            }

            const meteoInfo = document.querySelector(".meteoInfo");
            meteoInfo.innerHTML = `
                <h2>${ville}</h2>
                ${iconHTML}
                <p>${Math.floor(data.main.temp)} °C</p>
                <p>${data.weather[0].description}</p>
            `;

            const precisionsMeteo = document.querySelector(".precisionsMeteo");
            precisionsMeteo.innerHTML = `
                <div class="humidity">
                    <i class="fa-solid fa-droplet fa-fade" style="color: #3070df;"></i>
                    <p>${data.main.humidity} %</p>
                </div>
                <div class="wind">
                    <i class="fa-solid fa-wind fa-fade" style="color: #ababab;"></i>
                    <p>${Math.floor(data.wind.speed)} Km/h</p>
                </div>
            `;
    })
    .catch(error => {
        console.error("Une erreur s'est produite :", error);
    });
}


const btn = document.querySelector("button");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const inputCity = document.querySelector("#inputCity");
    const ville = inputCity.value;
    apiCall(ville);

});

apiCall("montreal")