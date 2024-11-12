import React, { useEffect, useState } from "react";
import Product from "./Product";

import { data } from "../data/data";

const Category = ({ details, handleChange }) => {
  const [category, setCategory] = useState(() => {
    return JSON.parse(JSON.stringify(data)).rows.filter(
      (row) => row.id === details.id
    )[0];
  });
  const [input, setInput] = useState("");
  const [varianceValue, setVarianceValue] = useState(0);

  useEffect(() => {
    setVarianceValue(variance(category.value, details.value));
  }, [details.value]);

  const variance = (prev, curr) => {
    return ((curr - prev) / prev) * 100;
  };

  return (
    <>
      {/* Main category row */}
      <tr className="border-b bg-gray-50">
        <td className="px-4 py-2 font-medium text-gray-800">{details.label}</td>
        <td className="px-4 py-2 font-medium text-gray-800">{details.value}</td>
        <td className="px-4 py-2 font-medium text-gray">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </td>
        <td className="px-4 py-2 font-medium text-gray-800">
          <button
            onClick={() => {
              handleChange(details.id, null, input, "per");
              setInput("");
            }}
          >
            Allocate
          </button>
        </td>
        <td className="px-4 py-2 font-medium text-gray-800">
          <button
            onClick={() => {
              handleChange(details.id, null, input, "val");
              setInput("");
            }}
          >
            Allocate
          </button>
        </td>
        <td className="px-4 py-2 font-medium text-gray-800">{varianceValue}</td>
      </tr>
      {/* Children rows */}
      {details.children.map((child) => (
        <React.Fragment key={child.id}>
          <Product
            productDetails={child}
            handleChange={handleChange}
            category={category}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default Category;
