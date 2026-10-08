"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import bannerImg from "../../../public/bazar-hero.png";

const options = {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
} as const;

const date = new Date().toLocaleDateString("bn-BD", options);

const Banner = () => {
 return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 md:flex-row md:p-12">

          <div className="flex max-w-xl flex-col items-start gap-4">
            <div className="inline-block rounded-full bg-[#e8f5e9] px-3.5 py-1.5 text-xs font-medium text-[#009640]">
              {date}
            </div>

            <h1 className="text-2xl font-extrabold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Button className="mt-2 rounded-xl bg-[#009640] px-6 py-2.5 font-medium text-white hover:bg-[#007d35]">
              সব পণ্য দেখুন
            </Button>
          </div>

          <div className="flex w-full flex-shrink-0 justify-center md:w-auto">
            <Image
              src={bannerImg}
              alt="বাজার দর ব্যানার"
              width={280}
              height={200}
              priority
              className="max-h-[220px] w-auto object-contain"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;