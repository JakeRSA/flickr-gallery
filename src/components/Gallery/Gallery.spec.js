import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Gallery from "./Gallery.js";

describe("Gallery", () => {
  const initialImages = [
    {
      id: "28420720169",
      owner: "59717246@N05",
      secret: "d460443ecb",
      server: "4722",
      farm: 5,
    },
    {
      id: "39489067804",
      owner: "132444237@N06",
      secret: "befff859cf",
      server: "4658",
      farm: 5,
    },
    {
      id: "40167481242",
      owner: "76670355@N04",
      secret: "32eefbdbaa",
      server: "4743",
      farm: 5,
    },
    {
      id: "39488925224",
      owner: "31479578@N03",
      secret: "50ef68484e",
      server: "4695",
      farm: 5,
    },
    {
      id: "28420574019",
      owner: "129547346@N08",
      secret: "1299bb8029",
      server: "4712",
      farm: 5,
    },
    {
      id: "39302267095",
      owner: "137639620@N02",
      secret: "b891c7d131",
      server: "4711",
      farm: 5,
    },
    {
      id: "28420470529",
      owner: "150051933@N05",
      secret: "0be4664473",
      server: "4603",
      farm: 5,
    },
    {
      id: "26327535078",
      owner: "51483961@N03",
      secret: "5f30961f45",
      server: "4702",
      farm: 5,
    },
    {
      id: "40166902122",
      owner: "150995138@N06",
      secret: "2b46fdb817",
      server: "4716",
      farm: 5,
    },
    {
      id: "39301783895",
      owner: "156204685@N03",
      secret: "475b6645b9",
      server: "4761",
      farm: 5,
    },
    {
      id: "39301758945",
      owner: "28549294@N05",
      secret: "e6ccd03a1b",
      server: "4719",
      farm: 5,
    },
  ];

  const nextImages = [
    {
      id: "28420720169",
      owner: "59717246@N05",
      secret: "d460443ecb",
      server: "4722",
      farm: 5,
    },
    {
      id: "39489067804",
      owner: "132444237@N06",
      secret: "befff859cf",
      server: "4658",
      farm: 5,
    },
    {
      id: "26327535078",
      owner: "51483961@N03",
      secret: "5f30961f45",
      server: "4702",
      farm: 5,
    },
    {
      id: "40166902122",
      owner: "150995138@N06",
      secret: "2b46fdb817",
      server: "4716",
      farm: 5,
    },
    {
      id: "39301783895",
      owner: "156204685@N03",
      secret: "475b6645b9",
      server: "4761",
      farm: 5,
    },
    {
      id: "39301758945",
      owner: "28549294@N05",
      secret: "e6ccd03a1b",
      server: "4719",
      farm: 5,
    },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = render(<Gallery tag="test" />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders", () => {
    expect(wrapper).not.toBeUndefined();
  });

  it("renders images", async () => {
    const images = await wrapper.findAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });
});