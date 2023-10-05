import React, { useState } from "react";
import { motion } from "framer-motion";

type ToggleSwitchProps = {
  onToggle: (isOn: boolean) => void;
};

const ToggleSwitch = ({ onToggle }: ToggleSwitchProps) => {
  const [isOn, setIsOn] = useState(true);

  const handleToggle = () => {
    setIsOn(!isOn);
    onToggle(isOn);
  };

  const switchVariants = {
    off: { x: 0 },
    on: { x: 50 },
  };

  const switchContainerVariants = {
    off: { backgroundColor: "#ccc" },
    on: { backgroundColor: "#5cb85c" },
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100px",
        height: "50px",
        border: "1px solid grey",
        borderRadius: "25px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
      }}
      onClick={handleToggle}
    >
      <motion.div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          border: "1px solid grey",
          position: "absolute",
          zIndex: 1,
        }}
        variants={switchVariants}
        initial={isOn ? "on" : "off"}
        animate={isOn ? "on" : "off"}
      />
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "25px",
          backgroundColor: "#fff",
          position: "absolute",
          zIndex: 0,
        }}
        variants={switchContainerVariants}
        initial={isOn ? "on" : "off"}
        animate={isOn ? "on" : "off"}
      />
    </div>
  );
};

export default ToggleSwitch;