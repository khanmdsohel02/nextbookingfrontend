import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./HotelList.css";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/SearchItem/SearchItem";
import useFetch from "../../hooks/useFatch";
import { SearchContext } from "../../context/SecarchContext";

const HotelList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const url = "https://nextbooking-ten.vercel.app/api";

  const { data, loading, error, reFetch } = useFetch(
    `${url}/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    localStorage.setItem("startDate", dates[0].startDate.getDate());
    localStorage.setItem("endDate", dates[0].endDate.getDate());
    localStorage.setItem("room", options.room);
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        destination,
        dates,
        options,
      },
    });
  };

  return (
    <div>
      <Header type="hotellist" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              {/* <input
                onChange={(e) => setDestination(e.target.value)}
                placeholder={destination}
                type="text"
              /> */}
              <select
                name="city"
                onChange={(e) => setDestination(e.target.value)}
                className="select headerSearchInput"
              >
                <option disabled selected value={destination}>
                  {destination}
                </option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Bandarban">Bandarban</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Kishoreganj">Kishoreganj</option>
                <option value="Pabna">Pabna</option>
                <option value="Narayanganj">Narayanganj</option>
                <option value="Khulna">Khulna</option>
                <option value="Barishal">Barishal</option>
              </select>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    onChange={(e) => setMin(e.target.value)}
                    type="number"
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    onChange={(e) => setMax(e.target.value)}
                    type="number"
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {data.length === 0 ? (
              <h1 className="noHotel">Coming soon</h1>
            ) : (
              <>
                {" "}
                {loading ? (
                  "Data is Loading, please wait..."
                ) : (
                  <>
                    {data.map((item) => (
                      <SearchItem item={item} key={item._id} />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
