import React, { useEffect, useState } from "react";

const Product = ({ productDetails, handleChange, category }) => {
  const [input, setInput] = useState();
  const [product, setProduct] = useState(() => {
    return category.children.filter((c) => c.id === productDetails.id)[0];
  });
  const [varianceValue, setVarianceValue] = useState(0);
  useEffect(() => {
    console.log(product.value, productDetails.value);
    setVarianceValue(variance(product.value, productDetails.value));
  }, [productDetails.value]);

  const variance = (prev, curr) => {
    return ((curr - prev) / prev) * 100;
  };
  return (
    <tr className="border-b bg-gray-200">
      <td className="px-4 py-2 text-gray-700">--{productDetails.label}</td>
      <td className="px-4 py-2 text-gray-700">{productDetails.value}</td>
      <td className="px-4 py-2 font-medium text-gray">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </td>
      <td className="px-4 py-2 text-gray-700">
        <button
          onClick={() => {
            handleChange(category.id, productDetails.id, input, "per");
            setInput("");
          }}
        >
          Allocate
        </button>
      </td>
      <td className="px-4 py-2 text-gray-700">
        <button
          onClick={() => {
            handleChange(category.id, productDetails.id, input, "val");
            setInput("");
          }}
        >
          Allocate
        </button>
      </td>
      <td className="px-4 py-2 text-gray-700">{varianceValue}</td>
    </tr>
  );
};

export default Product;
