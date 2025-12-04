import React, { useState } from "react";

const CardOverlay: React.FC = () => {
  const [learnMoreLink1] = useState<string>('/accommodation');
  const [learnMoreLink2] = useState<string>('/package');

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      {/* Cards Container */}
      <div className="absolute bottom-[10%] flex gap-5 max-md:flex-wrap max-md:justify-center md:bottom-[15%] max-[480px]:flex-col max-[480px]:items-center max-[480px]:bottom-[5] max-[480px]:mr-[15px]">
        {/* Left Card */}
        <div className="bg-white rounded-[20px] p-5 w-[300px] shadow-[6px_6px_8px_0px_rgba(170,176,176,1)] text-center max-md:w-[250px] max-md:p-[15px] max-[480px]:w-[90%] max-[480px]:p-[15px]">
          <h3 className="text-[1.2rem] p-3 mb-2.5 max-md:text-[1.3rem] max-[480px]:text-[1.4rem]">
            Ski Resort Accommodation
          </h3>
          <p className="bg-[#ffe1e1] py-[5px] px-2.5 rounded-[5px] text-[0.9rem] mb-2.5 max-md:text-[1.2rem] max-[480px]:text-[1.2rem]">
            Stay close to the slopes!
          </p>
          <ul className="flex flex-col items-start text-base pl-5 text-[rgb(52,51,51)] max-md:text-[1.2rem] max-[480px]:text-[1.2rem]">
            <li>Ski-in/Ski-out locations</li>
            <li>Flexible booking options</li>
            <li>Cancel up to 7 days before arrival</li>
          </ul>
          <a
            href={learnMoreLink1}
            className="block mt-[5px] pt-2.5 text-[#C41E3A] no-underline hover:underline max-md:text-[1.5rem] max-[480px]:text-[1.5rem]"
          >
            Learn more
          </a>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-[20px] p-5 w-[300px] shadow-[6px_6px_8px_0px_rgba(170,176,176,1)] text-center max-md:w-[250px] max-md:p-[15px] max-[480px]:w-[90%] max-[480px]:p-[15px]">
          <h3 className="text-[1.2rem] p-3 mb-2.5 max-md:text-[1.3rem] max-[480px]:text-[1.4rem]">
            Complete Ski Package
          </h3>
          <p className="bg-[#ffe1e1] py-[5px] px-2.5 rounded-[5px] text-[0.9rem] mb-2.5 max-md:text-[1.2rem] max-[480px]:text-[1.2rem]">
            Everything you need for your ski trip!
          </p>
          <ul className="flex flex-col items-start text-base pl-5 text-[rgb(52,51,51)] max-md:text-[1.2rem] max-[480px]:text-[1.2rem]">
            <li>Premium accommodation near slopes</li>
            <li>Ski pass included for all days</li>
            <li>Free cancellation up to 14 days before</li>
          </ul>
          <a
            href={learnMoreLink2}
            className="block mt-[5px] pt-2.5 text-[#C41E3A] no-underline hover:underline max-md:text-[1.5rem] max-[480px]:text-[1.5rem]"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardOverlay;
