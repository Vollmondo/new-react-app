import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ICategory, IProduct } from "../../models";

export function CategoryCountsChart() {
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    async function fetchData() {
      const productsResponse = await fetch("http://localhost:5000/products");
      const products: IProduct[] = await productsResponse.json();

      const categoriesResponse = await fetch("http://localhost:5000/categories");
      const categories: ICategory[] = await categoriesResponse.json();

      const counts: Record<string, number> = {};
      categories.forEach((category) => {
        counts[category.title] = 0;
      });
      products.forEach((product) => {
        counts[product.category]++;
      });

      setCategoryCounts(counts);
    }

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Количество товаров в каждой категории",
    },
    xAxis: {
      categories: Object.keys(categoryCounts),
    },
    yAxis: {
      title: {
        text: "Количество",
      },
    },
    series: [
      {
        name: "Количество товаров",
        data: Object.values(categoryCounts),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}