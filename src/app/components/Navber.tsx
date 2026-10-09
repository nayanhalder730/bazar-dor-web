import Image from "next/image";
import navLogo from "../../../public/logo-icon.png";
import ButtonAndProfile from "./ButtonAndProfile";
const options = {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
} as const;

const date = new Date().toLocaleDateString("bn-BD", options);
const NavberPage = () => {
  return (
    <div className="container mx-auto">
      <header className="w-full bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        
          <div className="flex items-center gap-3">
            <div className="bg-[#009640] p-2.5 rounded-xl flex items-center justify-center">
              <Image
                src={navLogo}
                alt="logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                বাজার দর
              </h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{date}</p>
            </div>
          </div>
          <div>
            <ButtonAndProfile></ButtonAndProfile>
           
          </div>

        </div>
      </header>
    </div>
  );
};

export default NavberPage;
