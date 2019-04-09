import githubService from './github-service';
import {
  parseResultInfo, 
  parseReposList, 
  userNotFound,
} from './infoHtmlParsers';

export default async function DOMGenerator () {
  try {
    const searchField = document.getElementById('search-input');
    const searchContainer = document.getElementById('search-container');
    const reposList = await githubService.getRepos(searchField.value);
    
    let {
      avatar_url: avatar,
      bio,
      name,
      email,
    } = await githubService.getUserInfo(searchField.value);

    (bio === null) ? bio = 'No bio available': null;
    (email === null) ? email = 'No email available': null;
    (avatar === null) ? avatar = '../assets/images/github-logo.png': null;

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