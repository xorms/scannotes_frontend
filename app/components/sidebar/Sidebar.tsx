"use client";
import { useGetScansQuery } from "@/lib/features/scans/scansAPI";
import { setSelectedScanId ,setSelectedScan } from '@/lib/features/scans/scansApiSlice';
import { useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { Scan } from "@/app/types/Scan";
import { formatDate } from "../Tools";

export const Sidebar = () => {
   const { data, isLoading, error } = useGetScansQuery();
   const dispatch = useDispatch();

  if (isLoading) {
    return <div className="sidebar" >Loading...</div>;
  }

  if (error) {
    if ('message' in error) {
        return <div className="sidebar" >Error: {error.message}</div>;
    } else if ('data' in error) {
        return <div className="sidebar" >Error: {(error.data as any).message}</div>;
    } else {
        return <div className="sidebar" >Error: Unknown error</div>;
    }
  }

  const navigateToNotes=(Scan: Scan)=>{
    dispatch(setSelectedScan(Scan));
    dispatch(setSelectedScanId(Scan.scanId));
  };

  return (
    <>
    <div className="sidebar"  >
      <h1 className="text-2xl">Scans List </h1>
      
       {data ? (
        <ul className="list">
            {data.map((scans) => (
            <li className="list-item">
                 <div className="list-column1">{scans.scanId}</div>
                 <div className="list-column2">{scans.description}</div>
                 <div className="list-column3">{formatDate(scans.addTime)}</div>
                 <div className="list-column4"><Button className="bg-gray-500" onClick={() => navigateToNotes(scans)} >notes</Button></div>
            </li>
            ))}
        </ul>
        ) : (
        <ul className="list">No data available</ul>
        )}
      
    </div>
    </>
  );
};
