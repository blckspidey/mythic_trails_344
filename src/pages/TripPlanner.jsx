import { useState } from "react";
import { MapPin, Calendar, List, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const TripPlanner = () => {
  const allTemples = [
    "Khajuraho",
    "Hampi",
    "Varanasi",
    "Konark",
    "Brihadeeswarar",
    "Ellora",
  ];

  const [selectedTemples, setSelectedTemples] = useState([]);
  const [tripStartDate, setTripStartDate] = useState("");
  const [tripEndDate, setTripEndDate] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [showTrip, setShowTrip] = useState(false);
  const [error, setError] = useState("");

  const handleAddTemple = (temple) => {
    if (!selectedTemples.find((t) => t.name === temple)) {
      setSelectedTemples([...selectedTemples, { name: temple, visitDate: "" }]);
    }
  };

  const handleTempleVisited = (temple) => {
    setSelectedTemples(selectedTemples.filter((t) => t.name !== temple));
  };

  const handleVisitDateChange = (temple, date) => {
    if (
      (tripStartDate && date < tripStartDate) ||
      (tripEndDate && date > tripEndDate)
    ) {
      alert("Visiting date must be within trip start and end dates!");
      return;
    }

    setSelectedTemples(
      selectedTemples.map((t) =>
        t.name === temple ? { ...t, visitDate: date } : t
      )
    );
  };

  const handleEndDateChange = (e) => {
    const date = e.target.value;
    if (tripStartDate && date < tripStartDate) {
      setError("End date cannot be before start date");
    } else {
      setError("");
    }
    setTripEndDate(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brown-900 via-brown-800 to-brown-700 text-black px-4 py-10">
      <div className="max-w-5xl mx-auto bg-[#fdf6e3]/95 p-10 rounded-2xl shadow-xl border-2 border-temple-gold">
        <h1 className="text-4xl font-heading font-black mb-8 text-center uppercase text-brown-900">
          Plan Your Sacred Trip
        </h1>

        {!showTrip ? (
          <>
            {/* Current Location */}
            <div className="flex flex-col mb-6">
              <label className="flex items-center gap-2 font-medium mb-1">
                <MapPin size={20} /> Current Location
              </label>
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                placeholder="Enter your starting point"
                className="px-4 py-2 rounded-lg border-2 border-brown-700 focus:border-temple-gold outline-none bg-white text-black"
              />
            </div>

            {/* Trip Start & End Date */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 flex flex-col">
                <label className="flex items-center gap-2 font-medium mb-1">
                  <Calendar size={20} /> Trip Start Date
                </label>
                <input
                  type="date"
                  value={tripStartDate}
                  onChange={(e) => setTripStartDate(e.target.value)}
                  className="px-4 py-2 rounded-lg border-2 border-brown-700 focus:border-temple-gold outline-none bg-white text-black"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="flex items-center gap-2 font-medium mb-1">
                  <Calendar size={20} /> Trip End Date
                </label>
                <input
                  type="date"
                  value={tripEndDate}
                  onChange={handleEndDateChange}
                  className="px-4 py-2 rounded-lg border-2 border-brown-700 focus:border-temple-gold outline-none bg-white text-black"
                />
                {error && <p className="text-red-700 mt-1">{error}</p>}
              </div>
            </div>

            {/* Select Temples */}
            <div className="flex flex-col mb-6">
              <label className="flex items-center gap-2 font-medium mb-2">
                <List size={20} /> Add Temples to Trip
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {allTemples.map((temple, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleAddTemple(temple)}
                    disabled={selectedTemples.find((t) => t.name === temple)}
                    size="lg"
                    variant="outline"
                    className={`border-2 border-temple-gold/60 text-temple-gold bg-transparent hover:bg-temple-gold/20 hover:border-temple-gold hover:shadow-divine transition-all duration-300 font-nav tracking-wide text-base px-8 py-6 ${
                      selectedTemples.find((t) => t.name === temple)
                        ? "bg-brown-200 border-brown-600 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {temple}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Temples */}
            {selectedTemples.length > 0 && (
              <div className="mt-8 bg-white text-black p-6 rounded-lg shadow-inner border-2 border-temple-gold">
                <h3 className="font-semibold mb-2">Temples Selected:</h3>
                <ul className="space-y-3">
                  {selectedTemples.map((temple, idx) => (
                    <li
                      key={idx}
                      className="flex flex-col md:flex-row justify-between items-center px-3 py-2 rounded-lg border-2 border-brown-700 bg-[#fdf6e3]"
                    >
                      <span className="font-medium">{temple.name}</span>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <input
                          type="date"
                          value={temple.visitDate}
                          min={tripStartDate || undefined}
                          max={tripEndDate || undefined}
                          onChange={(e) =>
                            handleVisitDateChange(temple.name, e.target.value)
                          }
                          className="px-2 py-1 rounded-lg border-2 border-brown-700 focus:border-temple-gold outline-none bg-white text-black"
                        />
                        <Button
                          onClick={() => handleTempleVisited(temple.name)}
                          size="lg"
                          variant="outline"
                          className="border-2 border-temple-gold/60 text-red-700 bg-transparent hover:bg-red-200 hover:border-red-700 hover:shadow-divine transition-all duration-300 px-6 py-4"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Your Trip Button */}
            <div className="text-center mt-6">
              <Button
                onClick={() => setShowTrip(true)}
                size="lg"
                variant="outline"
                className="border-2 border-temple-gold/60 text-temple-gold bg-transparent hover:bg-temple-gold/20 hover:border-temple-gold hover:shadow-divine transition-all duration-300 font-nav tracking-wide text-base px-8 py-6"
              >
                <BookOpen className="mr-2" />
                Your Trip
              </Button>
            </div>
          </>
        ) : (
          // Planned Trip View
          <div className="bg-white text-black p-6 rounded-lg shadow-inner border-2 border-temple-gold">
            <h2 className="text-2xl font-heading font-bold mb-4 uppercase">
              My Planned Trip
            </h2>
            <p className="mb-2">
              <strong>Start Location:</strong> {currentLocation || "Not set"}
            </p>
            <p className="mb-2">
              <strong>Trip Dates:</strong>{" "}
              {tripStartDate || "Start not set"} to {tripEndDate || "End not set"}
            </p>

            {selectedTemples.length > 0 ? (
              <>
                <h3 className="font-semibold mb-2">Temples to Visit:</h3>
                <ul className="space-y-3">
                  {selectedTemples.map((temple, idx) => (
                    <li
                      key={idx}
                      className="flex flex-col md:flex-row justify-between items-center px-3 py-2 rounded-lg border-2 border-brown-700 bg-[#fdf6e3]"
                    >
                      <span className="font-medium">{temple.name}</span>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <span>{temple.visitDate || "Date not set"}</span>
                        <Button
                          onClick={() => handleTempleVisited(temple.name)}
                          size="lg"
                          variant="outline"
                          className="border-2 border-temple-gold/60 text-red-700 bg-transparent hover:bg-red-200 hover:border-red-700 hover:shadow-divine transition-all duration-300 px-6 py-4"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No temples selected.</p>
            )}

            {/* Back to Planning */}
            <div className="text-center mt-6">
              <Button
                onClick={() => setShowTrip(false)}
                size="lg"
                variant="outline"
                className="border-2 border-temple-gold/60 text-temple-gold bg-transparent hover:bg-temple-gold/20 hover:border-temple-gold hover:shadow-divine transition-all duration-300 font-nav tracking-wide text-base px-8 py-6"
              >
                Back to Planning
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
