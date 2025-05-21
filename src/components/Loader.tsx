// src/components/Loader.tsx
import { HashLoader} from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white z-50 fixed top-0 left-0">
      <HashLoader speedMultiplier={1} color="#facc15" size={70} />
    </div>
  );
};

export default Loader;
