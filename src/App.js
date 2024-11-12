import React, { useState } from "react";
import { data } from "./data/data";
import "./App.css";
import Category from "./components/Category";

const App = () => {
  const [details, setDetails] = useState(data);
  const handleChange = (categoryId, productId, value, type) => {
    value = parseInt(value);
    const updatedDetails = details.rows.map((row) => {
      if (row.id === categoryId) {
        if (productId != null) {
          row.children.map((product) => {
            if (product.id === productId) {
              if (type === "per") {
                row.value += allocateByPer(product.value, value);
                product.value += allocateByPer(product.value, value);
              } else {
                product.value = value;
                row.value += value;
              }
            }
            return product;
          });
        } else {
          if (type === "per") {
            allocateChild(row, value, type);
            row.value += allocateByPer(row.value, value);
          } else {
            allocateChild(row, value, type);
            row.value = value;
          }
        }
      }
      return row;
    });
    setDetails({
      rows: updatedDetails,
    });
  };

  const allocateByPer = (currentVal, per) => {
    const val = (currentVal * per) / 100;
    return val;
  };

  const allocateChild = (row, val, type) => {
    let value;
    if (type === "per") {
      value = row.value + allocateByPer(row.value, val);
    } else {
      value = val;
    }
    row.children.forEach((child) => {
      let per = (child.value / row.value) * 100;
      child.value = (value * per) / 100;
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl text-center font-bold">Hierarchical Table</h1>
      <table className="min-w-full table-auto border-collapse mt-10">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Label
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Value
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Input
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Allocation %
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Allocation val
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Variance %
            </th>
          </tr>
        </thead>
        <tbody>
          {details.rows.map((row) => (
            <React.Fragment key={row.id}>
              <Category details={row} handleChange={handleChange} />
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
