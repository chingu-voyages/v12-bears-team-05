import React from "react";
import { render } from "react-testing-library";

import SignUp from "../index";

describe("<SignUp />", () => {
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<SignUp />);
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(false);
  });

  it("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(<SignUp />);
    expect(firstChild).toMatchSnapshot();
  });
});
