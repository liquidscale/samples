import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { LQSContextProvider } from "./client";

function App() {
  return (
    <div className='bg-gradient-to-br from-indigo-900 to-black min-h-screen w-screen md:text-lg'>
      <LQSContextProvider url={"wss://localhost"}>
        <Router>
          <Routes />
        </Router>
      </LQSContextProvider>
      <footer className='text-indigo-500 text-center min-w-max mt-2 text-sm'>&copy; 2021 Liquidscale.cloud. Licensed under MIT.</footer>
    </div>
  );
}

export default App;
