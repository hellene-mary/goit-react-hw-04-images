import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button/Button';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGalleryItem } from './imageGalleryItem/ImageGalleryItem';
import { imagesApi } from './imagesApi';
import { notificationError, notificationInfo, notificationServerError, notificationSuccess } from './notification';

function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState({});
  const [totalImages, setTotalImages] = useState(0);

  const maxPage = Math.ceil(totalImages / 12);
  const showButton = images.length > 0 && page < maxPage;

  useEffect(() => {
    if (search === '') {
      return;
    }

    setLoading(true);
    setImages([]);

    newSearchRequestServer();

    return () => {
      // abirtController
    };
  }, [search]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setLoading(true);
    // console.log('loading...');
    moreImagesRequestServer();

    return () => {
      // abirtController
    };
  }, [page]);

  function trackingSearch(evt) {
    evt.preventDefault();

    const form = evt.currentTarget;
    const searchValue = form.elements.search.value;

    if (searchValue.trim() === '') {
      return notificationInfo();
    }

    setSearch(searchValue);
    setPage(1);

    form.reset();
  }

  function loadMoreImages() {
    setPage(prevState => prevState + 1);
    // console.log('page', page);
  }

  function openModal(evt) {
    const imageIngo = { alt: evt.target.alt, url: evt.currentTarget.dataset.large };

    setModal(imageIngo);

    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  async function newSearchRequestServer() {
    try {
      const response = await imagesApi({ search, page });

      if (response.data.hits.length === 0) {
        return notificationError();
      }

      setImages(response.data.hits);
      setTotalImages(response.data.totalHits);

      return notificationSuccess(response.data.totalHits);
    } catch (error) {
      console.log('error', error);
      return notificationServerError();
    } finally {
      setLoading(false);
    }
  }

  async function moreImagesRequestServer() {
    try {
      const response = await imagesApi({ search, page });
      const moreImages = response.data.hits;

      setLoading(false);

      setImages(prevState => {
        return [...prevState, ...moreImages];
      });
    } catch (error) {
      console.log('error', error);
      return notificationServerError();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Searchbar onSubmit={trackingSearch} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} onClick={openModal} />
        ))}
      </ImageGallery>
      {loading && <Loader />}
      {showButton && <Button onClick={loadMoreImages} />}
      {showModal && <Modal image={modal} onClose={closeModal} />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
