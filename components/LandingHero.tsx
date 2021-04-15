import React from "react";
import Image from "next/image";
interface componentProps {}
const LandingHero: React.FC<componentProps> = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        flex: "1",
        filter: "brightness(40%);",
      }}
    >
      <Image
        // style={{ filter: "blur(3)" }}
        src="/hero3.jpeg"
        layout="fill"
        objectFit="cover"
      />
      ;
    </div>
  );
};

export default LandingHero;
