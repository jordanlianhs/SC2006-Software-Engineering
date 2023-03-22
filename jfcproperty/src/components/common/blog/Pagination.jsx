import React, { useState } from 'react';

const Pagination = ({ totalFlats, flatsPerPage, paginate }) => {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalFlats / flatsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
    paginate(number);
  };

  return (
    <ul className="page_navigation">
      {pageNumbers.map((number) => (
        <li
          className={currentPage === number ? 'page-item active' : 'page-item'}
          key={number}
        >
          <a className="page-link" href="#" onClick={() => handleClick(number)}>
            {number}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;


