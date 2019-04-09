class GithubService {
  async getUserInfo(user) {
    try {
      const userInfo = await fetch(`https://api.github.com/users/${user}`);
      return userInfo.json();
    } catch(error){console.warn(error)};
  };

  async getRepos(user) {
    try {
      const userRepos = await fetch(`https://api.github.com/users/${user}/repos`);
      return userRepos.json();
    } catch(error){console.warn(error)};
  }
};

const githubService = new GithubService();
const searchField = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchContainer = document.getElementById('search-container');

const parseResultInfo = (avatar, email, name, bio) => {
  return (
    `<div class="user-info">
      <div class="personal-details">
        <img src=${avatar} alt="user picture">
        <div class="contact-details">
          <p><span>@</span> ${email}</p>
          <p>${name}</p>
          <p>${bio}</p>
        </div>
      </div>
      <div class="repositories" id="repos-container">
        <h3>Repositories</h3>
        <hr>
      </div>
    </div>`
  );
};

const parseReposList = (repos) => {
  return repos.reduce((finalHtml, repo) => {
    const {
      name,
      forks_count,
      stargazers_count,
    } = repo;

    return (finalHtml +
      `<div class="repo-info>
        <h3>${name}</h3>
        <div class="repo-activity">
          <i class="fas fa-star"></i>
          <p>${stargazers_count}</p>
          <i class="fas fa-code-branch"></i>
          <p>${forks_count}</p>
        </div>
      </div>
      `
    );
  }, '');
};

const userNotFound = `<p class="error-message">Does not exist</p>`;

const getUserInfo = async () => {
  try{
    const {
      avatar_url: avatar,
      bio,
      name,
      email,
    } = await githubService.getUserInfo(searchField.value);
    const reposList = await githubService.getRepos(searchField.value);
    const infoHtml = parseResultInfo(avatar, email, name, bio);
    
    (name === undefined)
    ? searchContainer.insertAdjacentHTML('afterend', userNotFound)
    : searchContainer.insertAdjacentHTML('afterend', infoHtml);

    searchContainer.insertAdjacentHTML('afterend', parseReposList(reposList));

  }catch(error){console.warn(error)};
};

searchBtn.addEventListener('click', getUserInfo);