//Merupakan Page Beranda yang dapat diakses oleh siapapun
//Fungsi Debounce untuk mengurangi jumlah request ke server

import { useState, useEffect, useMemo } from "react";
import Setting from "./Setting.jsx";
import AllKonten from "./Konten.jsx";
import debounce from "lodash.debounce";

function Beranda(props) {
  const [isGrid, setIsGrid] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("tanggal");
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSearch, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  const handleSort = (e) => {
    setSort(e);
  };

  const handleFilter = (e) => {
    setFilter(e);
  };

  const handleList = () => {
    if (isGrid) {
      setIsGrid(false);
    }
  };
  const handleGrid = () => {
    if (!isGrid) {
      setIsGrid(true);
    }
  };

  return (
    <div
      id={props.isfull ? "maincontent" : "maincontent1"}
      className=" dark:bg-black absolute content flex flex-row sm:gap-y-4 gap-y-2 gap-x-6 top-[64px] md:p-8 p-0 pt-3 flex flex-col"
    >
      <Setting
        isGrid={isGrid}
        handleGrid={handleGrid}
        handleList={handleList}
        handleFilter={handleFilter}
        handleSort={handleSort}
        search={search}
        handleSearch={handleSearch}
        debouncedResults={debouncedResults}
      />
      <AllKonten
        isFull={props.isfull}
        isGrid={isGrid}
        search={search}
        sort={sort}
        filter={filter}
      />
    </div>
  );
}

export default Beranda;
