import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button/Button';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGalleryItem } from './imageGalleryItem/ImageGalleryItem';

axios.defaults.baseURL = 'https://pixabay.com/api/';

class App extends Component {
    state = {
        search: '',
        images: [],
        page: 1,
        loading: false,
        showModal: false,
        modal: {},
        totalImage: 0,
    };

    // стадія оновлення
    async componentDidUpdate(prevProps, prevState) {
        const prevSearch = prevState.search;
        const currentSearch = this.state.search;
        const prevPage = prevState.page;
        const currentPage = this.state.page;

        //для нового пошуку
        if (prevSearch !== currentSearch) {
            this.setState({ loading: true, page: 1 });

            const response = await this.Api();

            if (response.data.hits.length === 0) {
                //сповіщення
                // console.log('Немає зображень', response.data.hits);
                return this.notificationError();
            }
            this.setState({ images: response.data.hits, totalImage: response.data.totalHits });
        }

        //для новї сторінки
        if (prevPage !== currentPage) {
            this.setState({ loading: true });

            const response = await this.Api();
            this.setState(prevState => {
                return {
                    images: [...prevState.images, ...response.data.hits],
                };
            });
        }
    }

    //! винести Api в окремий компонент?
    Api = async () => {
        try {
            const response = await axios.get('', {
                params: {
                    key: '29743747-4d974b8d370b5a5c48adadad9',
                    q: this.state.search,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    per_page: '12',
                    page: this.state.page,
                },
            });
            return response;
        } catch (error) {
            console.log('error', error);
        } finally {
            this.setState({ loading: false });
        }
    };

    //отримання значення інпуту пошуку
    trackingSearch = evt => {
        evt.preventDefault();

        const form = evt.currentTarget;
        const searchValue = form.elements.search.value;

        if (searchValue.trim() === '') {
            return this.notificationInfo();
        }

        this.setState({ search: searchValue });

        form.reset();
    };

    // toggleModal = evt => {
    //     this.setState({ modal: { alt: evt.target.alt, url: evt.currentTarget.dataset.large } });

    //     const { showModal } = this.state;

    //     this.setState({ showModal: !showModal });
    // };

    openModal = evt => {
        this.setState({ modal: { alt: evt.target.alt, url: evt.currentTarget.dataset.large } });

        this.setState({ showModal: true });
    };

    closeModal = evt => {
        this.setState({ showModal: false });
    };

    //просто збільшує сторінку на 1
    loadMoreImages = () => {
        // console.log('click on Load more');

        this.setState(prevState => {
            return { page: prevState.page + 1 };
        });
    };

    notificationError = () => toast.error('Nothing was found for your request. Try again!');
    notificationInfo = () => toast.info('Write something and we will find it!');

    render() {
        const { images, showModal, modal, loading, page, totalImage } = this.state;
        const maxPage = Math.ceil(totalImage / 12);
        const showButton = images.length > 0 && page < maxPage;
        // console.log('showButton', showButton);

        return (
            <>
                <Searchbar onSubmit={this.trackingSearch} />
                <ImageGallery>
                    {images.map(image => (
                        <ImageGalleryItem key={image.id} image={image} onClick={this.openModal} />
                    ))}
                </ImageGallery>
                {loading && <Loader />}
                {showButton && <Button onClick={this.loadMoreImages} />}
                {showModal && <Modal image={modal} onClose={this.closeModal} />}
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
}

export default App;
