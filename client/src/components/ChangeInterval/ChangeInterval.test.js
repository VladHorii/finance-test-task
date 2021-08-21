import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChangeInterval from "./ChangeInterval";

describe("ChangeInterval testing", () => {
  it("Testing values in the component", () => {
    const { getByLabelText, getByRole } = render(<ChangeInterval />);

    const label = getByLabelText(/Change update interval/i);
    expect(label).toBeInTheDocument();
    userEvent.click(label);
    const input = getByRole("spinbutton");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("5000");
    userEvent.type(input, "0");
    expect(input).toHaveValue("50000");

    const button = getByRole("button", { name: /apply/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(input).toHaveValue("50000");
  });
});
