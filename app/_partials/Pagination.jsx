export default function Pagination({ loading, pagination, handlePagination }) {
    const isPaginationValid = pagination && pagination.total > pagination.per_page;
    
    const handlePaginationUrl = (url) => {
        const page = url.split('page=')[1];

        handlePagination(page);

        if (page) {
            const currentUrl = new URL(window.location);
            currentUrl.searchParams.set('page', page);
            window.history.pushState({}, '', currentUrl.toString());
        }
    };

    if (!isPaginationValid || loading) {
        return null;
    }

    return (
        <div className="card-footer">
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {pagination?.links?.map((link, index) => {
                        const isLinkActive = link.active ? 'active' : '';
                        const isLinkDisabled = !link.url ? 'disabled' : '';
                        const isLinkUrl = link.url;
                        const linkLabel = link.label;

                        return (
                            <li key={index} className={`page-item ${isLinkActive} ${isLinkDisabled}`}>
                                {!isLinkUrl ? (
                                    <span className="page-link">{linkLabel}</span>
                                ) : (
                                    <button
                                        type="button"
                                        className="page-link"
                                        onClick={() => handlePaginationUrl(link.url)}
                                    >
                                        {linkLabel === '‹' ? 'Previous' :
                                            linkLabel === '›' ? 'Next' :
                                                linkLabel}
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
