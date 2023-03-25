import BottomNavbar from "./BottomNavbar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main id="layout" className="container-fluid py-4">
        {children}
      </main>
      <BottomNavbar />
    </>
  );
}
