interface CommunityPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const CommunityPagination = ({ currentPage, totalPages, onPageChange }: CommunityPaginationProps) => (
    <div className="community-pagination">
        <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
        >
            &lt;&lt;
        </button>
        <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
        >
            &lt;
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
        >
            &gt;
        </button>
        <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
        >
            &gt;&gt;
        </button>
    </div>
);

export default CommunityPagination;
