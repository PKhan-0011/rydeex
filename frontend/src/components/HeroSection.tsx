"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Bike, Bus, Car, Truck } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/rydexBg1.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white font-extrabold text-4xl md:text-7xl sm:text-5xl"
        >
          Book Any Vehicle
        </motion.div>
        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-gray-300 mt-4 max-w-4xl md:max-w-7xl sm:max-w-5xl"
        >
          Book any vehicle instantly with fast, reliable ride booking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-6 flex gap-8 text-gray-300"
        >
          <Bike size={30} />
          <Car size={30} />
          <Bus size={30} />
          <Truck size={30} />
        </motion.div>

        <motion.button
          className="mt-12 px-10 py-4 bg-white text-black rounded-full font-semibold shadow-xl cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Now
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSection;
