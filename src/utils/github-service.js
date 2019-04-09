class GithubService {
  async getUserInfo(user) {
    try {
      const userInfo = await fetch(`https://api.github.com/users/${user}`);
      return userInfo.json();
    } catch (error) {
      return error;
    };
  };

  async getRepos(user) {
    try {
      const userRepos = await fetch(`https://api.github.com/users/${user}/repos`);
      return userRepos.json();
    } catch (error) {
      return error;
    };
  }
};

const githubService = new GithubService();

export default githubService;
