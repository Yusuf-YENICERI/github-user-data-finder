let dataUrl = (dataurl) => `https://api.github.com/users/${dataurl}`;
const searchInputBar = document.querySelector(".search__input__bar");
const searchResultNow = document.querySelector(".search__result__now");
const searchResultLast = document.querySelector(".search__result__last");
const profile = document.querySelector("#userProfile");
const userRepos = document.querySelector("#userRepos");
const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", getFullData);
var fullData;
var personParse;
var bioControl = "";
var nameControl = "";

if (localStorage.getItem("person") == null) {
  localStorage.setItem("person", JSON.stringify([]));
} else {
  personParse = JSON.parse(localStorage.getItem("person"));
  personParse.map((person) => {
    let lastUser = document.createElement("div");
    lastUser.classList.add("search__result__now__person");
    lastUser.innerHTML = `
    <div class="search__result__now__person__left">
      <img
        src="${person.avatar_url}"
        alt="avatar"
      />
    </div>
    <div class="search__result__now__person__right">
      <div class="search__result__now__person__right__name">
        ${person.name} <small>(${person.login})</small>
      </div>
      <div class="search__result__now__person__right__desc">
        ${person.bio}
      </div>
    </div>
  `;
    searchResultLast.appendChild(lastUser);

    lastUser.addEventListener("click", () => {
      fetch(dataUrl(person.login))
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let nameControl;
          let bioControl;

          if (data.name == null || data.name == undefined) {
            nameControl = "";
          } else {
            nameControl = data.name;
          }
          if (data.bio == null || data.bio == undefined) {
            bioControl = "";
          } else {
            bioControl = data.bio;
          }
          const userProfile = `
          <div class="userdata__profile__avatar">
            <img
              src="${data.avatar_url}"
              alt="avatar"
              class="userdata__profile__avatar"
            />
          </div>
          <div class="userdata__profile__about">
            <div class="userdata__profile__about__name-view">
              <h2>${nameControl} <small>(${data.login})</small></h2>
              <a href="${data.html_url}" target="_blank">Visit Profile</a>
            </div>
            <div class="userdata__profile__about__desc">
              ${bioControl}
            </div>
            <div class="userdata__profile__about__others">
              <span class="userdata__profile__about__others__followers">
                Followers: <span>${data.followers}</span>
              </span>
              <span class="userdata__profile__about__others__following">
                Following: <span>${data.following}</span>
              </span>
              <span class="userdata__profile__about__others__repo">
                Repositories: <span>${data.public_repos}</span>
              </span>
              <span class="userdata__profile__about__others__stars">
                Gists: <span>${data.public_gists}</span>
              </span>
            </div>
          </div>`;

          fetch(data.repos_url)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              data.map((e) => {
                let repo = document.createElement("div");
                repo.classList.add("userdata__repos__repo");
                let descControl;
                if (e.description == null || e.description == undefined) {
                  descControl = "";
                } else {
                  descControl = e.description;
                }
                repo.innerHTML = `
                  <h2><a href="${e.html_url}" target="_blank">${e.name}</a></h2>
                    <p class="userdata__repos__repo__desc">${descControl}</p>
                    <div class="userdata__repos__repo__status">
                      <span>
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          class="octicon octicon-star mr-2"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                          ></path>
                        </svg>
                        <span>${e.stargazers_count}</span></span
                      >
                      <span>
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          class="octicon octicon-eye mr-2"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"
                          ></path>
                        </svg>
                        <span>${e.watchers}</span>
                      </span>
                      <span>
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          class="octicon octicon-repo-forked mr-2"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          ></path>
                        </svg>
                        <span>${e.forks}</span>
                      </span>
                    </div>
                `;
                userRepos.appendChild(repo);
              });
            });
          profile.innerHTML = userProfile;
          userRepos.innerHTML = "";
        });
    });
  });
}

function getFullData() {
  if (searchInputBar.value !== "") {
    fetch(dataUrl(searchInputBar.value))
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const parseData = JSON.parse(data);
        if (parseData.bio == null || parseData.bio == undefined) {
          bioControl == "";
        } else {
          bioControl = parseData.bio;
        }
        if (parseData.name == null || parseData.name == undefined) {
          nameControl == "";
        } else {
          nameControl = parseData.name;
        }
        searchResultNow.innerHTML = `
          <legend>Now</legend>
          <div class="search__result__now__person" onclick="fullData()">
            <div class="search__result__now__person__left">
              <img
                src="${parseData.avatar_url}"
                alt="avatar"
              />
            </div>
            <div class="search__result__now__person__right">
              <div class="search__result__now__person__right__name">
                ${nameControl} <small>(${parseData.login})</small>
              </div>
              <div class="search__result__now__person__right__desc">
                ${bioControl}
              </div>
            </div>
          </div>
        `;

        fullData = function getData() {
          let personParse = JSON.parse(localStorage.getItem("person"));
          personParse.push({
            name: nameControl,
            login: parseData.login,
            bio: bioControl,
            avatar_url: parseData.avatar_url,
          });
          localStorage.setItem("person", JSON.stringify(personParse));

          const userProfile = `
          <div class="userdata__profile__avatar">
            <img
              src="${parseData.avatar_url}"
              alt="avatar"
              class="userdata__profile__avatar"
            />
          </div>
          <div class="userdata__profile__about">
            <div class="userdata__profile__about__name-view">
              <h2>${nameControl} <small>(${parseData.login})</small></h2>
              <a href="${parseData.html_url}" target="_blank">Visit Profile</a>
            </div>
            <div class="userdata__profile__about__desc">
              ${bioControl}
            </div>
            <div class="userdata__profile__about__others">
              <span class="userdata__profile__about__others__followers">
                Followers: <span>${parseData.followers}</span>
              </span>
              <span class="userdata__profile__about__others__following">
                Following: <span>${parseData.following}</span>
              </span>
              <span class="userdata__profile__about__others__repo">
                Repositories: <span>${parseData.public_repos}</span>
              </span>
              <span class="userdata__profile__about__others__stars">
                Gists: <span>${parseData.public_gists}</span>
              </span>
            </div>
          </div>`;
          profile.innerHTML = userProfile;
          userRepos.innerHTML = "";
          fetch(parseData.repos_url)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              data.map((e) => {
                let repo = document.createElement("div");
                repo.classList.add("userdata__repos__repo");
                let descControl;
                if (e.description == null || e.description == undefined) {
                  descControl = "";
                } else {
                  descControl = e.description;
                }
                repo.innerHTML = `
                  <h2><a href="${e.html_url}" target="_blank">${e.name}</a></h2>
                    <p class="userdata__repos__repo__desc">${descControl}</p>
                    <div class="userdata__repos__repo__status">
                      <span>
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          class="octicon octicon-star mr-2"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                          ></path>
                        </svg>
                        <span>${e.stargazers_count}</span></span
                      >
                      <span>
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          class="octicon octicon-eye mr-2"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"
                          ></path>
                        </svg>
                        <span>${e.watchers}</span>
                      </span>
                      <span>
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          class="octicon octicon-repo-forked mr-2"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          ></path>
                        </svg>
                        <span>${e.forks}</span>
                      </span>
                    </div>
                `;
                userRepos.appendChild(repo);
              });
            });
        };
      });
  }
}

searchInputBar.addEventListener("input", () => {
  if (searchInputBar.value == "") {
    searchResultNow.innerHTML = "";
    userRepos.innerHTML = "";
    profile.innerHTML = "";
  }
});
