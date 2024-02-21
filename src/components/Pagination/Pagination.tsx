import { PaginationControl } from "react-bootstrap-pagination-control";
import "./Pagination.scss";

interface PaginationProps {
    entriesPerPage : number;
    totalKirtans : number;
    paginate : (event : any, pageNumber : number) => void;
    currentPage : number; 
    setCurrentPage : (currentPage : number) => void;
}

const PaginationComponent : React.FC<PaginationProps> = ({
  entriesPerPage,
  totalKirtans,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  
    const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(totalKirtans / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
    <PaginationControl
      page={currentPage}
      between={1}
      total={totalKirtans}
      limit={entriesPerPage}
      changePage={(currentPage : number) => {
        setCurrentPage(currentPage);
      }}
    //   paginationSize={1}
      next={false}
      last={true}
      ellipsis={1}
    //   className="pagination"
    />
    </div>
  );
}

export default PaginationComponent;
