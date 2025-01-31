import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { HotelPage } from "./HotelPage";
import { getHotel } from "../../services/hotelsServices";

// Mock the getHotel service
vi.mock("../../services/hotelsServices", () => ({
  getHotel: vi.fn(),
}));

describe("HotelPage Component", () => {
  it("should display the correct heading based on the query parameters", async () => {
    // Mock the response from getHotel
    const mockHotel = {
      hotel_name: "Mock Hotel",
      country: "United Kingdom",
      city: "London",
    };

    (getHotel as unknown as jest.Mock).mockResolvedValue(mockHotel);

    render(
      <MemoryRouter initialEntries={["/hotels/123?country=true"]}>
        <Routes>
          <Route path="/hotels/:id" element={<HotelPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the hotel data to load
    expect(
      await screen.findByText(/You have selected United Kingdom as country/i)
    ).toBeInTheDocument();
  });

  it("should navigate back to the search page when the button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/hotels/123"]}>
        <Routes>
          <Route path="/hotels/:id" element={<HotelPage />} />
          <Route path="/" element={<div>Search Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Click the "Back to search" button
    fireEvent.click(screen.getByText(/Back to search/i));

    // Verify that the user is navigated to the search page
    expect(screen.getByText(/Search Page/i)).toBeInTheDocument();
  });

  it("should display the hotel name if no query parameters are provided", async () => {
    // Mock the response from getHotel
    const mockHotel = {
      hotel_name: "Mock Hotel",
      country: "Mock Country",
      city: "London",
    };

    // Explicitly cast the mocked function to the correct type
    (getHotel as unknown as jest.Mock).mockResolvedValue(mockHotel);

    render(
      <MemoryRouter initialEntries={["/hotels/123"]}>
        <Routes>
          <Route path="/hotels/:id" element={<HotelPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the hotel data to load
    expect(
      await screen.findByText(/You have selected Mock Hotel as hotel/i)
    ).toBeInTheDocument();
  });
});
