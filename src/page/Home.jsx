import { useSelector } from "react-redux";
import Card from "../components/common/ProductsCard";

const Home = () => {
  const { products } = useSelector((s) => s);

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <Card products={products} />
    </div>
  );
};

export default Home;
