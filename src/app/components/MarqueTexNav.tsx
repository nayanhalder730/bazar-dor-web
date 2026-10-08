import { fetchAllData } from "../lib/fetchData";
import Marquee from "react-fast-marquee";
import { Category } from "../type/type";

const toBanglaNum = (num: number | string | undefined): string => {
  if (num === undefined || num === null) return "০";

  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
};

const MarqueTexNav = async () => {
  const allProduct: Category[] = await fetchAllData();

  return (
    <div className="w-full bg-[#fcfdfd] border-y border-gray-100 py-2.5 overflow-hidden select-none">
      <Marquee
        direction="left"
        speed={50}
        gradient={false}
        pauseOnHover={true}
      >
        <div className="flex items-center">
          {allProduct.map((item) => {
            const isUp = item?.change?.dir === "up";
            const isDown = item?.change?.dir === "down";

            return (
              <div
                key={item.id}
                className="flex items-center gap-2 text-sm text-gray-800 px-6 border-r border-gray-200"
              >
                <span className="text-base flex-shrink-0">
                  {item.categoryIcon}
                </span>

                <span className="font-semibold text-gray-900 whitespace-nowrap">
                  {item.nameBn}
                </span>

                <span className="text-gray-700 whitespace-nowrap">
                  {toBanglaNum(item.today)} টাকা/{item.unit}
                </span>

                <span
                  className={`flex items-center gap-1 font-bold whitespace-nowrap text-xs ${
                    isUp
                      ? "text-red-500"
                      : isDown
                      ? "text-emerald-600"
                      : "text-gray-500"
                  }`}
                >
                  <span className="text-[10px]">
                    {isUp ? "▲" : isDown ? "▼" : "•"}
                  </span>

                  <span>
                    {toBanglaNum(item?.change?.pct?.toFixed(1))}%
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueTexNav;