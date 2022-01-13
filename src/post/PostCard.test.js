import React from "react";
import { render } from "@testing-library/react";
import PostCard from "./PostCard";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <PostCard />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
