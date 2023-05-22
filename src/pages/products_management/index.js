import { Button } from "antd";
import { useState } from "react";
import MainAsin from "./components/main_asin";
import SubAsin from "./components/sub_asin";

const ProductsManagement = () => {
  const [isShowMainAsin, setIsShowMainAsin] = useState(false);
  const [isShowSubAsin, setIsShowSubAsin] = useState(false);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setIsShowMainAsin(true);
        }}
      >
        Create New
      </Button>
      {isShowMainAsin && <MainAsin setIsShowSubAsin={setIsShowSubAsin} />}
      {isShowSubAsin && <SubAsin />}
    </>
  );
};

export default ProductsManagement;
