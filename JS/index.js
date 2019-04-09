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
    `<div class="user-info" id="user-info">
      <div class="personal-details">
        <img src=${avatar} alt="user picture">
        <div class="contact-details">
          <p class="italic"><span class="bold">@</span> ${email}</p>
          <p class="bold">${name}</p>
          <p>${bio}</p>
        </div>
      </div>
      <div>
        <h3>Repositories</h3>
        <hr>
        <div class="repositories" id="repos-container"></div>
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
      `<div class="repo-info">
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

const generateDOMElements = async () => {
  try{
    let {
      avatar_url: avatar,
      bio,
      name,
      email,
    } = await githubService.getUserInfo(searchField.value);

    (bio === null) ? bio = 'No bio available' : null;
    (email === null) ? email = 'No email available' : null;
    (avatar === null) ? avatar = '../assets/images/github-logo.png' : null;

    const reposList = await githubService.getRepos(searchField.value);
    const infoHtml = parseResultInfo(avatar, email, name, bio);

    (name === undefined)
    ? searchContainer.insertAdjacentHTML('afterend', userNotFound)
    : searchContainer.insertAdjacentHTML('afterend', infoHtml);
  
    const reposContainer = document.getElementById('repos-container');
    reposContainer.insertAdjacentHTML('beforeend', parseReposList(reposList));
  
  }catch(error){console.warn(error)};
};

const userNotFound = `<p class="error-message" id="error">User does not exist</p>`;

const getUserInfo = () => {
  if (document.getElementById('user-info') || document.getElementById('error')) {
    console.log('if');
    document.getElementById('user-info').remove();
    generateDOMElements();
  } else {
    console.log('else');
    generateDOMElements();
  };
};


searchBtn.addEventListener('click', getUserInfo);