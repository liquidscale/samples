import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { LQSContextProvider } from "./client";

function App() {
  return (
    <div className='bg-blueGray-700 min-h-screen w-screen flex flex-col md:text-lg'>
      <LQSContextProvider name='rpgmap' url={"wss://localhost"}>
        <Router>
          <Routes />
        </Router>
      </LQSContextProvider>
      <footer className='text-blueGray-500 text-center min-w-max mt-2 text-sm'>&copy; 2021 Liquidscale.cloud. Licensed under MIT.</footer>
    </div>
  );
}

export default App;
