import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChangeInterval from "./ChangeInterval";

describe("ChangeInterval testing", () => {
  it("Testing values in the component", () => {
    const { getByLabelText, getByRole } = render(<ChangeInterval />);

    expect(getByLabelText(/Change update interval:/i)).toBeInTheDocument();

    userEvent.click(getByLabelText(/Change update interval:/i));
    const input = getByRole("spinbutton");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(null);
    userEvent.type(input, "1000");
    expect(input).toHaveValue(1000);

    const button = getByRole("button", { name: /apply/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(input).toHaveValue(null);
  });
});
