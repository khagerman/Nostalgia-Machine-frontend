import React from "react";
import { render } from "@testing-library/react";
import NewPost from "./NewPost";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <NewPost />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
