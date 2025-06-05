"use client";
import { TopContent } from "../topcontent/TopContent";
import { BottomContent } from "../bottomcontent/BottomContent";

export const Mainpanel = () => {
    

  return (
     
    <div className="main-panel" >
      <h1 className="text-2xl">Mainpanel</h1>
        <TopContent/>
        <BottomContent/>
    </div>
     
  );
};
