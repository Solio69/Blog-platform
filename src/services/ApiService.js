class ApiServise {
  // baseStr = 'http://kata.academy:8022';
  baseStr = `https://api.realworld.io/api`;

  async requestGet(url) {
    const body = await fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`error fetch URL ${url}, response status ${res.status}`);
        }
        return res.json();
      })
      .catch((e) => console.log(e));
    // console.log(body)
    return body;
  }

  async getArticles() {
    const url = new URL(`${this.baseStr}/articles`);
    url.searchParams.set('limit', 5);

    const body = await this.requestGet(url);
    return body;
  }

  async getArticlesByPageNum(pageNum) {
    const url = new URL(`${this.baseStr}/articles`);
    url.searchParams.set('limit', 5);
    url.searchParams.set('offset', pageNum);
  
    const body = await this.requestGet(url);
    return body;
  }

  async getAarticleFull(slug) {
    const url = new URL(`${this.baseStr}/articles/${slug}`);
  
    const body = await this.requestGet(url);
    return body;
  }
}

const apiServise = new ApiServise();

export default apiServise;
