import React, { Component } from 'react';
import Modal from "react-modal";
import "./ImageModal.scss";

Modal.setAppElement("#app");

export default class ImageModal extends Component {
  render() {
    return (
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
            <img
              src={this.urlFromDto(this.props.dto)}
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
    )
  }
}
