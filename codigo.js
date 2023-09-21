// ============================= API =============================
const api= "56d6df2d6da3a98526d4012839bffa04";

// ============================= CIUDAD 1 =============================
let botonBuscar = document.querySelector(".btnCiudad1");

const buscarCiudad1 = () => {
    let inputCiudad1 = document.querySelector(".ciudad1").value;

    document.querySelector("#loader1").classList.remove("d-none");
    document.querySelector("#loader1").classList.add("d-block");

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputCiudad1+"&appid="+api+"&lang=es&units=metric")
    .then(r => r.json()) 
    .then(infoClima => {
    console.log(infoClima);

    if (infoClima.cod != 200) {
        document.querySelector("#error1").classList.add("d-block");
        document.querySelector("#error1").classList.remove("d-none");
        document.querySelector("#loader1").classList.add("d-none");
        document.querySelector("#loader1").classList.remove("d-block");
        confirmCiudad1 = false
    } else if (infoClima.cod === 200) {
        document.querySelector("#loader1").classList.add("d-none");
        document.querySelector("#loader1").classList.remove("d-block");
        document.querySelector("#error1").classList.add("d-none");
        document.querySelector("#error1").classList.remove("d-block");
        confirmCiudad1 = true
        let lat1 = infoClima.coord.lat
        let lon2 = infoClima.coord.lon   

        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat1+"&lon="+lon2+"&exclude=minutely&appid="+api+"&lang=es&units=metric")
        .then(r => r.json()) 
        .then(infoClima2 => {
        console.log(infoClima2);

        /* Datos a mostrar */
        impPronosticoActual(1, infoClima2)
        impTemperatura(1, 1, infoClima2)
        impFechaActual(infoClima2, 1)
        proximosDias(infoClima2, 1)
        mostrarDatos(1)

        comparacion()
        })
    }
})
}

botonBuscar.addEventListener("click", buscarCiudad1);

// ============================= CIUDAD 2 =============================
let botonBuscar2 = document.querySelector(".btnCiudad2");

const buscarCiudad2 = () => {
    let inputCiudad2 = document.querySelector(".ciudad2").value;

    document.querySelector("#loader2").classList.remove("d-none");
    document.querySelector("#loader2").classList.add("d-block");

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputCiudad2+"&appid="+api+"&lang=es&units=metric")
    .then(r => r.json()) 
    .then(infoClima => {
    console.log(infoClima);

    if (infoClima.cod != 200) {
        document.querySelector("#error2").classList.add("d-block");
        document.querySelector("#error2").classList.remove("d-none");
        document.querySelector("#loader2").classList.add("d-none");
        document.querySelector("#loader2").classList.remove("d-block");
    } else if (infoClima.cod === 200) {
        document.querySelector("#loader2").classList.add("d-none");
        document.querySelector("#loader2").classList.remove("d-block");
        document.querySelector("#error2").classList.add("d-none");
        document.querySelector("#error2").classList.remove("d-block");
        confirmCiudad2 = true
        let lat1 = infoClima.coord.lat
        let lon2 = infoClima.coord.lon   

        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat1+"&lon="+lon2+"&exclude=minutely&appid="+api+"&lang=es&units=metric")
        .then(r => r.json()) 
        .then(infoClima2 => {
        console.log(infoClima2);

        /* Datos a mostrar */
        impPronosticoActual(2, infoClima2)
        impTemperatura(2, 2, infoClima2)
        impFechaActual(infoClima2, 2)
        proximosDias(infoClima2, 2)
        mostrarDatos(2)

        
        comparacion()
        })
    }
})
}

botonBuscar2.addEventListener("click", buscarCiudad2);


// ============================= MOSTRAR DATOS =============================
var confirmCiudad2 = Boolean
var confirmCiudad1 = Boolean

document.querySelector("#ciudadIngresada1").addEventListener("click", buscarCiudad1);
document.querySelector("#ciudadIngresada2").addEventListener("click", buscarCiudad2);

function mostrarDatos(id) {
    document.querySelector("#ciudadIngresada"+id+"").classList.remove("d-none");
    document.querySelector("#ciudadNoIngresada"+id+"").classList.add("d-none");
}

function impPronosticoActual(id, infoClima) {
    document.querySelector("#imagenActual"+id+"").src=`ClimaIcons/${infoClima.current.weather[0].icon}.png`
    
    let pantalla = window.screen.width
    if (pantalla <450) {
        document.getElementById("ciudadIngresada"+id+"").style.backgroundImage = `url(fondoEstados/f${infoClima.current.weather[0].icon}3x.png)`
    } else {
        document.getElementById("ciudadIngresada"+id+"").style.backgroundImage = `url(fondoEstados/f${infoClima.current.weather[0].icon}1x.png)`
    }
}

function impTemperatura(idTemp, idSt, infoClima) {
    document.querySelector("#tempActual"+idTemp+"").textContent= Math.round(infoClima.current.temp) + "°";
    document.querySelector("#st"+idSt+"").textContent="ST " + Math.round(infoClima.current.feels_like) + "°";
}

function impFechaActual(infoClima, id) {
    let fecha = new Date(infoClima.current.dt * 1000);
    let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octumbre", "Noviembre", "Diciembre"];

    document.querySelector("#fecha"+id+"").textContent= dias[fecha.getDay()] + " " + fecha.getDate() + " de " + meses[fecha.getMonth()]; 
}

var datos1 = {minTemp1:[], maxTemp1:[], viento1:[], probLluvia1:[], humedad1:[], uvi1:[]}
var datos2 = {minTemp2:[], maxTemp2:[], viento2:[], probLluvia2:[], humedad2:[], uvi2:[]}

function proximosDias(infoClima, id) {
    document.querySelector("#proxDias").innerHTML=""

 if (id == 1) {datos1 = {minTemp1:[], maxTemp1:[], viento1:[], probLluvia1:[], humedad1:[], uvi1:[]}} 
    else if (id == 2) {datos2 = {minTemp2:[], maxTemp2:[], viento2:[], probLluvia2:[], humedad2:[], uvi2:[]}}

    for (let y = 1; y < 6; y++) {
        let fecha = new Date(infoClima.daily[y].dt * 1000);
        let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
        let diaMostrar = dias[fecha.getDay()]

        let tempMin = Math.round(infoClima.daily[fecha.getDay()].temp.min);
        let tempMax = Math.round(infoClima.daily[fecha.getDay()].temp.max);
        let viento = Math.round(infoClima.daily[fecha.getDay()].wind_speed);
        let probLluvia = Math.round(infoClima.daily[fecha.getDay()].pop);
        let humedad = Math.round(infoClima.daily[fecha.getDay()].humidity);
        let presion = Math.round(infoClima.daily[fecha.getDay()].pressure);
        let uvi = Math.round(infoClima.daily[fecha.getDay()].uvi);

        if (id == 1) {
            datos1.minTemp1.push(tempMin)
            datos1.maxTemp1.push(tempMax)
            datos1.viento1.push(viento)
            datos1.probLluvia1.push(probLluvia)
            datos1.humedad1.push(humedad)
            datos1.uvi1.push(uvi)

        } else if (id == 2) {
            datos2.minTemp2.push(tempMin)
            datos2.maxTemp2.push(tempMax)
            datos2.viento2.push(viento)
            datos2.probLluvia2.push(probLluvia)
            datos2.humedad2.push(humedad)
            datos2.uvi2.push(uvi)
        }
        
        document.querySelector("#proxDias").insertAdjacentHTML("beforeend", 
        `<div class="col-5 col-md-3 col-lg-2 degradadoDiario borderCaja text-light p-2 m-2">
        <div class="pb-0">
            <h2>${diaMostrar}</h2>
            <img src="ClimaIcons/${infoClima.daily[fecha.getDay()].weather[0].icon}.png" alt="" class="iconoMini">
            <h4>`+tempMin+`° / `+tempMax+`°</h4>
            <span></span>
        </div>
        <div class="d-flex flex-column col-12">
            <p>`+viento+` Km/h</p>
            <p>`+probLluvia+` % Prob. lluvia</p>
            <p>`+humedad+` G/m3</p>
            <p>`+presion+` Pa</p>
            <p>`+uvi+` UVI</p>
        </div>
        </div>`);
    }
    if (id == 1) {
        let ciudad1 = document.querySelector(".ciudad1").value;
        document.querySelector("#proxDias").insertAdjacentHTML("afterbegin",`<h2 class="identificadorCiudad">${ciudad1}</h2>`);
    } else if (id == 2) {
        let ciudad2 = document.querySelector(".ciudad2").value;
        document.querySelector("#proxDias").insertAdjacentHTML("afterbegin",`<h2 class="identificadorCiudad">${ciudad2}</h2>`);
    }
    document.querySelector("#proxDias").classList.remove("d-none");
}

// ============================= COMPARACION DE DATOS =============================
var puntosCiudad1;
var puntosCiudad2;

function promedio(dato) {
    let suma = 0; let promedio = 0;
    for (let x = 0; x < dato.length; x++) {suma = dato[x] + suma}
    promedio = suma/dato.length
    return promedio;
}

function datoMaximo(dato) {
    let valor; let maximo = -999;
    for (let x = 0; x < dato.length; x++) {
        valor = dato[x]
        if (valor > maximo) {maximo = valor}
    }
    return maximo;
}

function datoMinimo(dato) {
    let valor; let minimo = 999;
    for (let x = 0; x < dato.length; x++) {
        valor = dato[x]
        if (valor < minimo) {minimo = valor}
    }
    return minimo;
}

function sumarMayor(promedioCiudad1, promedioCiudad2, valor) {
    if (promedioCiudad1 > promedioCiudad2) {
        puntosCiudad1 = puntosCiudad1 + valor
    } if (promedioCiudad2 > promedioCiudad1) {
        puntosCiudad2 = puntosCiudad2 + valor
    } else if (promedioCiudad1 == promedioCiudad2) {
        puntosCiudad1 = puntosCiudad1 + valor
        puntosCiudad2 = puntosCiudad2 + valor
    }
}

function sumarMenor(promedioCiudad1, promedioCiudad2, valorSumar) {
    if (promedioCiudad1 < promedioCiudad2) {
        puntosCiudad1 = puntosCiudad1 + valorSumar
    } if (promedioCiudad2 < promedioCiudad1) {
        puntosCiudad2 = puntosCiudad2 + valorSumar
    } else if (promedioCiudad1 == promedioCiudad2) {
        puntosCiudad1 = puntosCiudad1 + valorSumar
        puntosCiudad2 = puntosCiudad2 + valorSumar
    }
}

function comparacion() {
    if (confirmCiudad1 == true && confirmCiudad2 == true) {
        console.log("Ejecutando comparacion");

        puntosCiudad1 = 0
        puntosCiudad2 = 0
        
        /* Datos de temperatura */
        let tempPromedioMaxima1 = promedio(datos1.maxTemp1)
        let tempPromedioMaxima2 = promedio(datos2.maxTemp2)
        sumarMenor(tempPromedioMaxima1, tempPromedioMaxima2, 2)

        let tempPromedioMinima1 = promedio(datos1.minTemp1)
        let tempPromedioMinima2 = promedio(datos2.minTemp2)
        sumarMayor(tempPromedioMinima1, tempPromedioMinima2, 2)

        let tempMaxima1 = datoMaximo(datos1.maxTemp1)
        let tempMaxima2 = datoMaximo(datos2.maxTemp2)
        sumarMenor(tempMaxima1, tempMaxima2, 2)

        let tempMinima1 = datoMinimo(datos1.maxTemp1)
        let tempMinima2 = datoMinimo(datos2.maxTemp2)
        sumarMayor(tempMinima1, tempMinima2, 2)

        /* Datos de humedad */
        let humedadPromedio1 = promedio(datos1.humedad1)
        let humedadPromedio2 = promedio(datos2.humedad2)
        sumarMenor(humedadPromedio1, humedadPromedio2, 2)

        /* Datos de probabilidad de lluvia */
        let probLluviaPromedio1 = promedio(datos1.probLluvia1)
        let probLluviaPromedio2 = promedio(datos2.probLluvia2)
        sumarMenor(probLluviaPromedio1, probLluviaPromedio2, 4)

        /* Datos de viento */
        let vientosPromedio1 = promedio(datos1.viento1)
        let vientosPromedio2 = promedio(datos2.viento2)
        sumarMenor(vientosPromedio1, vientosPromedio2, 3)

        /* Datos de UVI */
        let uviPromedio1 = promedio(datos1.uvi1)
        let uviPromedio2 = promedio(datos2.uvi2)
        sumarMenor(uviPromedio1, uviPromedio2, 3)

        let ciudad1 = document.querySelector(".ciudad1").value;
        let ciudad2 = document.querySelector(".ciudad2").value;

        if (puntosCiudad1 > puntosCiudad2) {
            document.querySelector("#resultadoComparacion").innerHTML=`
            <p>La mejor opcion para recorrer durante los proximos 5 dias en base a nuestros parametros es ${ciudad1}.</p>
            <div class="d-flex flex-column h-100 justify-content-between">
                <p>Temperatura promedio: ${tempPromedioMinima1} / ${tempPromedioMaxima1}</p>
                <p>Temperatura Maxima: ${tempMaxima1}</p>
                <p>Temperatura Minima: ${tempMinima1}</p>
                <p>Humedad Promedio: ${humedadPromedio1}</p>
                <p>Probabilidad de lluvias: ${probLluviaPromedio1}</p>
                <p>Velocidad promedio Vientos: ${vientosPromedio1}</p>
                <p>Rayos UVI promedio: ${uviPromedio1}</p>
            </div>`
        } else if (puntosCiudad2 > puntosCiudad1){
            document.querySelector("#resultadoComparacion").innerHTML=`
            <p>La mejor opcion para recorrer durante los proximos 5 dias en base a nuestros parametros es ${ciudad2}.</p>
            <div class="d-flex flex-column h-100 justify-content-between">
                <p>Temperatura promedio: ${tempPromedioMinima2}° / ${tempPromedioMaxima2}°</p>
                <p>Temperatura Maxima: ${tempMaxima2}°</p>
                <p>Temperatura Minima: ${tempMinima2}°</p>
                <p>Humedad Promedio: ${humedadPromedio2} Pa</p>
                <p>Probabilidad de lluvias: ${probLluviaPromedio2} %</p>
                <p>Velocidad promedio Vientos: ${vientosPromedio2} Km/h</p>
                <p>Rayos UVI promedio: ${uviPromedio2} UVI</p>
            </div>`
        } else if (puntosCiudad2 == puntosCiudad1){
            document.querySelector("#resultadoComparacion").innerHTML=`
            <p>Tanto ${ciudad1} como ${ciudad2} tienen condiciones muy similares para los proximos 5 dias. En caso que quieras visitar una de las 2 ciudades no notaras diferencias en cuanto lo climatico.</p>`
        }

    } else {
        console.log("Error, no estan las 2 ciudades ingresadas");
    }
}