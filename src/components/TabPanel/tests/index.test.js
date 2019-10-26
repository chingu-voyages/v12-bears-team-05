import React from "react";
import { render } from "react-testing-library";

import TabPanel from "../index";

describe("<TabPanel />", () => {
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<TabPanel />);
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(false);
  });

  it("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(<TabPanel />);
    expect(firstChild).toMatchSnapshot();
  });
});
