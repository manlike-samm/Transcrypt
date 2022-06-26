import Home from "./components/ContactBig";

const App = () => {
  return (
    <div className=" bg-sky-100">
      <div className=" m-auto">
        <p className=" text-sky-700 font-extrabold font-mono text-5xl text-center pt-8 pb-8">
          Transcrypt
        </p>
        <p className="text-center text-lg">
          {" "}
          Your no. 1 stop to send and receive ethereum.
        </p>
      </div>
      <Home />
    </div>
  );
};

export default App;
