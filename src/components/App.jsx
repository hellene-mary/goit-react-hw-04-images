import React, { Component } from 'react';
import axios from 'axios';
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

    //*отримання значення інпуту пошуку
    trackingSearch = evt => {
        evt.preventDefault();

        const form = evt.currentTarget;
        const searchValue = form.elements.search.value;
        // console.log('searchValue', searchValue);
        this.setState({ search: searchValue });

        form.reset();
    };

    // стадія оновлення
    async componentDidUpdate(prevProps, prevState) {
        const prevSearch = prevState.search;
        const currentSearch = this.state.search;
        const prevPage = prevState.page;
        const currentPage = this.state.page;

        if (prevSearch !== currentSearch || prevPage !== currentPage) {
            this.setState({ loading: true });

            this.Api();
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

            // console.log('response.data.hits', response.data.totalHits);
            this.setState({ totalImage: response.data.totalHits });

            this.setState(prevState => {
                return {
                    images: [...prevState.images, ...response.data.hits],
                };
            });
        } catch (error) {
            console.log('error', error);
        } finally {
            this.setState({ loading: false });
        }
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

    loadMoreImages = () => {
        // console.log('click on Load more');

        this.setState(prevState => {
            return { page: prevState.page + 1 };
        });
    };

    render() {
        const { images, showModal, modal, loading, page, totalImage } = this.state;
        const maxPage = Math.ceil(totalImage / 12);
        const showButton = images.length > 0 && page < maxPage;
        console.log('showButton', showButton);

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
            </>
        );
    }
}

export default App;
