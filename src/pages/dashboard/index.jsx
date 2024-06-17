import dayjs from "dayjs";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/dashboard/ui/Button";
import { Table } from "../../components/dashboard/table/Table";
import { tableStatusValue } from "../../data/tableData";
import { SearchBar } from "../../components/dashboard/SearchBar";
import { Pagination } from "../../components/dashboard/table/Pagination";
import { useProduct } from "../../stores/product.store";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue] = useDebounce(searchText, 1000);

  const { productList, getAllProducts, totalCount, isLoading } = useProduct(
    (state) => state
  );

  const columns = [
    { Header: "S No", accessor: "sno", minWidth: 50 },
    {
      Header: "Product Name",
      accessor: "name",
      minWidth: 150,
      Cell: ({ row }) => (
        <div className="flex items-center gap-x-2">
          {row.original?.images?.length > 0 && (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}image/${
                row.original?.images[0]
              }`}
              className="w-[32px] h-[32px] rounded-full"
            />
          )}
          <span>{row.original.name}</span>
        </div>
      ),
    },
    { Header: "Product Description", accessor: "description", minWidth: 200 },
    {
      Header: "Categories",
      accessor: "categories",
      minWidth: 130,
      Cell: ({ row }) => (
        <span>{row.original.categories.map((u) => u.name).join(", ")}</span>
      ),
    },
    {
      Header: "MRP",
      accessor: "mrp",
      minWidth: 130,
      Cell: ({ row }) => <span>₹ {row.original.price?.mrp}</span>,
    },
    {
      Header: "Selling Price",
      accessor: "sellingPrice",
      minWidth: 130,
      Cell: ({ row }) => <span>₹ {row.original.price?.sellingPrice}</span>,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: 150,
      Cell: ({ row }) => (
        <span
          className="min-w-[95px] px-3 py-1 inline-flex justify-center rounded-[6px] text-xs font-medium font-poppins"
          style={{
            backgroundColor: tableStatusValue[row.original.status]?.bgColor,
          }}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      minWidth: 160,
      Cell: ({ row }) => (
        <span>
          {dayjs(row.original.createdAt).format("hh:mm, DD MMM YYYY")}
        </span>
      ),
    },
    {
      Header: "Last Updated At",
      accessor: "updatedAt",
      minWidth: 160,
      Cell: ({ row }) => (
        <span>
          {dayjs(row.original.updatedAt).format("hh:mm, DD MMM YYYY")}
        </span>
      ),
    },
    {
      Header: "Actions",
      accessor: "actions",
      minWidth: 60,
      Cell: () => (
        <span className="flex items-center justify-center gap-2">
          <Link to="/dashboard/edit-product">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pencil cursor-pointer"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </Link>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye cursor-pointer"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> */}
        </span>
      ),
    },
  ];

  const handleAddProduct = () => {
    navigate("/dashboard/edit-product");
  };

  useEffect(() => {
    if (searchText.length === 1) {
      setCurrentPage(1)
    }
  }, [searchText?.length])

  useEffect(() => {
    getAllProducts({ page: currentPage, search: searchValue });
  }, [currentPage, searchValue]);
 
  return (
    <div className="w-full flex flex-col ">
      <div className="w-full py-[20px] px-2 md:!px-[24px] mb-[30px] overflow-x-auto rounded-[10px] bg-white shadow-[0px_4px_15px_rgba(171,171,171,0.25)]">
        <div className="mb-4 flex items-center justify-between">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <Button text="+ Add Product" handleClick={handleAddProduct} />
        </div>
        <Table
          columns={columns}
          data={productList}
          displayBlock={true}
          isLoading={isLoading}
        />
        <div>
          <Pagination
            totalCount={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
