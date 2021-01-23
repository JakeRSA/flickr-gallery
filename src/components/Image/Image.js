import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faExpand,
  faSyncAlt,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import Modal from "react-modal";
import "./Image.scss";

Modal.setAppElement("#root");

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      rotation: 0,
      hidden: false,
      showLarge: false,
      brightness: 100,
      contrast: 100,
      hue: 0,
      saturation: 100,
    };
  }

  hideImage() {
    this.setState({ hidden: true });
  }

  rotateImage() {
    if (this.state.rotation < 270) {
      this.setState((state) => ({ rotation: state.rotation + 90 }));
    } else this.setState({ rotation: 0 });
  }

  showLarge() {
    this.setState({ showLarge: true });
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  render() {
    return (
      <div
        className="image-root"
        style={{
          width: this.props.imageSize + "px",
          height: this.props.imageSize + "px",
          display: this.state.hidden ? "none" : "inline-block",
        }}
      >
        <img
          className="thumbnail-img"
          src={this.urlFromDto(this.props.dto)}
          alt={this.props.dto.title}
          style={{
            filter: `brightness(${this.state.brightness}%) contrast(${this.state.contrast}%) hue-rotate(${this.state.hue}deg) saturate(${this.state.saturation}%)`,
            transform: `rotate(${this.state.rotation}deg)`,
          }}
        />
        <Modal
          isOpen={this.state.showLarge}
          onRequestClose={() => {
            this.setState({ showLarge: false });
          }}
          className="image-modal"
        >
          <div className="modal-content">
            <span className="modal-header">
              <span className="modal-title-span">
                <p>
                  {this.props.dto.title
                    ? this.props.dto.title
                    : "untitled image"}
                </p>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={this.urlFromDto(this.props.dto)}
                  download={true}
                >
                  <FontAwesomeIcon
                    icon={faArrowCircleDown}
                    title="download image"
                    className="modal-icon"
                  />
                </a>
              </span>
              <FontAwesomeIcon
                icon={faTimes}
                title="close"
                className="modal-icon"
                onClick={() => {
                  this.setState({ showLarge: false });
                }}
              />
            </span>
            <img
              src={this.urlFromDto(this.props.dto)}
              alt={this.props.dto.title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                filter: `brightness(${this.state.brightness}%) contrast(${this.state.contrast}%) hue-rotate(${this.state.hue}deg) saturate(${this.state.saturation}%)`,
              }}
            ></img>
            <span className="modal-footer">
              <span>
                <label htmlFor="brightness">brightness</label>
                <input
                  id="brightness"
                  type="range"
                  min="0"
                  max="200"
                  value={this.state.brightness}
                  onChange={(e) => {
                    this.setState({ brightness: e.target.value });
                  }}
                />
              </span>
              <span>
                <label htmlFor="contrast">contrast</label>
                <input
                  id="contrast"
                  type="range"
                  min="0"
                  max="200"
                  value={this.state.contrast}
                  onChange={(e) => {
                    this.setState({ contrast: e.target.value });
                  }}
                />
              </span>
              <span>
                <label htmlFor="hue">hue</label>
                <input
                  id="hue"
                  type="range"
                  min="-180"
                  max="180"
                  value={this.state.hue}
                  onChange={(e) => {
                    this.setState({ hue: e.target.value });
                  }}
                />
              </span>
              <span>
                <label htmlFor="saturation">saturation</label>
                <input
                  id="saturation"
                  type="range"
                  min="0"
                  max="200"
                  value={this.state.saturation}
                  onChange={(e) => {
                    this.setState({ saturation: e.target.value });
                  }}
                />
              </span>
            </span>
          </div>
        </Modal>
        <div>
          <FontAwesomeIcon
            className="image-icon"
            icon={faSyncAlt}
            title="rotate"
            onClick={() => {
              this.rotateImage();
            }}
          />
          <FontAwesomeIcon
            className="image-icon"
            icon={faTrashAlt}
            title="delete"
            onClick={() => {
              this.hideImage();
            }}
          />
          <FontAwesomeIcon
            className="image-icon"
            icon={faExpand}
            title="expand"
            onClick={() => {
              this.showLarge();
            }}
          />
        </div>
      </div>
    );
  }
}

export default Image;
