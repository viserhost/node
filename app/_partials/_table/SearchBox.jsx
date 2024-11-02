import { request } from "@/lib/helpers";
import { useState } from "react";

export const SearchBox = ({
    setRows,
    path,
    search,
    setSearch,
    resource
}) => {
    let debounceTimeout;

    const handleSearch = async (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearch(value);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        debounceTimeout = setTimeout(async () => {
            try {
                const { data: response } = await request.get(`${path}?search=${value}`);
                setRows(response?.data[resource]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 1000);
    };


    return (
        <div className="card-body p-3">
            <input
                onInput={handleSearch}
                name="search"
                className="form-control"
                placeholder="Search..."
                value={search}
            />
        </div>
    )
};