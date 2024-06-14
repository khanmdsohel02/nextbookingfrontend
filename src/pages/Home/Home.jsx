import Featured from "../../components/Featured/Featured";
import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PropertyList from "../../components/PorpertyList/PropertyList";
import Subscription from "../../components/Subscription/Subscription";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <Subscription />
        <Footer />
      </div>
    </>
  );
};

export default Home;
