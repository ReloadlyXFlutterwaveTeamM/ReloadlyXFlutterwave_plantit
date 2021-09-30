const NEWS_API_KEY = process.env.REACT_APP_NEWS_API;

const getNewsArticles = async () => {
  try {
    const url = `https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=climatechnage`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': NEWS_API_KEY,
        'x-bingapis-sdk': 'true',
      },
    });

    if (!res.ok) {
      throw new Error('Unexpected Network Error');
    }

    const response = await res.json();
    return response;
  } catch (error) {
    window.console.error('GET NEWS ARTICLES', error.message);
    throw new Error('Failed to retrieve news articles');
  }
};

export default getNewsArticles;
