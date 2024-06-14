import useFetch from "../../hooks/useFatch";
import useRootURL from "../../hooks/useRootURL";
import "./FeaturedProperties.css";

const FeaturedProperties = () => {
  const url = "https://nextbooking-ten.vercel.app";
  const limit = 4;
  const featured = true;
  const { data, loading, error } = useFetch(
    `${url}/hotels?featured=${featured}&limit=${limit}`
  );

  // console.log(data);

  return (
    <div className="featuredProperties">
      {loading ? (
        "Data is Loading, please wait..."
      ) : (
        <>
          {data.map((item) => (
            <div className="featuredPropertiesItem" key={item._id}>
              <img
                src={item?.photos[0]}
                alt="photo"
                className="featuredPropertiesImg"
              />
              <div className="cardContent">
                <span className="featuredPropertiesName">{item?.name}</span>
                <span className="featuredPropertiesCity">{item?.city}</span>
                <span className="featuredPropertiesPrice">
                  Starting from ${item?.cheapestPrice}
                </span>
                {item?.rating && (
                  <div className="featuredPropertiesRating">
                    <button>{item?.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
