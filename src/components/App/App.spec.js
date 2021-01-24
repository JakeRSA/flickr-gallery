import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App.js";

describe("App", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = render(<App />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders title correctly", () => {
    expect(wrapper.getByText("Flickr Gallery")).not.toBeNull();
  });

  it("renders the search input correctly", () => {
    expect(wrapper.getByRole("textbox")).toBeInstanceOf(HTMLElement);
  });

  it("sets the tag correctly", () => {
    const input = wrapper.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test tags" } });
    expect(input.value).toBe("test tags");
  });
});
