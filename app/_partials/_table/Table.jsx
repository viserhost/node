import Pagination from "../Pagination";
import { useState } from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { SearchBox } from "./SearchBox";

export const Table = ({
  columns,
  loading,
  showPagination = true,
  handlePagination = null,
  data,
  resource = null,
  searchable = false,
}) => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const { path } = data;

  const paginateContent = (
    <Pagination
      loading={loading}
      pagination={search ? rows : data}
      handlePagination={handlePagination}
    />
  );

  const searchContent = (
    <SearchBox
      setRows={setRows}
      path={path}
      resource={resource}
      search={search}
      setSearch={setSearch}
    />
  );

  return (
    <div className="card custom--card">
      <div className="card-body p-3">
        {(searchable && resource) ? searchContent : null}

        <div className="table-responsive">
          <table className="table custom--table">
            <TableHeader columns={columns} />
            <TableBody
              loading={loading}
              columns={columns}
              data={search ? rows?.data : data?.data}
            />
          </table>
        </div>
      </div>

      {(showPagination && handlePagination) ? paginateContent : null}
    </div>
  );
}