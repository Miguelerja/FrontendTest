import githubService from './utils/github-service';
import {
  parseResultInfo, 
  parseReposList, 
  userNotFound,
} from './utils/infoHtmlParsers';

const searchField = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchContainer = document.getElementById('search-container');

const generateDOMElements = async () => {
  try {
    let {
      avatar_url: avatar,
      bio,
      name,
      email,
    } = await githubService.getUserInfo(searchField.value);

    (bio === null) ? bio = 'No bio available': null;
    (email === null) ? email = 'No email available': null;
    (avatar === null) ? avatar = '../assets/images/github-logo.png': null;

    const reposList = await githubService.getRepos(searchField.value);
    const userInfoHtml = parseResultInfo(avatar, email, name, bio);

    (reposList.message === 'Not Found') 
      ? searchContainer.insertAdjacentHTML('afterend', userNotFound)
      : searchContainer.insertAdjacentHTML('afterend', userInfoHtml);

    const reposContainer = document.getElementById('repos-container');
    reposContainer.insertAdjacentHTML('beforeend', parseReposList(reposList));

  } catch (error) {
    console.error(error);
  };
};

const getUserInfo = () => {
  const error = document.getElementById('error');
  const userInfo = document.getElementById('user-info');

  if (userInfo) {
    userInfo.remove();
    generateDOMElements();
  } else if (error) {
    error.remove();
    generateDOMElements();
  } else {
    generateDOMElements();
  };
};

searchBtn.addEventListener('click', getUserInfo);

