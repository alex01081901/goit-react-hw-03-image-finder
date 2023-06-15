import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, openModal }) => {
  return images.map(image => {
    return (
      <GalleryItem key={image.id}>
        <GalleryItemImage
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => openModal(image.largeImageURL)}
        />
      </GalleryItem>
    );
  });
};