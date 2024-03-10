import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import axios from "axios";
import Forgotpass from "../page/Forgotpass";

jest.mock("axios");

describe("Forgotpass Component", () => {
  test("renders the component", () => {
    render(
      <MemoryRouter>
        <Forgotpass />
      </MemoryRouter>
    );
    expect(screen.getByText("ตั้งรหัสผ่านใหม่")).toBeInTheDocument();
  });

  test("handles password change", () => {
    render(
      <MemoryRouter>
        <Forgotpass />
      </MemoryRouter>
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "newPassword" } });

    expect(passwordInput.value).toBe("newPassword");
  });

  test("handles password confirmation change", () => {
    render(
      <MemoryRouter>
        <Forgotpass />
      </MemoryRouter>
    );
    const passwordConfirmInput =
      screen.getByPlaceholderText("Confirm Password");
    fireEvent.change(passwordConfirmInput, {
      target: { value: "newPassword" },
    });

    expect(passwordConfirmInput.value).toBe("newPassword");
  });

  test("toggles password visibility", () => {
    render(
      <MemoryRouter>
        <Forgotpass />
      </MemoryRouter>
    );

    const toggleButtons = screen.queryAllByAltText("Hide");

    const toggleButton = toggleButtons[0];

    fireEvent.click(toggleButton);
    expect(screen.getByPlaceholderText("Password").type).toBe("text");
  });
});
