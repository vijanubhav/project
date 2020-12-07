// Weight converter JS
document.getElementById('weight-link-app').addEventListener('click', () => {
    document.getElementById('weight-app').classList.toggle('invisible');
})

document.getElementById("weight-output").style.visibility = "hidden";
document.getElementById("lbsInput").addEventListener("input", (e) => {
    document.getElementById("weight-output").style.visibility = "visible";
    let lbs = e.target.value;
    document.getElementById("gramsOutput").innerHTML = (lbs / 0.0022046).toFixed(2);
    document.getElementById("kgOutput").innerHTML = (lbs / 2.2046).toFixed(2);
    document.getElementById("ozOutput").innerHTML = lbs * 16;
});

//Weather converter JS
document.getElementById('weather-link-app').addEventListener('click', () => {
    document.getElementById('weather-app').classList.toggle('invisible');
})

document.getElementById("weather-output").style.visibility = "hidden";
let form = document.getElementById('weather-search');
let api_key = 'f7e4aab76dbbbe522e98aa1ef7c2c657';

form.addEventListener('submit', async (e) => {
    document.getElementById("weather-output").style.visibility = "visible";
    e.preventDefault();
    let city = document.getElementById('city').value;
    let urlString = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    let response = await fetch(urlString);
    let data = await response.json();
    document.getElementById("kevlinOutput").innerHTML = (data.main.temp).toFixed(2);
    // (K − 273.15) × 9/5 + 32 = °F
    document.getElementById("fahrenheitOutput").innerHTML = ((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2);
    // K − 273.15 = °C
    document.getElementById("degreeOutput").innerHTML = (data.main.temp - 273.15).toFixed(2);
})

//NEWS API JS
document.getElementById('news-link-app').addEventListener('click', () => {
    document.getElementById('news-app').classList.toggle('invisible');
})
let newsform = document.getElementById('news-search');
let news_api_key = 'a33281c04bf8ba95b0b14bf375ccbbe9';

newsform.addEventListener('submit', async (e) => {
    e.preventDefault();
    let searchterm = document.getElementById('search-term').value;
    let news_urlString = `https://gnews.io/api/v4/search?q=${searchterm}&lang=en&token=${news_api_key}`
    let news_response = await fetch(news_urlString);
    let news_data = await news_response.json();
    console.log(news_data.articles)

    // for (let i = 0; i < news_data.articles.length; i++) {

    //     let y = document.createElement('img');
    //     y.src = (news_data.articles[i].image);
    //     document.getElementById('resultsOutput').appendChild(y);

    //     let z = document.createElement('span');
    //     z.innerHTML = (news_data.articles[i].title);
    //     document.getElementById('resultsOutput').appendChild(z);

    //     let x = document.createElement('a');
    //     x.innerHTML = "Read the full article here: <br>" + (news_data.articles[i].url);
    //     x.href = (news_data.articles[i].url);
    //     document.getElementById('resultsOutput').appendChild(x);
    //     document.getElementById('search-term').value = '';
    // }

    news_data.articles.forEach(news => {
        let y = document.createElement('img');
        y.src = (news.image);
        document.getElementById('resultsOutput').appendChild(y);

        let z = document.createElement('span');
        z.innerHTML = (news.title);
        document.getElementById('resultsOutput').appendChild(z);

        let x = document.createElement('a');
        x.innerHTML = "Read the full article here: <br>" + (news.url);
        x.href = (news.url);
        document.getElementById('resultsOutput').appendChild(x);
        document.getElementById('search-term').value = '';
    })
})


document.getElementById("resetBtn").onclick = newsreset;

function newsreset() {
    document.getElementById('resultsOutput').innerHTML = "";
}

// let topics = [
//     { topic: 'world', url: 'https://gnews.io/api/v3/topics/world' },
//     { topic: 'nation', url: 'https://gnews.io/api/v3/topics/nation' },
//     { topic: 'business', url: 'https://gnews.io/api/v3/topics/business' },
//     { topic: 'technology', url: 'https://gnews.io/api/v3/topics/technology' },
//     { topic: 'entertainment', url: 'https://gnews.io/api/v3/topics/entertainment' },
//     { topic: 'sports', url: 'https://gnews.io/api/v3/topics/sports' },
//     { topic: 'science', url: 'https://gnews.io/api/v3/topics/science' },
//     { topic: 'health', url: 'https://gnews.io/api/v3/topics/health' }
// ]

//Stocks API JS
document.getElementById('stock-link-app').addEventListener('click', () => {
    document.getElementById('stock-app').classList.toggle('invisible');
})
let stockform = document.getElementById('stock-search');
let stock_api_key = 'eb1e3adb1dbaaa4e67ccb353e07bf885';

stockform.addEventListener('submit', async (e) => {
    e.preventDefault();
    let stock = document.getElementById('stock').value.toUpperCase();
    // for (let i = 0; i < stock_data.length; i++) {
    //     document.getElementById('stockOutput').innerHTML =
    //         ("Symbol: " + stock_data[i].symbol + "<br>" +
    //             "Name: " + stock_data[i].name + "<br>" +
    //             "Price: $" + stock_data[i].price + "<br>" +
    //             "Day-High: $" + stock_data[i].dayHigh + "<br>" +
    //             "Day-Low: $" + stock_data[i].dayLow + "<br>" +
    //             "Change Percentage: " + stock_data[i].changesPercentage + "<br>" +
    //             "Change: $" + stock_data[i].change + "<br>");
    //     document.getElementById('stock').value = '';
    // }
    stockValue();
    async function stockValue() {
        let stock_urlString = `https://financialmodelingprep.com/api/v3/quote/${stock}?apikey=${stock_api_key}`
        let stock_response = await fetch(stock_urlString);
        let stock_data = await stock_response.json();
        console.log(stock_data);
        stock_data.forEach(stocks => {
            document.getElementById('stockOutput').innerHTML =
                ("Symbol: " + stocks.symbol + "<br>" +
                    "Name: " + stocks.name + "<br>" +
                    "Price: $" + stocks.price + "<br>" +
                    "Day-High: $" + stocks.dayHigh + "<br>" +
                    "Day-Low: $" + stocks.dayLow + "<br>" +
                    "Change Percentage: " + stocks.changesPercentage + "<br>" +
                    "Change: $" + stocks.change + "<br>");
            document.getElementById('stock').value = '';
        })
        createChart();
    }

    async function createChart() {
        let stock_4hour_URL = `https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?timeseries=30&apikey=${stock_api_key}`
        let stock_4hour_response = await fetch(stock_4hour_URL);
        let stock_4hour_data = await stock_4hour_response.json();
        console.log(stock_4hour_data);
        document.getElementById('chart').innerHTML = "";
        let newChart = document.createElement('canvas');
        newChart.setAttribute('id', 'myChart');
        document.getElementById('chart').appendChild(newChart);
        let ctx = document.getElementById('myChart').getContext('2d');
        let xlabels = [];
        let ylabels = [];
        let hprice = [];
        stock_4hour_data.historical.forEach(s => {
            xlabels.push(s.label);
            ylabels.push(s.low);
            hprice.push(s.high);
        })
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xlabels.reverse(),
                datasets: [{
                    label: `Low Price`,
                    data: ylabels,
                    fill: false,
                    backgroundColor: 'red',
                    borderColor: ['red'],
                    borderWidth: 1
                }, {
                    label: `High Price`,
                    data: hprice,
                    fill: false,
                    backgroundColor: 'blue',
                    borderColor: ['green'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            callback: function (value, index, values) {
                                return '$' + value;
                            }
                        }
                    }]
                }
            }
        })
    }
    // setInterval(stockValue, 5000);
})

document.getElementById("stockresetBtn").onclick = stockreset;

function stockreset() {
    document.getElementById('stockOutput').innerHTML = "";
    document.getElementById('chart').innerHTML = "";
}


//Movies API JS
document.getElementById('movie-link-app').addEventListener('click', () => {
    document.getElementById('movie-app').classList.toggle('invisible');
})
let movieform = document.getElementById('movie-search');
let movie_api_key = '475588ce';

movieform.addEventListener('submit', async (e) => {
    e.preventDefault();
    let movie = document.getElementById('movie').value.toUpperCase();
    let movie_urlString = `http://www.omdbapi.com/?s=${movie}&apikey=${movie_api_key}`
    let movie_response = await fetch(movie_urlString);
    let movie_data = await movie_response.json();
    console.log(movie_data);

    // for (let i = 0; i < movie_data.Search.length; i++) {

    //     let poster = document.createElement('img');
    //     poster.src = (movie_data.Search[i].Poster);
    //     document.getElementById('movieOutput').appendChild(poster);

    //     let title = document.createElement('p');
    //     title.innerHTML = (movie_data.Search[i].Title);
    //     document.getElementById('movieOutput').appendChild(title);

    //     let year = document.createElement('p');
    //     year.innerHTML = movie_data.Search[i].Year;
    //     document.getElementById('movieOutput').appendChild(year);

    //     document.getElementById('movie').value = '';
    // }
    movie_data.Search.forEach(movies => {
        let poster = document.createElement('img');
        poster.src = (movies.Poster);
        document.getElementById('movieOutput').appendChild(poster);

        let title = document.createElement('p');
        title.innerHTML = (movies.Title);
        document.getElementById('movieOutput').appendChild(title);

        let year = document.createElement('p');
        year.innerHTML = movies.Year;
        document.getElementById('movieOutput').appendChild(year);

        document.getElementById('movie').value = '';
    })
})

document.getElementById("movieresetBtn").onclick = moviereset;

function moviereset() {
    document.getElementById('movieOutput').innerHTML = "";
}





