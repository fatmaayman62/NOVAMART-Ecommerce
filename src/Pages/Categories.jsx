import { Button, Pagination, Spinner } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getBrands, getCategories } from "../Services/DataServices";


function Categories() {
  const [categories, setCategories] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;


  async function getDataOfCategories(page) {
    const res = await getCategories(page, limit);
    setCategories(res.data);
    setMetadata(res.metadata);
  }



  useEffect(()=>{
    getDataOfCategories(currentPage);
  },[currentPage])

  return (
      <>
    {categories.length==0?<div className="h-screen flex items-center justify-center"><Spinner /></div>:<div className="flex flex-col gap-5 p-4">
      {/* Display Products */}
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {categories.map((category) => (
          <figure key={category._id} className="group h-45 rounded-2xl overflow-hidden shadow cursor-pointer">
            <img src={category.image} className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110" alt={category.name} />
          </figure>
        ))}
      </div>



      <div className="flex gap-2 items-center justify-center">
        <Button
          color="primary"
          size="sm"
          variant="flat"
          isDisabled={currentPage === 1}
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <IoIosArrowBack />
        </Button>
              {/* Use metadata.numberOfPages dynamically instead of hardcoding 10 */}
      <Pagination
        color="primary"
        page={currentPage}
        total={metadata.numberOfPages || 1}
        onChange={setCurrentPage}
      />
        <Button
          color="primary"
          size="sm"
          variant="flat"
          isDisabled={currentPage === metadata.numberOfPages}
          onPress={() =>
            setCurrentPage((prev) => Math.min(prev + 1, metadata.numberOfPages))
          }
        >
          <IoIosArrowForward />
        </Button>
      </div>
    </div>}
    
    </>
  );
}

export default Categories;
