// import 'jsdom-global/register';
// import React from 'react';
// import {shallow} from 'enzyme';
// import sinon from 'sinon';
// import {expect} from 'chai';
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Image from "./Image.js";

describe("Image", () => {
  const sampleImage = {
    id: "28420720169",
    owner: "59717246@N05",
    secret: "d460443ecb",
    server: "4722",
    farm: 5,
  };
  let wrapper;
  beforeEach(() => {
    wrapper = render(<Image dto={sampleImage} imageSize={250} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders", () => {
    expect(wrapper).not.toBeUndefined();
  });

  it("renders 3 icons on image", () => {
    expect(wrapper.getAllByRole("img").length).toBeGreaterThanOrEqual(4);
  });

  it("renders correct image size", () => {
    const style = window.getComputedStyle(wrapper.container.children[0]);
    expect(style.width).toBe("250px");
    expect(style.height).toBe("250px");
  });

  it("opens full size on button click", () => {
    const baseImageNum = wrapper.getAllByRole("img").length;
    const fullScreenIcon = wrapper.getByTitle("expand");
    userEvent.click(fullScreenIcon);
    expect(wrapper.getAllByRole("img").length).toBeGreaterThan(baseImageNum);
  });

  it("rotates on button click", () => {
    const image = wrapper.getAllByRole("img")[0];
    const style = window.getComputedStyle(image);
    const rotateIcon = wrapper.getByTitle("rotate");
    userEvent.click(rotateIcon);
    const newStyle = window.getComputedStyle(image);
    expect(newStyle.transform).not.toBe(style);
  });

  it("hides on button click", () => {
    const deleteIcon = wrapper.getByTitle("delete");
    userEvent.click(deleteIcon);
    const style = window.getComputedStyle(wrapper.container.children[0]);
    expect(style.display).toBe("none");
  });
});
