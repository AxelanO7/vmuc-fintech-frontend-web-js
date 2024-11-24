import { useRecoilValue } from "recoil";
import { sidebarState } from "../core/store";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarOpen = useRecoilValue(sidebarState);
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      {/* <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main> */}
      <main className="overflow-hidden overflow-y-auto">
        <Sidebar />
        <div
          className={`${
            sidebarOpen ? "ml-[205px]" : "ml-[54px]"
          } transition-all duration-300 mt-[59px] min-h-[calc(100vh-59px)]  flex flex-col h-full`}
        >
          {children}
          <div className="grow pb-8" />
          <footer className="text-gray-600 text-center py-2 bg-gray-100 border-t-2 border-gray-200">
            © {new Date().getFullYear()} VILLA MUNDUK UMAH CABBIN
          </footer>
        </div>
      </main>
    </div>
  );
}
