const APIURL = 'https://api.github.com/users/';

const mainEl = document.getElementById('main');
const formEl = document.getElementById('form');
const searchEl = document.getElementById('search');

async function getUser(username = 'DiogoMarques2003') {
    createUserCard((await (await fetch(APIURL + username)).json()));

}

async function getRepos(username) {
    addReposToCard((await (await fetch(`${APIURL}${username}/repos`)).json()));
}

function createUserCard(user) {
    if (user.message === 'Not Found') return;
    const { avatar_url, name, bio, followers, following, public_repos } = user;

    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${avatar_url}" alt="${name}" />
            </div>
            <div class="user-info">
                <h2>${name ? name : ''}</h2>
                <p>${bio ? bio : ''}</p>

                <ul class="info">
                    <li>${followers}<strong>Followers</strong></li>
                    <li>${following}<strong>Following</strong></li>
                    <li>${public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>

            </div>
        </div>
    `;

    getRepos(user.login);

    mainEl.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    if (repos.length === 0) return;
    const reposEL = document.getElementById('repos');

    repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 10).forEach(repo => {
        const { html_url, name } = repo;

        const repoEL = document.createElement('a');
        repoEL.classList.add('repo');

        repoEL.href = html_url;
        repoEL.target = '_blank';
        repoEL.innerText = name;

        reposEL.appendChild(repoEL);
    });
}

formEl.addEventListener('submit', e => {
    e.preventDefault();

    const user = searchEl.value;

    if (!user) return;

    getUser(user);
    searchEl.value = '';

});

getUser();