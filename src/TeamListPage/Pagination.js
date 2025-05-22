import React from "react";
import { Pagination } from "react-bootstrap";

const TeamPagination = ({ totalTeams, teamsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalTeams / teamsPerPage);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← 이전
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음 →
      </button>
    </div>
  );
};

export default TeamPagination;
