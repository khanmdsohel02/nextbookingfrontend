import useFetch from "../../hooks/useFatch";
import useRootURL from "../../hooks/useRootURL";
import "./Featured.css";

const Featured = () => {
  const url = "https://nextbooking-ten.vercel.app";

  const { data, loading, error } = useFetch(
    `${url}/hotels/countbycity?cities=dhaka,khulna,Rajshahi`
  );

  // console.log(data);

  return (
    <div className="featured">
      {loading ? (
        "Data is Loading, please wait..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://a.travel-assets.com/findyours-php/viewfinder/images/res70/526000/526877-dublin.jpg"
              alt="Dublin"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Rajshahi</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://content.r9cdn.net/rimg/dimg/15/27/c7e81fad-city-22863-177642838c4.jpg?crop=true&width=1020&height=498"
              alt="Dublin"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Dhaka</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://travelnevada.com/wp-content/uploads/2020/09/Reno_Featured-scaled.jpg"
              alt="Dublin"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Khulna</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
