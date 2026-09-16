import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-[#EBE3D0]">
      <Navbar />

      <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;