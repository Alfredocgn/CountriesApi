import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getCountryFlag,
  getCountryInfo,
  getCountryPopulation,
} from "../service/api";
interface CountryDetails {
  commonName: string;
  officialName: string;
  region: string;
  borders: Array<{
    commonName: string;
    countryCode: string;
  }>;
}

interface PopulationData {
  year: number;
  value: number;
}

function CountryInfo() {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [country, setCountry] = useState<CountryDetails | null>(null);
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        setError(null);
        const countryInfo = await getCountryInfo(countryCode!);
        setCountry(countryInfo);
        const flagResponse = await getCountryFlag(countryCode!);
        setFlag(flagResponse.data.flag);
        const populationResponse = await getCountryPopulation(
          countryInfo.commonName
        );
        const formattedPopulation =
          populationResponse.data.populationCounts.map(
            (item: PopulationData) => ({
              year: item.year,
              value: item.value,
            })
          );
        setPopulationData(formattedPopulation);
      } catch (err) {
        setError("Failed to fetch country data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (countryCode) {
      fetchCountryData();
    }
  }, [countryCode]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error || !country) {
    return (
      <div className="text-center text-red-600 p-4">
        {error || "Country not found"}
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Countries
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-start gap-6">
          {flag && (
            <div className="w-32 flex-shrink-0">
              <img
                src={flag}
                alt={`Flag of ${country?.commonName}`}
                className="w-full h-auto object-cover rounded-lg shadow-sm"
              />
            </div>
          )}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {country?.commonName}
            </h1>
            <p className="text-gray-600">{country?.officialName}</p>
            <p className="text-gray-600">Region: {country?.region}</p>
          </div>
        </div>
      </div>
      {country.borders && country.borders.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Border Countries</h2>
          <div className="flex flex-wrap gap-2">
            {country.borders.map((border) => (
              <Link
                key={border.countryCode}
                to={`/country/${border.countryCode}`}
                className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                {border.commonName}
              </Link>
            ))}
          </div>
        </div>
      )}
      {populationData.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Population Over Time</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={populationData}>
                <XAxis
                  dataKey="year"
                  tick={{ fill: "#4B5563" }}
                  tickLine={{ stroke: "#4B5563" }}
                />
                <YAxis
                  tick={{ fill: "#4B5563" }}
                  tickLine={{ stroke: "#4B5563" }}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en", {
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(value)
                  }
                />
                <Tooltip
                  formatter={(value: number) =>
                    new Intl.NumberFormat("en").format(value)
                  }
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
export default CountryInfo;
