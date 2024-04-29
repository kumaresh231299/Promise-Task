function element(tag, classname, id, text) {
    let tags = document.createElement(tag);
    tags.classList = classname;
    tags.id = id;
    tags.innerHTML = text;
    return tags
}

let container = element("div", "container", "", "");
const h1 = element("h1", "text-center", "title", "Countries weather Details");
const row = element("div", "row", "", "");


const response = fetch("https://restcountries.com/v3.1/all");
response.then((data) => data.json())
    .then((result) => {
        // console.log(result)
        for (let i = 0; i < result.length; i++) {
            const col = document.createElement("div");
            col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4"
            col.innerHTML = `
        <div class="card h-100">
        <div class="card-header">
        <h5 class="card-title text-center ">${result[i].name.common}</h5>
        </div>
        <div class="img-box">
        <img src="${result[i].flags.png}" class="card-img-top" alt="country image"/>
        </div>
        <div class="card-body">
        <div class="card-text  text-center">Region : ${result[i].region}</div> 
        <div class="card-text  text-center">Captial : ${result[i].capital}</div> 
        <div class="card-text  text-center">Country Code : ${result[i].cca3}</div> 
        <button class="btn btn-primary">Click For Weather</button>
        </div>
        </div>
        `;
            row.append(col);
        }
        //button logic for appending weather details from weather api
        let buttons = document.querySelectorAll("button");
        buttons.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                let latlng = result[index].latlng;
                let lat = latlng[0];
                let long = latlng[1];

                let weatherApi = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2399704b57b89908392193b5aab2effe`);
                weatherApi.then((data1) => data1.json())
                    .then((res) => {
                        alert(`weather of ${result[index].name.common} is ${Math.floor(res.main.temp)}🌡c`)
                    })

            })
        })

    });


document.body.append(h1, container);
container.append(row);
