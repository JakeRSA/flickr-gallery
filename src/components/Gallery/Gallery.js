import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Image from "../Image";
import "./Gallery.scss";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableImage = SortableElement(({ key, index, dto, imageSize }) => {
  return <Image key={key} index={index} dto={dto} imageSize={imageSize} />;
});

const SortableGallery = SortableContainer(({ images, imageSize }) => {
  return (
    <div>
      {images.map((image, index) => (
        <SortableImage
          key={"image-" + image.id}
          index={index}
          dto={image}
          imageSize={imageSize}
        />
      ))}
    </div>
  );
});

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      imageSize: 200,
      imagesPerRow: 5,
    };

    this.calcImageSize = this.calcImageSize.bind(this);
  }

  getImages(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&nojsoncallback=1`;
    const baseUrl = "https://api.flickr.com/";
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: "GET",
    })
      .then((res) => res.data)
      .then((res) => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          this.setState({ images: res.photos.photo });
        }
        this.calcImageSize();
      });
  }

  componentDidMount() {
    this.getImages(this.props.tag);
    window.addEventListener("resize", this.calcImageSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calcImageSize);
  }

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }

  calcImageSize() {
    const galleryWidth = document.body.clientWidth;
    const targetSize = 200;
    const imagesPerRow = Math.floor(galleryWidth / targetSize);
    const imageSize = galleryWidth / imagesPerRow;
    this.setState({ imageSize, imagesPerRow });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ images }) => ({
      images: arrayMove(images, oldIndex, newIndex),
    }));
  };

  render() {
    return (
        <SortableGallery
         className="gallery-root"
          axis={"xy"}
          style={{
            gridTemplateColumns: `repeat(${this.state.imagesPerRow}, 1fr)`,
          }}
          images={this.state.images}
          imageSize={this.state.imageSize}
          onSortEnd={this.onSortEnd}
        />
    );
  }
}

export default Gallery;
