import React from "react";
import { render } from "@testing-library/react";
import EditPost from "./EditPost";

it("matches snapshot", function () {
  const { asFragment } = render(<EditPost />);
  expect(asFragment()).toMatchSnapshot();
});
