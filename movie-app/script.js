const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=APIKEY&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=APIKEY&query=";

const mainEl = document.getElementById('main');
const formEl = document.getElementById('form')
const searchEl = document.getElementById('search');

async function getMovies(url) {
    showMovies((await (await fetch(url)).json()).results);
}

function showMovies(movies) {
    //clear main
    mainEl.innerHTML = '';

    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${poster_path ? (IMGPATH + poster_path) : 'notfound.jpg'}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `

        mainEl.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) return 'green';
    else if (vote >= 5) return 'orange';
    else return 'red';
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = searchEl.value;
    if(!searchTerm) return;

    getMovies(SEARCHAPI + searchTerm);
    searchEl.value = '';
});

getMovies(APIURL);