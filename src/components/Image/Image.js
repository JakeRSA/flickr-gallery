import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import Modal from "react-modal";
import "./Image.scss";

Modal.setAppElement("#app");

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
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.props.imageSize + "px",
          height: this.props.imageSize + "px",
          transform: `rotate(${this.state.rotation}deg)`,
          display: this.state.hidden ? "none" : "inline-block",
        }}
      >
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
                  {this.props.dto.title ? this.props.dto.title : "<no title>"}
                </p>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={this.urlFromDto(this.props.dto)}
                  download={true}
                >
                  <FontAwesome
                    name="arrow-circle-down"
                    title="download image"
                    className="modal-icon"
                  />
                </a>
              </span>
              <FontAwesome
                name="times"
                title="close"
                className="modal-icon"
                onClick={() => {
                  this.setState({ showLarge: false });
                }}
              />
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={this.urlFromDto(this.props.dto)}
            >
              <img
                src={this.urlFromDto(this.props.dto)}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              ></img>
            </a>
          </div>
        </Modal>
        <div
          style={{
            transform: `rotate(-${this.state.rotation}deg)`,
          }}
        >
          <FontAwesome
            className="image-icon"
            name="sync-alt"
            title="rotate"
            onClick={() => {
              this.rotateImage();
            }}
          />
          <FontAwesome
            className="image-icon"
            name="trash-alt"
            title="delete"
            onClick={() => {
              this.hideImage();
            }}
          />
          <FontAwesome
            className="image-icon"
            name="expand"
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
