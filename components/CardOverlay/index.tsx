import React, { useState } from "react";

const CardOverlay: React.FC = () => {
  const [learnMoreLink1] = useState<string>('https://www.imdb.com/title/tt1091722/');
  const [learnMoreLink2] = useState<string>('https://www.imdb.com/title/tt1091722/');

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      {/* Cards Container */}
      <div className="absolute bottom-[-15%] flex gap-5 max-md:flex-wrap max-md:justify-center max-md:bottom-[-5%] max-[480px]:flex-col max-[480px]:items-center max-[480px]:bottom-[-5] max-[480px]:mr-[15px]">
        {/* Left Card */}
        <div className="bg-white rounded-[20px] p-5 w-[300px] shadow-[6px_6px_8px_0px_rgba(170,176,176,1)] text-center max-md:w-[250px] max-md:p-[15px] max-[480px]:w-[90%] max-[480px]:p-[15px]">
          <h3 className="text-[1.2rem] p-3 mb-2.5 max-md:text-[1.3rem] max-[480px]:text-[1.4rem]">
            Disney Parks Dated Tickets
          </h3>
          <p className="bg-[#f8e1ff] py-[5px] px-2.5 rounded-[5px] text-[0.9rem] mb-2.5 max-md:text-[1.2rem] max-[480px]:text-[1.2rem]">
            Enjoy the magic for 1 or several days
          </p>
          <ul className="flex flex-col items-start text-base pl-5 text-[rgb(52,51,51)] max-md:text-[1.2rem] max-[480px]:text-[1.2rem]">
            <li>1 or 2 Disney Parks</li>
            <li>1 to 4 days access</li>
            <li>Dated tickets can be cancelled up to 3 days before arrival</li>
          </ul>
          <a 
            href={learnMoreLink1} 
            className="block mt-[5px] pt-2.5 text-[#0056ff] no-underline hover:underline max-md:text-[1.5rem] max-[480px]:text-[1.5rem]"
          >
            Learn more
          </a>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-[20px] p-5 w-[300px] shadow-[6px_6px_8px_0px_rgba(170,176,176,1)] text-center max-md:w-[250px] max-md:p-[15px] max-[480px]:w-[90%] max-[480px]:p-[15px]">
          <h3 className="text-[1.2rem] p-3 mb-2.5 max-md:text-[1.3rem] max-[480px]:text-[1.4rem]">
            Hotel + Tickets Package
          </h3>
          <p className="bg-[#f8e1ff] py-[5px] px-2.5 rounded-[5px] text-[0.9rem] mb-2.5 max-md:text-[1.2rem] max-[480px]:text-[1.2rem]">
            Stay close to the magic!
          </p>
          <ul className="flex flex-col items-start text-base pl-5 text-[rgb(52,51,51)] max-md:text-[1.2rem] max-[480px]:text-[1.2rem]">
            <li>A high-quality hotel close to Disney Parks</li>
            <li>Access to both Disney Parks</li>
            <li>Modify or cancel without fees up to 7 days before arrival</li>
          </ul>
          <a 
            href={learnMoreLink2} 
            className="block mt-[5px] pt-2.5 text-[#0056ff] no-underline hover:underline max-md:text-[1.5rem] max-[480px]:text-[1.5rem]"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardOverlay;
