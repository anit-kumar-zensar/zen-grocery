import "./FullScreenLoader.css";

interface FullScreenLoaderProps {
  loading: boolean;
}

const FullScreenLoader = ({ loading }: FullScreenLoaderProps) => {
  if (!loading) return null;

  return (
    <div className="fullscreen-loader">
      <div className="loader-box">
        <div className="spinner"></div>
        <span>Loading products...</span>
      </div>
    </div>
  );
};

export default FullScreenLoader;
