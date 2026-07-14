import Navbar from "../components/Navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>
    </>
  );
}

export default MainLayout;