"use client";
/* eslint-disable react/display-name */
import axios from "axios";
import React, { useMemo ,useState,useEffect} from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import ProgressBar from "@/components/ui/ProgressBar";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";

const COLUMNS = [
  {
    Header: "Numero",
    accessor: "eco",
    Cell: (row) => {
      return <span className="flex justify-center"># {row?.cell?.value}</span>;
    },
  },
  {
    Header: "Operador",
    accessor: "operador",
    Cell: (row) => {
      return (
        <div>
          <span className="inline-flex items-center">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        </div>
      );
    },
  },
  {
    Header: "Placa",
    accessor: "placa",
    Cell: (row) => {
      return <span className="flex justify-center">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Voltaje",
    accessor: "voltaje",
    Cell: (row) => {
      return <span className="flex justify-center">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Nivel Combustible",
    accessor: "combustible",
    Cell: (row) => {
      return (
        <div>
          <ProgressBar
            value={row?.cell?.value}
            className={` ${row?.cell?.value >= 70 ? "bg-green-500" : ""} 
            ${
              row?.cell?.value > 30 && row?.cell?.value < 69
                ? "bg-yellow-500"
                : ""
            } 
            ${row?.cell?.value < 29 ? "bg-red-500" : " "}`}
            striped
            backClass="h-3 rounded-[999px]"
          />
          <span className="flex justify-center">{row?.cell?.value}%</span>
        </div>
      );
    },
  },
  {
    Header: "Fallos",
    accessor: "fallos",
    Cell: (row) => {
      return <span className="flex justify-center">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Status",
    accessor: "is_active",
    Cell: (row) => {
      return (
        <span className="block w-full items-center">
          <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
              row?.cell?.value === 1
                ? "text-success-500 bg-success-500"
                : ""
            } 
            ${
              row?.cell?.value === 0
                ? "text-warning-500 bg-danger-500"
                : ""
            }
             `}
          >
            {row?.cell?.value === 1 ? "Encendido" : "Apagado"}
          </span>
        </span>
      );
    },
  },

  {
    Header: "",
    accessor: "action",
    Cell: (row) => {
      return (
        <div>
          <Dropdown
            classMenuItems="right-0 w-[140px] top-[110%]"
            label={
              <span className="text-xl text-center block w-full ">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
            }
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {actions.map((item, i) => (
                <Menu.Item key={i}>
                  <div
                    className={`
              
                ${
                  item.name === "delete"
                    ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                    : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                }
                 w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                 first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                  >
                    <span className="text-base">
                      <Icon icon={item.icon} />
                    </span>
                    <span>{item.name}</span>
                  </div>
                </Menu.Item>
              ))}
            </div>
          </Dropdown>
        </div>
      );
    },
  },
];

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="table-checkbox"
        />
      </>
    );
  }
);

const actions = [
  {
    name: "view",
    icon: "heroicons-outline:eye",
  },
  {
    name: "edit",
    icon: "heroicons:pencil-square",
  },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
  },
];

const TablaUnidades = ({ title = "Unidades" }) => {
  
  const [trucks, setTrucks] = useState([]); // Set initial state to an empty array

  useEffect(() => {
    async function LoadUnidades() {
      try {
        const response = await axios.get("http://localhost:3000/api/camiones");
        setTrucks(response.data); // Setting the state will cause component to re-render
        console.log(response.data);
      } catch (error) {
        console.error("Ha ocurrido un error al cargar las unidades: ", error);
        // Handle your error here according to your application's requirements
      }
    }
    LoadUnidades();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => trucks, [trucks]); // Asegúrate de que trucks es un array


  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{title}</h4>
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800 justify-center">
                  <tr>
                    {columns.map((column, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="py-3 px-6 text-center font-semibold text-sm uppercase tracking-wider border-b border-gray-200"
                      >
                        {column.Header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();
                    return (
                      <tr key={key} {...restRowProps}>
                        {row.cells.map((cell) => {
                          const { key, ...restCellProps } = cell.getCellProps();
                          return (
                            <td
                              key={key}
                              {...restCellProps}
                              className="table-td"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <select
              className="form-control py-2 w-max"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse flex-wrap">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons:chevron-double-left-solid" />
              </button>
            </li>
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Prev
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </li>
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Icon icon="heroicons:chevron-double-right-solid" />
              </button>
            </li>
          </ul>
        </div>
        {/*end*/}
      </Card>
    </>
  );
};

export default TablaUnidades;
