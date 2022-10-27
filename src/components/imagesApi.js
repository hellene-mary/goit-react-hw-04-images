import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function imagesApi({ search, page }) {
  try {
    const response = await axios.get('', {
      params: {
        key: '29743747-4d974b8d370b5a5c48adadad9',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
        page: page,
      },
    });
    return response;
  } catch (error) {
    console.log('error', error);
  }
}
