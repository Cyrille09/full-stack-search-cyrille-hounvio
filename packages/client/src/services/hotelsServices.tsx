import { getCodeSandboxHost } from "@codesandbox/utils";
import { Hotel } from "../components/globalTypes/GlobalTypes";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

export const fetchAndFilterHotels = async (value: string) => {
  const hotelsData = await fetch(`${API_URL}/api/v1/hotels?filter=${value}`);
  return (await hotelsData.json()) as Hotel[];
};

export const getHotel = async (hotelId: string) => {
  const hotelsData = await fetch(`${API_URL}/api/v1/hotels/${hotelId}`);
  return (await hotelsData.json()) as Hotel;
};
