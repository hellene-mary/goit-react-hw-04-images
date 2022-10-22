import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ image, onClick }) {
    // console.log('image', image);
    return (
        <li className={css.imageGalleryItem}>
            <img
                id={image.id}
                src={image.webformatURL}
                alt={image.tags}
                data-large={image.largeImageURL}
                onClick={onClick}
            />
        </li>
    );
}
