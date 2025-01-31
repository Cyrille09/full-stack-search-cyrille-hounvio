import { Link } from "react-router-dom";
import { Hotel, TypeName } from "../../components/globalTypes/GlobalTypes";
import { ROUTE_PATH } from "../../components/constants/routePath";

export const SearchResultsList: React.FC<{
  title: string;
  items: Hotel[];
  type: `${TypeName}`;
  icon: string;
}> = ({ title, items, type, icon }) => (
  <>
    <h2>{title}</h2>
    {items.length ? (
      items.map((hotel) => (
        <li key={hotel._id}>
          <Link
            to={`${ROUTE_PATH.HOTEL_PAGE}/${hotel._id}${
              type !== TypeName.HotelName ? `?${type}=${hotel[type]}` : ""
            }`}
            className="dropdown-item"
          >
            <i className={`${icon}`}></i> {hotel[type]}
          </Link>
          <hr className="divider" />
        </li>
      ))
    ) : (
      <p>No {title.toLowerCase()} matched</p>
    )}
  </>
);
