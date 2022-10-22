import React, { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
    state = {};

    //слухач на клік по клавіатурі
    componentDidMount() {
        window.addEventListener('keydown', this.keydownClick);
    }

    //видалення слухача на клік по клавіатурі
    componentWillUnmount() {
        window.removeEventListener('keydown', this.keydownClick);
    }

    //закриття модалки по кліку на Escape
    keydownClick = evt => {
        if (evt.code === 'Escape') {
            this.props.onClose();
        }
    };

    //закриття модалки по кліку на overly
    backdropClick = evt => {
        if (evt.target === evt.currentTarget) {
            this.props.onClose();
        }
    };

    render() {
        const {
            onClick,
            image: { alt, url },
        } = this.props;

        return (
            <div className={css.overlay} onClick={this.backdropClick}>
                <div className={css.modal}>
                    <img src={url} alt={alt} onClick={onClick} />
                </div>
            </div>
        );
    }
}

export default Modal;
