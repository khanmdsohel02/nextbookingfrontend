/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./Header.css";
import { FaBed, FaCar, FaPlane } from "react-icons/fa";
import { FaCalendarDays, FaPerson } from "react-icons/fa6";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SecarchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  console.log(destination);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(SearchContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "increase" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

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
    navigate("/hotellist", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "hotellist"
            ? "headerContainer hotellistmode"
            : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FaBed className="headerIcon" />
            <span>Stays</span>
          </div>

          <div className="headerListItem">
            <FaPlane className="headerIcon" />
            <span>Flights</span>
          </div>

          <div className="headerListItem">
            <FaCar className="headerIcon" />
            <span>Car rentals</span>
          </div>
        </div>
        {!type && (
          <>
            {" "}
            <h1 className="headerTitle">Find your next stay.</h1>
            <p className="headerDesc">
              Search low prices on hotels, homes and much more...
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FaBed className="headerIcon" />

                <select
                  name="city"
                  onChange={(e) => setDestination(e.target.value)}
                  className="select headerSearchInput text-slate-900"
                  required
                >
                  <option disabled selected value="">
                    Where are you going?
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

              <div className="headerSearchItem">
                <FaCalendarDays className="headerIcon" />
                <span
                  onClick={() => {
                    setOpenDate(!openDate);
                    setOpenOptions(false);
                  }}
                  className="headerSearchText"
                >
                  From{" "}
                  {`${format(
                    dates[0].startDate,
                    "MM/dd/yyyy"
                  )}  to     ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <FaPerson className="headerIcon" />
                <span
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    setOpenDate(false);
                  }}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          onClick={() => handleOption("adult", "decrease")}
                          className="optionCounterButton"
                        >
                          -
                        </button>
                        <span className="optionCounter">{options.adult}</span>
                        <button
                          onClick={() => handleOption("adult", "increase")}
                          className="optionCounterButton"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children === 0}
                          onClick={() => handleOption("children", "decrease")}
                          className="optionCounterButton"
                        >
                          -
                        </button>
                        <span className="optionCounter">
                          {options.children}
                        </span>
                        <button
                          onClick={() => handleOption("children", "increase")}
                          className="optionCounterButton"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          onClick={() => handleOption("room", "decrease")}
                          className="optionCounterButton"
                        >
                          -
                        </button>
                        <span className="optionCounter">{options.room}</span>
                        <button
                          onClick={() => handleOption("room", "increase")}
                          className="optionCounterButton"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
