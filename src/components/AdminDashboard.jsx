import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import "../styles/global.css";
import { Chart } from "./Chart";

export default function AdminDashboard() {
  const [isData, setIsData] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [minVal, setMinVal] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [chartData, setChartData] = useState(null);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const { state } = useLocation();

  const fetchData = async () => {
    const data = await axios.get(
      `https://stg.dhunjam.in/account/admin/${state.data.id}`
    );
    setIsData(data.data.data);
    setInputValues(data.data.data?.amount);
    setChartData(data.data.data?.amount);
    const areValuesValid = Object.values(data.data.data?.amount || {}).every(
      (value) => value >= 99
    );
    setMinVal(areValuesValid);
  };

  useEffect(() => {
    fetchData();
    setIsDisable(isData?.charge_customers === false);
  }, []);

  const handleChange = (e, category) => {
    e.preventDefault();
    const newValue = parseInt(e.target.value, 10);
    const updatedInputValues = { ...inputValues, [category]: newValue };

    const isValid = Object.values(updatedInputValues).every(
      (value) => value >= 99
    );

    setInputValues(updatedInputValues);
    setMinVal(isValid);
    setChartData(updatedInputValues);
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://stg.dhunjam.in/account/admin/${state.data.id}`, {
        amount: inputValues,
      });
      console.log("Data saved successfully!");

      setIsDataUpdated(true);
      fetchData();

      setTimeout(() => {
        setIsDataUpdated(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">
        {isData.name}, {isData.location} on Dhun Jam
      </h1>
      <div>
        <div className="grid">
          <p>Do you want to change your customers for requesting songs?</p>
          <div className="charge-custom">
            <label>
              <input
                type="radio"
                checked={isData?.charge_customers === true ? true : false}
                value="true"
                readOnly
              />
              True
            </label>
            <label>
              <input
                type="radio"
                checked={isData?.charge_customers === false ? true : false}
                value="false"
                readOnly
              />
              False
            </label>
          </div>
        </div>
        <div className="grid">
          <p>Custom song request amount -</p>
          <input
            type="number"
            disabled={isDisable}
            value={inputValues?.category_6 || ""}
            onChange={(e) => handleChange(e, "category_6")}
          />
        </div>
        <div className="grid">
          <p>Regular song request amounts, from high to low -</p>
          <div className="category-amt">
            <input
              type="number"
              disabled={isDisable}
              value={inputValues?.category_7 || ""}
              onChange={(e) => handleChange(e, "category_7")}
            />
            <input
              type="number"
              disabled={isDisable}
              value={inputValues?.category_8 || ""}
              onChange={(e) => handleChange(e, "category_8")}
            />
            <input
              type="number"
              disabled={isDisable}
              value={inputValues?.category_9 || ""}
              onChange={(e) => handleChange(e, "category_9")}
            />
            <input
              type="number"
              disabled={isDisable}
              value={inputValues?.category_10 || ""}
              onChange={(e) => handleChange(e, "category_10")}
            />
          </div>
        </div>
      </div>
      <br />
      {!isDisable && <Chart chartData={chartData} />}
      <button
        disabled={isDisable || !minVal}
        type="button"
        onClick={handleSave}
      >
        Save
      </button>
      {isDataUpdated && (
        <p style={{ color: "green" }}>Data updated and fetched again!</p>
      )}
    </div>
  );
}
