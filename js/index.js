let lat;

let lon;

let dataFromServer;

let req = new XMLHttpRequest();

function clickSearch() {
    console.log(search.value)
}


if (window.XMLHttpRequest) {
  req = new XMLHttpRequest();
} else {
  req = new ActiveXObject("MicrosoftXMLHTTP");
}

req.open(
  "GET",
  "https://api.openweathermap.org/data/2.5/weather?q=Lviv&appid=1aab5e68991c14e08d5124684d9d0936",
  true
);

req.onreadystatechange = function () {
  if (this.readyState === 4) {
    reqFun(this.responseText);
  }
};

req.send();

function reqFun(date) {
  dataFromServer = JSON.parse(date);

  lat = dataFromServer.coord.lat;
  lon = dataFromServer.coord.lon;

  document.querySelector(".city").innerText = dataFromServer.name;
  document.querySelector(".date").innerText = new Date().toLocaleDateString();
  document.querySelector(".describe").innerText =
    dataFromServer.weather[0].main;
  document.querySelector(
    ".image"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${dataFromServer.weather[0].icon}@2x.png">`;
  document.querySelector(".temperature-inner").innerText = Math.round(
    dataFromServer.main.temp - 273
  );
  document.querySelector(".min-temperature-inner").innerText = Math.round(
    dataFromServer.main.temp_min - 273
  );
  document.querySelector(".max-temperature-inner").innerText = Math.round(
    dataFromServer.main.temp_max - 273
  );
  document.querySelector(".wind-speed-inner").innerText =
    dataFromServer.wind.speed;
  console.log(dataFromServer);

  let xhr = new XMLHttpRequest();

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("MicrosoftXMLHTTP");
  }

  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&%20exclude=hourly&appid=1aab5e68991c14e08d5124684d9d0936`,
    true
  );

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      reqFunXhr(this.responseText);
    }
  };

  xhr.send();

  function reqFunXhr(date) {
    let dataFromServerH = JSON.parse(date);
    let day = new Date();

    getWeekDay(day);

    function getWeekDay(day) {
      let days = [
        "Sanday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      document.querySelector(".day-hourly").innerText = days[day.getDay()];
    }

    for (let i = 6; i <= 21; i += 3) {
      let createDivHTI = document.createElement("div");
      createDivHTI.setAttribute("class", "hourly-title-inner");

      let createDivDH = document.createElement("div");
      createDivDH.setAttribute("class", 'day-hourly"');

      if (i === 6) {
        createDivDH.innerText = `0${i + 1}.00`;
      } else if (i !== 6 && i < 13) {
        createDivDH.innerText = `${i + 1}.00`;
      } else {
        createDivDH.innerText = `${i}.00`;
      }

      let createDivDI = document.createElement("div");
      createDivDI.setAttribute("class", "day-image");
      createDivDI.innerHTML = `<img src="https://openweathermap.org/img/wn/${dataFromServerH.hourly[i].weather[0].icon}@2x.png">`;

      let createDivDF = document.createElement("div");
      createDivDF.innerText = dataFromServerH.hourly[i].weather[0].main;

      let createDivDT = document.createElement("div");
      createDivDT.setAttribute("class", "day-temp");
      createDivDT.innerText = Math.round(dataFromServerH.hourly[i].temp - 273);

      let createDivDW = document.createElement("div");
      createDivDW.setAttribute("class", "day-wind");
      createDivDW.innerText = dataFromServerH.hourly[i].wind_speed;

      createDivHTI.appendChild(createDivDH);
      createDivHTI.appendChild(createDivDI);
      createDivHTI.appendChild(createDivDF);
      createDivHTI.appendChild(createDivDT);
      createDivHTI.appendChild(createDivDW);

      watherHourlyId.appendChild(createDivHTI);
    }

    console.log(dataFromServerH);
  }
}

