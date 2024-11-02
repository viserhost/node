import useUtility from "@/app/_hooks/useUtility";

export default function Search({ handleSearch }) {
    const {trans} = useUtility();
    return (
        <>
            <form onSubmit={handleSearch}>
                <div className="mb-3 d-flex justify-content-end w-50">
                    <div className="input-group">
                        <input type="search" name="search" className="form-control" placeholder={trans('Search by transactions')} />
                        <button className="input-group-text bg-primary text-white">
                            <i className="las la-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
