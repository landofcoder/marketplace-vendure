import React from "react";
const StepProgressBar = ({ steps, activeStep }) => {
  return (
    <div className="container">
      <ul className="progressbar">
        {steps &&
          steps.map((item, index) => {
            return (
              <li className={index + 1 <= +activeStep ? "active" : ""} key={index}>
                {item.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default StepProgressBar;
