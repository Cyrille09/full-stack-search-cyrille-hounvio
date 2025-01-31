import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getHotel } from "../../services/hotelsServices";
import { DefaultHotel, Hotel } from "../../components/globalTypes/GlobalTypes";

export const HotelPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Hotel>(DefaultHotel);
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const country = searchParams.get("country");
  const city = searchParams.get("city");
  const navigate = useNavigate();

  useEffect(() => {
    let isSubscribed = true;
    const fetchHotel = async () => {
      const hotel = await getHotel(id as string);
      if (isSubscribed) setSelectedItem(hotel);
    };

    fetchHotel();

    return () => {
      isSubscribed = false;
    };
  }, [id]);

  const displayHeading = () => {
    const selectedValue = country
      ? selectedItem.country
      : city
      ? selectedItem.city
      : selectedItem.hotel_name;
    const label = country ? "country" : city ? "city" : "hotel";

    return (
      <span>
        You have selected {selectedValue} as {label}
      </span>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row selected-item d-flex justify-content-center align-items-center">
          <div className="col-md-12">
            <h1>{displayHeading()}</h1>

            <div className="back-to-search">
              <button className="btn btn-success" onClick={() => navigate("/")}>
                Back to search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
