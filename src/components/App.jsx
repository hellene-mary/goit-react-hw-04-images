import React, { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './searchbar/Searchbar';

class App extends Component {
    state = {};

    // отримання значення інпуту пошуку
    trackingSearch = evt => {
        evt.preventDefault();

        const form = evt.currentTarget;
        const searchValue = form.elements.search.value;
        console.log('searchValue', searchValue);

        form.reset();
    };

    render() {
        return (
            <>
                <Searchbar onSubmit={this.trackingSearch} />
                <ImageGallery />
                <Button />
                <Loader />
            </>
        );
    }
}

export default App;
