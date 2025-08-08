import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { assets } from "@/assets2/assets";

export default function Certificate({
  username,
  courseName,
  completionDate,
  certificateId = 'CERT-20250711100517'
}) {

  const downloadCertificate = () => {
    const certificateElement = document.createElement("div");
    certificateElement.style.position = "fixed"; // Fixed position to cover the viewport
    certificateElement.style.left = "0"; // Cover full width
    certificateElement.style.top = "0"; // Cover full height
    certificateElement.style.width = "70vw";
    certificateElement.style.height = "100vh";
    certificateElement.style.background = "white";
    certificateElement.style.padding = "40px";
    certificateElement.style.boxSizing = "border-box";
    certificateElement.style.border = "10px solid #000"; // Added border

    // Outer container for centering
    certificateElement.style.display = "flex";
    certificateElement.style.alignItems = "center";
    certificateElement.style.justifyContent = "center";

    // Inner container with actual certificate design
    const innerHTML = `
      <div style="text-align:center; font-family:sans-serif; position:relative; width:100%; height:100%; padding:40px; box-sizing:border-box; border: 5px solid #000; background: white;">
        <img src="${assets.learnify}" style="position:absolute; top:20px; left:20px; width:150px;" />
        <h1 style="font-size:32px; font-weight:bold;">Certificate of Completion</h1>
        <p style="font-size:20px; margin-top:20px;">This is to certify that</p>
        <h2 style="font-size:26px; font-weight:600; margin:10px 0;">${username}</h2>
        <p style="margin-top:10px;">has successfully completed the course</p>
        <h2 style="font-size:22px; font-weight:500; margin:10px 0;">${courseName}</h2>
        <p style="margin-top:10px;">on ${completionDate}</p>
        <div style="display:flex; justify-content:space-between; margin-top:60px; padding:0 40px;">
          <div>
            <img src="${assets.instructor}" style="width:180px;" />
          </div>
          <div>
            <img src="${assets.director}" style="width:120px;" />
            <p>Director Signature</p>
          </div>
        </div>
        <p style="margin-top:30px; font-size:14px;">Certificate ID: ${certificateId}</p>
        <p style="font-size:12px; color:gray;">Issued by Learnify Platform</p>
      </div>
    `;

    certificateElement.innerHTML = innerHTML;
    document.body.appendChild(certificateElement);

    html2canvas(certificateElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height); // Ensure full coverage
      pdf.save("certificate.pdf");
      document.body.removeChild(certificateElement);
    });
  };

  return (
    <div className="">
      <button
        onClick={downloadCertificate}
        className="px-3 py-3 bg-blue-600  text-white rounded hover:bg-blue-700 text-sm font-semibold"
      >
        Download Certificate 
      </button>
    </div>
  );
}
