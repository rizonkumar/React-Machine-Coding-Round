const Pagination = ({ pageNo, setPageNo }) => {
  const prevThreeNo = Array.from(
    { length: 3 },
    (_, index) => pageNo - 1 - index
  )
    .filter((value) => value > 0)
    .reverse();

  const nextFourNo = Array.from({ length: 4 }, (_, index) => pageNo + index);
  const paginationArray = [...prevThreeNo, ...nextFourNo];
  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  const handlePrev = () => {
    setPageNo(pageNo - 1);
  };

  return (
    <div className="pagination-container">
      {pageNo > 1 ? (
        <div onClick={handlePrev} className="page-btn">
          {"<"}
        </div>
      ) : (
        ""
      )}
      {paginationArray.map((value, index) => {
        return (
          <div
            key={index}
            className={value === pageNo ? "page-btn active" : "page-btn"}
            onClick={() => setPageNo(value)}
          >
            {value}
          </div>
        );
      })}
      <div onClick={handleNext} className="page-btn">
        {">"}
      </div>
    </div>
  );
};

export default Pagination;
