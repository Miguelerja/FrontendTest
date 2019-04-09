class GithubService {
  async getUserInfoUsers(user) {
    try {
      const info = await fetch(`https://api.github.com/users/${user}`)
      return info.json();
    } catch(error){console.warn(error)};
  };
};

const githubService = new GithubService();
const searchField = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');


const getUserInfo = () => {
  console.log(githubService.getUserInfoUsers(searchField.value));
};


searchBtn.addEventListener('click', getUserInfo);