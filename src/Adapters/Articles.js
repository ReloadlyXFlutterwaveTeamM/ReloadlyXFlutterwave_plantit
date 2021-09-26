const NEWS_API_KEY = process.env.REACT_APP_NEWS_API;

const getNewsArticles = async () => {
  try {
    const url = `https://newsapi.org/v2/everything?q=climate+change`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${NEWS_API_KEY}`,
        Accept: 'application/json',
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
