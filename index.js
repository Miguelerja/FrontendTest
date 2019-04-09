class GithubService {
  async getUserInfoUsers(user) {
    try {
      const info = await fetch(`https://api.github.com/users/${user}`);
      return info.json();
    } catch(error){console.warn(error)};
  };
};

const githubService = new GithubService();
const searchField = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchContainer = document.getElementById('search-container');

const parseResultInfo = (avatar, email, name, bio) => {
  return (
    `<div class="user-info">
      <img src=${avatar} alt="user picture">
      <p>@ ${email}</p>
      <p>${name}</p>
      <p>${bio}</p>
    </div>`
  );
};

const userNotFound = `<p class="error-message">Does not exist</p>`;

const getUserInfo = async () => {
  try{
    const {
      avatar_url: avatar,
      bio,
      name,
      email,
    } = await githubService.getUserInfoUsers(searchField.value);
    const infoHtml = parseResultInfo(avatar, email, name, bio);
    
    (name === undefined)
    ? searchContainer.insertAdjacentHTML('afterend', userNotFound)
    : searchContainer.insertAdjacentHTML('afterend', infoHtml);
  }catch(error){console.warn(error)};
};

searchBtn.addEventListener('click', getUserInfo);