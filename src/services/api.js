
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '35199572-24462bcab0d1c9b478a6c9399';

export const getImages = async (searchQuery, page) => {
  const response = await axios.get(
    `/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};