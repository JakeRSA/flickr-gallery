import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Image from "../Image";
import "./Gallery.scss";

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
    this.calcImageSize();
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

  trackMouse(event) {
    this.setState({mouseX: event.clientX, mouseY: event.clientY})
  }

  handleDragImage(imageUrl) {
    window.addEventListener("mousemove", (e) => this.trackMouse(e))
    this.setState({ dragging: imageUrl });
  }

  render() {
    return (
      <div
        className="gallery-root"
        style={{
          gridTemplateColumns: `repeat(${this.state.imagesPerRow}, 1fr)`,
        }}
      >
        {this.state.dragging && (
          <img
          className="draggable-img"
          src={this.state.dragging}
          style={{
            height: this.state.imageSize,
            width: this.state.imageSize,
            top: this.state.mouseY,
            left: this.state.mouseX,
            transform: "translate(-50%, -50%)"
          }}
          ></img>
        )}
        {this.state.images.map((dto) => {
          return (
            <Image
              key={"image-" + dto.id}
              dto={dto}
              imageSize={this.state.imageSize}
              onDragImage={(url) => {
                this.handleDragImage(url);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default Gallery;
