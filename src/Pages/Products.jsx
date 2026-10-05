import React, { useEffect, useState } from "react";
import { Pagination, Button } from "@heroui/react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import ProductComponent from "../Components/ProductComponent";
import {Spinner} from "@heroui/spinner";
import { getProducts } from "../Services/DataServices";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8; // Set your desired limit here

  async function getDataOfProducts(page) {
    let res=await getProducts(page,limit);

      // Based on your original JSON, products are inside res.data.data
      setProducts(res.data);
      setMetadata(res.metadata);
  }

  // Fetch data whenever currentPage changes
  useEffect(() => {
    getDataOfProducts(currentPage);
  }, [currentPage]);

  return (
    <>
    {products.length==0?<div className="h-screen flex items-center justify-center"><Spinner /></div>:<div className="flex flex-col gap-5 p-4">
      {/* Display Products */}
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-4">
        {products.map((product) => (
          <ProductComponent product={product} />
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
