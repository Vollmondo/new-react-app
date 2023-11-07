import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsBoost from "highcharts/modules/boost";
import { ICategory, IProduct } from "../../models";
import "./ChartStyles.css";

HighchartsBoost(Highcharts);

export function AddedProductsChart() {
  const [addedData, setAddedData] = useState<number[][]>([]);
  const [zoomLevel, setZoomLevel] = useState("all");

  async function fetchData() {
    const productsResponse = await fetch("http://localhost:5000/products");
    const products: IProduct[] = await productsResponse.json();

    const categoriesResponse = await fetch("http://localhost:5000/categories");
    const categories: ICategory[] = await categoriesResponse.json();

    return { products, categories };
  }

  function calculateDataForTimePeriod(products: IProduct[], days: number) {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000);

    const data = [];

    for (let date = startDate; date <= currentDate; date.setDate(date.getDate() + 1)) {
      const addedProducts = products.filter((product) => {
        if (product.addedDate) {
          const productDate = new Date(product.addedDate);
          return productDate.toDateString() === date.toDateString();
        }
        return false;
      });

      data.push([date.getTime(), addedProducts.length]);
    }

    return data;
  }

  useEffect(() => {
    async function loadData() {
      const products = await fetchData();

      const addedData = calculateDataForTimePeriod(products.products, 1);
      setAddedData(addedData);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadChartData() {
      const products = await fetchData();

      const addedData = calculateDataForTimePeriod(products.products, getDaysForZoomLevel(zoomLevel));
      setAddedData(addedData);
    }

    loadChartData();
  }, [zoomLevel]);

  function getDaysForZoomLevel(level: string) {
    switch (level) {
      case "1d":
        return 1;
      case "1w":
        return 7;
      case "1m":
        return 30;
      case "1y":
        return 365;
      default:
        return 7;
    }
  }

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Количество загруженных товаров",
    },
    xAxis: {
      type: "datetime",
      minRange: zoomLevel === "all" ? undefined : getDaysForZoomLevel(zoomLevel) * 24 * 3600 * 1000,
    },
    yAxis: {
      title: {
        text: "Количество",
      },
    },
    series: [
      {
        name: "Количество товаров",
        data: addedData,
      },
    ],
    boost: {
      enabled: true,
    },
    scrollbar: {
      enabled: true,
    },
    scrollablePlotArea: {
      enabled: true,
    },
    rangeSelector: {
      buttons: [
        {
          type: "all",
          text: "Все",
          events: {
            click: function () {
              setZoomLevel("all");
            },
          },
        },
        {
          type: "day",
          count: 1,
          text: "1 день",
          events: {
            click: function () {
              setZoomLevel("1d");
            },
          },
        },
        {
          type: "week",
          count: 1,
          text: "1 неделя",
          events: {
            click: function () {
              setZoomLevel("1w");
            },
          },
        },
        {
          type: "month",
          count: 1,
          text: "1 месяц",
          events: {
            click: function () {
              setZoomLevel("1m");
            },
          },
        },
        {
          type: "year",
          count: 1,
          text: "1 год",
          events: {
            click: function () {
              setZoomLevel("1y");
            },
          },
        },
      ],
      selected: 0, // Set the default selected button
    },
  };

  return (
    <div id="AddedProductsChart" className="ChartStyles-50">
      <div>
        <button className="chart-button" onClick={() => setZoomLevel("1d")}>1 день</button>
        <button className="chart-button" onClick={() => setZoomLevel("1w")}>1 неделя</button>
        <button className="chart-button" onClick={() => setZoomLevel("1m")}>1 месяц</button>
        <button className="chart-button" onClick={() => setZoomLevel("1y")}>1 год</button>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}