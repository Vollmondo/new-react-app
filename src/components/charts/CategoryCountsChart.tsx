import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ICategory, IProduct } from "../../models";
import "./ChartStyles.css";

export function CategoryCountsChart() {
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

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
        const productCategory = categories.find((category) => category.title === product.category);
        if (productCategory) {
          const categoryAndParents = [productCategory.title, ...getAllParentCategories(productCategory, categories)];
          categoryAndParents.forEach((category) => {
            counts[category] += 1;
          });
        }
      });

      setCategoryCounts(counts);
      setCategories(categories);
      setCategoriesLoaded(true);
      setSelectedCategories(categories.map((category) => category.title));
    }

    fetchData();
  }, []);

  const getAllParentCategories = (category: ICategory, categories: ICategory[]): string[] => {
    let parentCategories: string[] = [];
    if (category.parent) {
      const parentCategory = categories.find((c) => c.title === category.parent);
      if (parentCategory) {
        parentCategories.push(parentCategory.title);
        parentCategories = [...parentCategories, ...getAllParentCategories(parentCategory, categories)];
      }
    }
    return parentCategories;
  };

  const handleCategoryChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const category = event.currentTarget.value;
    if (category === "") {
      setSelectedCategories(categories.map((category) => category.title));
    } else {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((c) => c === category));
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const filteredCategoryCounts: Record<string, number> = {};
  selectedCategories.forEach((category) => {
    filteredCategoryCounts[category] = categoryCounts[category];
  });

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Количество товаров в каждой категории",
    },
    xAxis: {
      categories: Object.keys(filteredCategoryCounts) || [],
    },
    yAxis: {
      title: {
        text: "Количество",
      },
    },
    series: [
      {
        name: "Количество товаров",
        data: Object.values(filteredCategoryCounts) || [],
      },
    ],
  };

  return (
    <div className="ChartStyles-100">
      {categoriesLoaded ? (
        <div>
          <div>
            <button
              className="chart-button"
              onClick={handleCategoryChange}
              value=""
              style={{ fontWeight: selectedCategories.length === categories.length ? "bold" : "normal" }}
            >
              Все категории
            </button>
            {categories.map((category) => (
              <button
                className="chart-button"
                key={category._id}
                onClick={handleCategoryChange}
                value={category.title}
                style={{ fontWeight: selectedCategories.includes(category.title) ? "bold" : "normal" }}
              >
                {category.title}
              </button>
            ))}
          </div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      ) : (
        <div>Загрузка данных...</div>
      )}
    </div>
  );
}