class GithubService {
  async getUserInfoUsers(user) {
    try {
      const info = await fetch(`https://api.github.com/users/${user}`);
      return info.json();
    } catch(error){return error};
  };
};

const githubService = new GithubService();
const searchField = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchContainer = document.getElementById('search-container');


const getUserInfo = async () => {
  try{
    const {
      avatar_url: avatar,
      bio,
      name,
      email,
    } = await githubService.getUserInfoUsers(searchField.value);
    console.log(searchContainer)
    searchContainer.insertAdjacentHTML('afterend',
      `<div class="user-info">
        <img src=${avatar} alt="user picture">
        <p>@ ${email}</p>
        <p>${name}</p>
        <p>${bio}</p>
      </div>`
    )
  }catch(error){
    searchContainer.innerHTML(
      `<p class="error-message">Does not exist</p>`
    );
  };
};

searchBtn.addEventListener('click', getUserInfo);