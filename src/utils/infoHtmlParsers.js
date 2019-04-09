export const parseResultInfo = (avatar, email, name, bio) => {
  return (
    `<div class="user-info" id="user-info">
      <div class="personal-details flex">
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

export const parseReposList = (repos) => {
  return repos.reduce((finalHtml, repo) => {
    const {
      name,
      forks_count,
      stargazers_count,
      html_url
    } = repo;

    return (finalHtml +
      `<div class="repo-info">
        <a href="${html_url}" target="_blank">${name}</a>
        <div class="repo-activity flex">
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

export const userNotFound = '<p class="error-message bold" id="error">User does not exist</p>'; 
