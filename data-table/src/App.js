import React, { useMemo, useEffect, useState } from "react";
import DataTable from "./components/DataTable.js";

const App = () => {
  const columns = useMemo(
    () => [
      { Header: "Common Name", accessor: "name.common" },
      { Header: "Population", accessor: "population" },
      { Header: "Area", accessor: "area" },
      { Header: "Region", accessor: "region" },
      { Header: "Country Code", accessor: "cca3" },
    ],
    []
  );

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const config = {
    sortableColumns: ["name.common", "population", "area", "region", "cca3"],
    filterableColumns: ["name.common", "region", "cca3"],
    isHeaderFixed: true,
    isPaginated: true,
    pageSize: 5,
  };

  return (
    <div>
      <h1>Country Data Table</h1>
      <DataTable columns={columns} data={data} config={config} />
    </div>
  );
};

export default App;
