import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Hotel, TypeName } from "../../components/globalTypes/GlobalTypes";
import { fetchAndFilterHotels } from "../../services/hotelsServices";
import { SearchResultsList } from "./SearchResultsList";

export const SearchHotelsPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  // Fetch data when debouncedSearch changes
  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedSearch) {
        setHotels([]);
        return;
      }
      const filteredHotels = await fetchAndFilterHotels(debouncedSearch);
      setHotels(filteredHotels);
    };

    fetchData();
  }, [debouncedSearch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    setShowClearBtn(!!value);
  };

  const clearSearch = () => {
    setSearchValue("");
    setDebouncedSearch("");
    setHotels([]);
    setShowClearBtn(false);
  };

  // Extract unique countries and cities
  const { uniqueCountries, uniqueCities } = useMemo(() => {
    const seenCountries = new Set();
    const seenCities = new Set();

    const uniqueCountries = hotels.filter((hotel) => {
      if (!seenCountries.has(hotel.country)) {
        seenCountries.add(hotel.country);
        return true;
      }
      return false;
    });

    const uniqueCities = hotels.filter((hotel) => {
      if (!seenCities.has(hotel.city)) {
        seenCities.add(hotel.city);
        return true;
      }
      return false;
    });

    return { uniqueCountries, uniqueCities };
  }, [hotels]);

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  value={searchValue}
                  onChange={handleInputChange}
                />
                {showClearBtn && (
                  <span className="left-pan" onClick={clearSearch}>
                    <i className="fa fa-close"></i>
                  </span>
                )}
              </div>
              {!!hotels.length && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <SearchResultsList
                    title="Hotels"
                    items={hotels}
                    type={`${TypeName.HotelName}`}
                    icon="fa fa-building mr-2"
                  />
                  <SearchResultsList
                    title="Countries"
                    items={uniqueCountries}
                    type={`${TypeName.Country}`}
                    icon="fa fa-map-marker mr-2"
                  />
                  <SearchResultsList
                    title="Cities"
                    items={uniqueCities}
                    type={`${TypeName.City}`}
                    icon="fa fa-globe mr-2"
                  />
                </div>
              )}
              {debouncedSearch && !!searchValue && !hotels.length && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <div className="p-2 text-center text-muted">
                    No records found
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
