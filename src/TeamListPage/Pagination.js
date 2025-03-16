import React from "react";
//import "./Pagination.css";

const Pagination = ({ totalTeams, teamsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalTeams / teamsPerPage);

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
