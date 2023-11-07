import React from "react";
import { AdminBasePage } from "./adminBasePage/AdminBasePage";
import { TotalProductsChart } from "../../components/charts/TotalProductsChart";
import { CategoryCountsChart } from "../../components/charts/CategoryCountsChart";
import { AddedProductsChart } from "../../components/charts/AddedProductsChart";
import { OrderChart } from "../../components/charts/OrderChart";
import { OrderPieChart } from "../../components/charts/OrderPieChart";

export function AdminMainPage(){
    return(
        <>
            <AdminBasePage>
                <div className="AdminMainPage">
                    <TotalProductsChart />
                    <AddedProductsChart />
                    <CategoryCountsChart />
                    <OrderChart />
                    <OrderPieChart />
                </div>
            </AdminBasePage>
        </>
    )
}