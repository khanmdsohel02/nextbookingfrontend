/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFatch";
import "./RoomsReserveModal.css";
import { SearchContext } from "../../context/SecarchContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCircleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

const RoomsReserveModal = ({ hotelId, setOpenReserveModal }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const navigate = useNavigate();

  const url = "https://nextbooking-ten.vercel.app/api";
  const { data } = useFetch(`${url}/hotels/room/${hotelId}`);

  // const { dates } = useContext(SearchContext);

  console.log(selectedRooms);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(
    JSON.parse(localStorage.getItem("startDate")),
    JSON.parse(localStorage.getItem("endDate"))
  );

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  console.log(alldates);
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`${url}/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpenReserveModal(false);
      toast.success("Rooms reserved successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      <div className="reserveContainer">
        <FaCircleXmark
          className="reserveClose"
          onClick={() => setOpenReserveModal(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="reserveItem" key={item._id}>
            <div className="reserveItemInfo">
              <div className="reserveTitle">{item?.title}</div>
              <div className="reserveDesc">{item?.desc}</div>
              <div className="reserveMax">
                Max people: <b>{item?.maxPeople}</b>
              </div>
              <div className="reservePrice">{item?.price}</div>
            </div>
            <div className="reserveSelectRooms">
              {item?.roomNumbers?.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber?.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <Link to="">
          <button onClick={handleClick} className="reserveButton">
            Reserve Now!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RoomsReserveModal;
