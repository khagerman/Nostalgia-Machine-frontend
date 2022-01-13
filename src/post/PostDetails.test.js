import React from "react";
import { render } from "@testing-library/react";
import PostDetail from "./PostDetail";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <PostDetail />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
