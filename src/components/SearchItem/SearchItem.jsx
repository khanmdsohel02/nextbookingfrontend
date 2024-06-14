/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./SearchItem.css";
const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item?.photos[0]} alt="" className="searchItemImg" />
      <div className="searchItemDesc">
        <h1 className="searchItemTitle">{item?.name}</h1>
        <span className="searchItemDistance">
          {item?.distance}m from center
        </span>
        <span className="searchItemTaxiOp">Free airport taxi</span>
        <span className="searchItemSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="searchItemFeatures">{item?.desc}</span>
        <span className="searchItemCancelOp">Free cancellation </span>
        <span className="searchItemCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="searchItemDetails">
        {item?.rating && (
          <div className="searchItemRating">
            <span>Excellent</span>
            <button>{item?.rating}</button>
          </div>
        )}
        <div className="searchItemDetailTexts">
          <span className="searchItemPrice">${item?.cheapestPrice}</span>
          <span className="searchItemTaxOp">Includes taxes and fees</span>
          <Link to={`/hoteldetails/${item._id}`}>
            <button className="searchItemCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
