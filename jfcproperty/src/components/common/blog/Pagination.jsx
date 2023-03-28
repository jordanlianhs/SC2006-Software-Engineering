import React, { useState } from "react";


const Pagination = ({ flatsPerPage, totalFlats, paginate }) => {
  const [startPage, setStartPage] = useState(1);

  const lastPageDisplayed = Math.min(
    startPage + 19,
    Math.ceil(totalFlats / flatsPerPage)
  );

  const pageNumbers = [];
  for (let i = startPage; i <= lastPageDisplayed; i++) {
    pageNumbers.push(i);
  }

  const handlePreviousClick = () => {
    const newStartPage = Math.max(startPage - 20, 1);
    setStartPage(newStartPage);
    paginate(newStartPage);
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a onClick={handlePreviousClick} className="page-link">
            Previous
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            onClick={() => {
              setStartPage(startPage + 20);
              paginate(startPage + 20);
            }}
            className="page-link"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;




