import React, { useState, useEffect } from 'react';

import { Button, Carousel, Image, Modal } from 'react-bootstrap';

const ImageCarousel = ({
  images,
  onButtonClick,
  onImageClick,
  onSelectClick,
  carouselHeight,
  buttonIcon,
}) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    setActiveImage(images?.[0]);
    if (images.length === 0) setActiveIndex(0);
    else if (activeIndex >= images.length) setActiveIndex(images.length - 1);
  }, [images, activeIndex]); // dodany activeIndex - moze nie wyjebie

  const handleButtonClick = (selectedImage) => {
    if (onButtonClick) onButtonClick(selectedImage);
    else handleShowModal();
  };

  const handleImageClick = (selectedImage) => {
    if (onImageClick) onImageClick(selectedImage);
    else handleShowModal();
  };

  const handleCarouselSelect = (index) => {
    if (onSelectClick) onSelectClick(images?.[index]);

    setActiveIndex(index);
    setActiveImage(images?.[index]);
  };

  if (!images || images?.length === 0) {
    return (
      <div className='d-flex justify-content-center align-items-center w-100 h-100 text-muted'>
        No images to display
      </div>
    );
  }

  return (
    <>
      <Carousel
        className='image-carosuel w-100'
        style={{ height: carouselHeight }}
        slide={false}
        interval={null}
        activeIndex={activeIndex}
        defaultActiveIndex={0}
        onSelect={handleCarouselSelect}
      >
        {images.map((image, index) => {
          const imageURL = URL.createObjectURL(image);
          return (
            <Carousel.Item key={index}>
              <div className='d-flex justify-content-center align-items-center h-100'>
                <img
                  className='d-block mw-100'
                  style={{ maxHeight: carouselHeight }}
                  onClick={() => {
                    handleImageClick(activeImage);
                  }}
                  src={imageURL}
                  alt='uploaded'
                />
              </div>
              <Carousel.Caption className='cursor-transparent-caption'>
                <Button
                  className='p-0'
                  variant='outline-dark'
                  type='button'
                  onClick={() => {
                    handleButtonClick(activeImage);
                  }}
                >
                  {buttonIcon}
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      {activeImage && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          animation={false}
          centered
          dialogClassName='modal-lg'
        >
          <Modal.Header closeButton>
            <Modal.Title>{activeImage?.name || 'No name'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='p-1 d-flex justify-content-center'>
            <Image
              className='mw-100'
              style={{ maxHeight: '444px' }}
              src={URL.createObjectURL(activeImage)}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ImageCarousel;