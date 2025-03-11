import { Document, Page } from "react-pdf";
import React from "react";

const BrochurePage = () => {
  return (
    <Document file="/brochures/brochure.pdf">
      {Array.from(new Array(48), (_, index) => (
        <Page key={index} pageNumber={index + 1} />
      ))}
    </Document>
  );
};

export default BrochurePage;
