import React from "react";
import axios from "axios";
import exceljs from "exceljs";
import "./ViewPosts.css";

function GenerateReport() {
  const generateExcelReport = async () => {
    try {
      const response = await axios.get("http://localhost:3040/api/posts/");
      const posts = response.data;

      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet("Posts");

      worksheet.addRow([
        "ID",
        "Question",
        "Description",
        "Author",
        "Tags",
        "Vote Count",
      ]);

      posts.forEach((post) => {
        worksheet.addRow([
          post._id,
          post.question,
          post.description,
          post.author,
          post.tags.join(", "),
          post.voteCount,
        ]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "posts.xlsx";
      a.click();
    } catch (error) {
      console.error("Error generating Excel report:", error);
    }
  };

  return (
    <div>
      <button onClick={generateExcelReport} className="generate-report-button">
        Generate Report
      </button>
    </div>
  );
}

export default GenerateReport;
