import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';
import { getOrders, getProductItem } from '../../api/api';
import { IOrder, ICartItem } from '../../models';

accessibility(Highcharts);

export const OrderChart = () => {
  const [order, setOrder] = useState<IOrder[] | null>(null);
  const [products, setProducts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IOrder[] = await getOrders();
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (order && Array.isArray(order)) {
        const productQuantities: Record<string, number> = {};
        order.forEach((orderItem) => {
          orderItem.items.forEach((item) => {
            if (productQuantities[item.category]) {
              productQuantities[item.category] += item.quantity;
            } else {
              productQuantities[item.category] = item.quantity;
            }
          });
        });
        setProducts(productQuantities);
      }
    };

    fetchProducts();
  }, [order]);

  const categories = Object.keys(products);
  const seriesData = categories.map((category) => products[category]);

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Количество заказанных товаров по категориям',
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      title: {
        text: 'Количество',
      },
    },
    series: [
      {
        name: 'Товары',
        data: seriesData,
      },
    ],
    accessibility: {
      enabled: false,
    },
  };

  return (
    <div className="ChartStyles-100">
      {order && categories.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};