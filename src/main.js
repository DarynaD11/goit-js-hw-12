import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const searchInput = searchForm.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const searchQuery = searchInput.value.trim();
  clearGallery();
  hideLoadMoreButton();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.error({
        title: '',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    totalHits = data.totalHits;

    if (currentPage * 15 < totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Error fetching images. Please try again.',
      position: 'topRight',
    });
  }
}

async function handleLoadMore() {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    createGallery(data.hits);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.5,
      behavior: 'smooth',
    });

    if (currentPage * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Error loading more images.',
      position: 'topRight',
    });
  }
}
