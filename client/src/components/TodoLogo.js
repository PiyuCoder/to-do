import React from "react";

export default function TodoLogo(t, o1, d, o2, landing) {
  return (
    <>
      <h1
        className={`${!landing ? "landing-" : ""}title-letter ${t}`}
        style={{ transform: "rotateZ(5deg)" }}
      >
        T
      </h1>
      <h1
        className={`${!landing ? "landing-" : ""}title-letter ${o1}`}
        style={{ transform: "rotateZ(-5deg)" }}
      >
        O
      </h1>
      <h1
        className={`${!landing ? "landing-" : ""}title-letter ${d}`}
        style={{ transform: "rotateZ(-1deg)" }}
      >
        D
      </h1>
      <h1
        className={`${!landing ? "landing-" : ""}title-letter ${o2}`}
        style={{ transform: "rotateZ(2deg)" }}
      >
        O
      </h1>
    </>
  );
}
