import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAvailableCountries } from "../service/api";
interface Country {
  countryCode: string;
  name: string;
}

function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAvailableCountries();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {countries.map((country) => (
        <Link
          key={country.countryCode}
          to={`/country/${country.countryCode}`}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">
            {country.name}
          </h2>
          <p className="text-gray-600">{country.countryCode}</p>
        </Link>
      ))}
    </div>
  );
}
export default CountryList;
