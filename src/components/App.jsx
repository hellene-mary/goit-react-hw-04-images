/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './imageGallery/ImageGallery';
import { ImageGalleryItem } from './imageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Searchbar } from './searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as message from './notification';
import { imagesApi } from './imagesApi';
import { Loader } from './Loader/Loader';

export function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [selectImage, setSelectImage] = useState(null);

  const maxPage = Math.ceil(totalImages / 12);
  const showButton = images.length > 0 && page < maxPage;

  function trackingSearchQuery(evt) {
    evt.preventDefault();

    const form = evt.currentTarget;
    const searchValue = form.elements.search.value;

    if (searchValue.trim() === '') {
      return message.notificationInfo();
    }
    setPage(1);
    setImages([]);
    setSearch(searchValue);

    form.reset();
  }

  useEffect(() => {
    if (search === '') {
      return;
    }

    async function newSearchRequestServer() {
      try {
        const response = await imagesApi({ search, page });

        const totalImages = response.data.totalHits;
        const images = response.data.hits;

        // якщо масив порожній
        if (totalImages === 0 || images === '') {
          return message.notificationError();
        }
        // якщо ні - записати дані в state
        setImages(prevState => {
          return [...prevState, ...images];
        });
        setTotalImages(totalImages);
      } catch (error) {
        // console.log('error in newSearchRequestServer');
        message.notificationServerError();
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    newSearchRequestServer();

    return () => {
      // abortColle
    };
  }, [search, page]);

  function loadMoreImages() {
    setPage(prevState => prevState + 1);
  }

  function openModal(evt) {
    const imageInfo = { alt: evt.target.alt, url: evt.currentTarget.dataset.large };

    setSelectImage(imageInfo);
  }

  function closeModal() {
    setSelectImage(null);
  }

  return (
    <>
      <Searchbar onSubmit={trackingSearchQuery} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} onClick={openModal} />
        ))}
      </ImageGallery>
      {loading && <Loader />}
      {showButton && <Button onClick={loadMoreImages} />}
      {selectImage && <Modal onClose={closeModal} image={selectImage} />}
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
