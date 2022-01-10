/* eslint-disable arrow-body-style */
/* eslint-disable lines-between-class-members */

class ApiService {
  // baseStr = 'http://kata.academy:8022';
  // baseStr = `https://api.realworld.io/api`;
  baseStr = `https://cirosantilli-realworld-next.herokuapp.com/api`;

  async requestGet(url) {
    const body = await fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`error fetch URL ${url}, response status ${res.status}`);
        }
        return res.json();
      })
      .catch((e) => console.log(e));
    // console.log(body);
    return body;
  }

  // получает количество стататей с лимитом 1000
  async getArticlesMax() {
    const url = new URL(`${this.baseStr}/articles`);
    url.searchParams.set('limit', 10000);

    const body = await this.requestGet(url);
    return body.articlesCount;
  }

  async getArticles() {
    const url = new URL(`${this.baseStr}/articles`);
    url.searchParams.set('limit', 5);

    const body = await this.requestGet(url);
    return body.articles;
  }

  // получаетс статьи с определенной страницы
  async getArticlesByPageNum(pageNum) {
    const url = new URL(`${this.baseStr}/articles`);
    url.searchParams.set('limit', 5);
    url.searchParams.set('offset', pageNum);

    const body = await this.requestGet(url);
    return body.articles;
  }

  async getAarticleFull(slug) {
    const url = new URL(`${this.baseStr}/articles/${slug}`);

    const body = await this.requestGet(url);
    return body.article;
  }
}

const apiService = new ApiService();

export default apiService;
