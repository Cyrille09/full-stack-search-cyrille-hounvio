import { Route, Routes } from "react-router-dom";
import { SearchHotelsPage } from "./pages/hotels/SearchHotelsPage";
import { HotelPage } from "./pages/hotels/HotelPage";
import { NotFoundPage } from "./pages/notFound/NotFoundPage";
import { ROUTE_PATH } from "./components/constants/routePath";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchHotelsPage />} />
        <Route path={`${ROUTE_PATH.HOTEL_PAGE}/:id`} element={<HotelPage />} />
        {/* not found page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
