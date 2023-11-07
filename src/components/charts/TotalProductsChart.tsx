import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ICategory, IProduct } from "../../models";
import "./ChartStyles.css";

export function TotalProductsChart() {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const productsResponse = await fetch("http://localhost:5000/products");
      const products: IProduct[] = await productsResponse.json();

      const categoriesResponse = await fetch("http://localhost:5000/categories");
      const categories: ICategory[] = await categoriesResponse.json();

      setTotalProducts(products.length);
    }

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Общее количество товаров",
    },
    xAxis: {
      categories: ["Общее количество"],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Количество",
      },
    },
    series: [
      {
        name: "Всего товаров",
        data: [totalProducts],
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
      },
    ],
  };

  return (
    <div id="TotalProductsChart" className="ChartStyles-50">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}