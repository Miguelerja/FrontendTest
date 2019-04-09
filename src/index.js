import DOMGenerator from './utils/DOMGenerator';

const searchBtn = document.getElementById('search-btn');

const getUserInfo = () => {
  const error = document.getElementById('error');
  const userInfo = document.getElementById('user-info');

  if (userInfo) {
    userInfo.remove();
    DOMGenerator();
  } else if (error) {
    error.remove();
    DOMGenerator();
  } else {
    DOMGenerator();
  };
};

searchBtn.addEventListener('click', getUserInfo);

