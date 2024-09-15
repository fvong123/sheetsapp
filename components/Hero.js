'use client'

import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "../config";
import Link from "next/link";
import { useState, useEffect } from "react";
import intro from "../app/intro.gif";

const Hero = () => {
  const models = ['Leveraged Buyout', 'DCF', 'Trading Comps', 'Merger', '3 Statement', 'Interest Rate Swap'];
  const [currentModelIndex, setCurrentModelIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModelIndex((prevIndex) => (prevIndex + 1) % models.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-8 lg:gap-10 items-center justify-center text-center lg:text-left lg:items-start">
        
        <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight leading-relaxed">
          Learn to build <br/>
          <span className="bg-neutral text-neutral-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
            {models[currentModelIndex]}
          </span> <br/>
          models on our next generation platform
        </h1>
        <p className="text-sm lg:text-base opacity-80 leading-relaxed">
          Start your financial modelling career with our interactive, online course. Break into investment banking, private equity, or hedge funds.
        </p>
        <Link href="/simplelbo" className="btn btn-primary btn-wide">
          Get Started
        </Link>
        <p className="text-xs">No Credit Card Required!</p>

        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full">
        <Image
          src={intro}
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
