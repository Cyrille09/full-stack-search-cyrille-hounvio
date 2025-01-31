import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ROUTE_PATH } from "./components/constants/routePath";
import App from "./app";

describe("App Component", () => {
  it("should render the SearchHotelsPage when navigating to '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Check if the SearchHotelsPage content is rendered
    expect(
      screen.getByPlaceholderText(/Search accommodation../i)
    ).toBeInTheDocument();
  });

  it("should render the HotelPage when navigating to '/hotel/:id'", () => {
    const hotelId = "123";
    render(
      <MemoryRouter initialEntries={[`${ROUTE_PATH.HOTEL_PAGE}/${hotelId}`]}>
        <App />
      </MemoryRouter>
    );

    // Check if the HotelPage content is rendered
    expect(screen.getByText(/You have selected/i)).toBeInTheDocument();
  });

  it("should render the NotFoundPage for an unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <App />
      </MemoryRouter>
    );

    // Check if the NotFoundPage content is rendered
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
