import React from "react";
import InfoCards from "./InfoCards";
import { Separator } from "../ui/separator";
import ChartDemo from "./Charts";

const Dashboard = () => {
  return (
    <div className="px-4 z-20 py-6">
      <div>
        <InfoCards />
      </div>
      <div className="my-10">
        <Separator />
      </div>
      <div>
        <ChartDemo />
      </div>
    </div>
  );
};

export default Dashboard;
