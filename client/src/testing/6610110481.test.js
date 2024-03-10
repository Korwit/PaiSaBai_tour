import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../page/Login";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

describe("Login component", () => {
  test("renders login form", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  test("submits login form with valid credentials", async () => {
    axios.post.mockResolvedValueOnce({ data: { jwt: "mocked_jwt_token" } });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "view@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Log in"));

    await waitFor(() => {
      expect(localStorage.getItem("jwt")).toBe("mocked_jwt_token");
    });
  });
});
