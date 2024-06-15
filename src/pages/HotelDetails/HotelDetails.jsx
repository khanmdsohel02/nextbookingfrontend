import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Subscription from "../../components/Subscription/Subscription";
import "./HotelDetails.css";
import {
  FaCircleArrowLeft,
  FaCircleArrowRight,
  FaCircleXmark,
  FaLocationDot,
} from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFatch";
import { SearchContext } from "../../context/SecarchContext";
import { AuthContext } from "../../context/AuthContext";
import RoomsReserveModal from "../../components/RoomsReserve/RoomsReserveModal";
const HotelDetails = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openReserveModal, setOpenReserveModal] = useState(false);

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // const { id } = useParams();

  const url = "https://nextbooking-ten.vercel.app/api";
  const { data, loading, error, reFetch } = useFetch(`${url}/hotels/${id}`);

  const { dates, options } = useContext(SearchContext);
  // const startDate = dates[0]?.startDate?.getDate();
  // const endDate = dates[0]?.endDate?.getDate();
  // const days = endDate - startDate;

  const days =
    localStorage.getItem("endDate") - localStorage.getItem("startDate");
  console.log(days);
  const rooms = localStorage.getItem("room");

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "left") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleBooking = () => {
    if (!user) {
      navigate("/login");
    } else {
      setOpenReserveModal(true);
    }
  };

  return (
    <div>
      <Header type="hotellist" />
      {loading ? (
        "Data is loading, Please wait..."
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FaCircleXmark className="close" onClick={() => setOpen(false)} />
              <FaCircleArrowLeft
                className="arrow"
                onClick={() => handleMove("left")}
              />
              <div className="sliderWrapper">
                <img
                  src={data?.photos[slideNumber]}
                  alt="photo"
                  className="sliderImg"
                />
              </div>
              <FaCircleArrowRight
                className="arrow"
                onClick={() => handleMove("right")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button onClick={handleBooking} className="bookNow">
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data?.name}</h1>
            <div className="hotelAddress">
              <FaLocationDot />
              <span>{data?.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data?.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data?.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data?.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt="photo"
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data?.title}</h1>
                <p className="hotelDesc">{data?.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${data?.cheapestPrice * days * rooms}</b> ({days} nights)
                </h2>
                <button onClick={handleBooking}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <Subscription />
          <Footer />
        </div>
      )}

      {openReserveModal && (
        <RoomsReserveModal
          setOpenReserveModal={setOpenReserveModal}
          hotelId={id}
        />
      )}
    </div>
  );
};

export default HotelDetails;
