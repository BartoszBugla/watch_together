import React from "react";
import Image from "next/image";
import Particles from "react-particles-js";
interface componentProps {}
const LandingHero: React.FC<componentProps> = () => {
  return (
    <>
      {" "}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          flex: "1",
          filter: "brightness(40%)",
          backgroundColor: "#2F2F2F",
        }}
      >
        <Particles
          className="h-full"
          params={{
            particles: {
              lineLinked: { width: 3.2 },
              size: {
                value: 1,
                anim: {
                  speed: 10,
                },
              },
              number: { value: 70 },
            },
          }}
          style={{
            position: "absolute",
            height: "200%",
            backgroundColor: "black",
          }}
        />
      </div>
    </>
  );
};

export default LandingHero;
