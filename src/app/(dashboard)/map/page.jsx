"use client";
import Card from "@/components/ui/Card";
import dynamic from "next/dynamic";
const BasicMap = dynamic(() => import("@/components/partials/map/basic-map"), {
  ssr: false,
});
const MarkerMap = dynamic(
  () => import("@/components/partials/map/marker-map"),
  {
    ssr: false,
  }
);

const MapPage = () => {
  return (
    <div className=" space-y-5">
      <Card title="Mapa" subtitle="Mapa de unidades">
        <BasicMap />
      </Card>
    </div>
  );
};

export default MapPage;
