import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Image from "../Image";
import "./Gallery.scss";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import InfiniteScroll from "react-infinite-scroll-component";

const SortableImage = SortableElement(({ key, index, dto, imageSize }) => {
  return <Image key={key} index={index} dto={dto} imageSize={imageSize} />;
});

const SortableGallery = SortableContainer(
  ({ images, imageSize, imagesPerRow, imagesInDOM, loadMoreImages }) => {
    return (
      <InfiniteScroll
        className="gallery-root"
        style={{
          gridTemplateColumns: `repeat(${imagesPerRow}, 1fr)`,
        }}
        dataLength={imagesInDOM}
        next={loadMoreImages}
        hasMore={imagesInDOM < images.length}
      >
        {images.slice(0, imagesInDOM).map((image, index) => (
          <SortableImage
            key={"image-" + image.id}
            index={index}
            dto={image}
            imageSize={imageSize}
          />
        ))}
      </InfiniteScroll>
    );
  }
);

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      targetSize: 200,
      images: [],
      imageSize: 200,
      imagesPerRow: 5,
      imagesInDOM: 0,
    };

    this.calcImageSize = this.calcImageSize.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.loadMoreImages = this.loadMoreImages.bind(this);
  }

  getImages(tag) {
    this.setState({ images: [], imagesInDOM: 0 });
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=4000&format=json&nojsoncallback=1`;
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
        if (res.photos.photo.length >= 100)
          this.setState({
            imagesInDOM: 100,
          });
        else
          this.setState({
            imagesInDOM: res.photos.photo.length,
          });
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tag !== this.props.tag) {
      this.getImages(this.props.tag);
    }  
  }

  calcImageSize() {
    const galleryWidth = document.body.clientWidth;
    const imagesPerRow = Math.floor(galleryWidth / this.state.targetSize);
    const imageSize = galleryWidth / imagesPerRow;
    this.setState({ imageSize, imagesPerRow });
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState(({ images }) => ({
      images: arrayMove(images, oldIndex, newIndex),
    }));
  }

  loadMoreImages() {
    if (this.state.images.length > this.state.imagesInDOM + 100)
      this.setState((state) => ({ imagesInDOM: (state.imagesInDOM += 100) }));
    else this.setState({ imagesInDOM: this.state.images.length });
  }

  render() {
    return (
      <div>
        {this.state.images.length > 0 && (
          <div className="gallery-settings">
            <label htmlFor="targetSize">thumbnail size</label>
            <input
              id="targetSize"
              type="range"
              min={150}
              max={300}
              onChange={(event) => {
                this.setState({ targetSize: event.target.value });
                this.calcImageSize();
              }}
            />
          </div>
        )}

        <SortableGallery
          axis={"xy"}
          images={this.state.images}
          imageSize={this.state.imageSize}
          imagesPerRow={this.state.imagesPerRow}
          onSortEnd={this.onSortEnd}
          imagesInDOM={this.state.imagesInDOM}
          loadMoreImages={this.loadMoreImages}
        />
      </div>
    );
  }
}

export default Gallery;
