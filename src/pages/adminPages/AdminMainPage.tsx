import React from "react";
import { AdminBasePage } from "./adminBasePage/AdminBasePage";
import { TotalProductsChart } from "../../components/charts/CardChart";
import { CategoryCountsChart } from "../../components/charts/CategoryCountsChart";
import { AddedProductsChart } from "../../components/charts/AddedProductsChart";

export function AdminMainPage(){
    return(
        <>
            <AdminBasePage>
                <TotalProductsChart />
                <CategoryCountsChart />
                <AddedProductsChart />
            </AdminBasePage>
        </>
    )
}