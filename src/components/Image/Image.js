import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import Modal from "react-modal";
import "./Image.scss";

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      rotation: 0,
      hidden: false,
      showLarge: false,
    };
  }

  calcImageSize() {
    const { galleryWidth } = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = galleryWidth / imagesPerRow;
    this.setState({
      size,
    });
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

  componentDidMount() {
    this.calcImageSize();
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
          width: this.state.size + "px",
          height: this.state.size + "px",
          transform: `rotate(${this.state.rotation}deg)`,
          display: this.state.hidden ? "none" : "inline-block",
        }}
      >
        <Modal
          isOpen={this.state.showLarge}
          onRequestClose={() => {
            this.setState({ showLarge: false });
          }}
          style={{ content: { backgroundColor: "#33333360" } }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={this.urlFromDto(this.props.dto)}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            ></img>
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
