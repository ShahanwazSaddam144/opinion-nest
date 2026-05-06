"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "./animations";

const Header = () => {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        custom={0}
        style={{ marginBottom: 48 }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "#2563eb",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          AI-Powered
        </p>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#0f172a",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Business Analysis
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#64748b",
            marginTop: 10,
            fontWeight: 300,
          }}
        >
          Describe your idea and get data-driven projections, risk analysis, and
          scale modeling.
        </p>
      </motion.div>
    </>
  );
};

export default Header;
