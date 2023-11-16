"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import GroupChart1 from "@/components/partials/widget/chart/group-chart-1";
import SelectMonth from "@/components/partials/SelectMonth";
import Unidadestable from "@/components/partials/table/unidades-table";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";

const MostSales = dynamic(
  () => import("@/components/partials/widget/most-sales"),
  {
    ssr: false,
  }
);
const Dashboard = () => {
  const [filterMap, setFilterMap] = useState("usa");
  return (
    <div>
      <HomeBredCurbs title="Dashboard" />
      <div className="grid grid-cols-12 gap-5 mb-5">
       
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card bodyClass="p-4">
            <div className="grid md:grid-cols-3 col-span-1 gap-4">
              <GroupChart1 />
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        
        <div className="lg:col-span-12 col-span-12">
          <Card title="Unidades" headerslot={<SelectMonth />} noborder>
            <Unidadestable />
          </Card>
        </div>
        
      
      </div>
    </div>
  );
};

export default Dashboard;
