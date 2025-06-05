"use client";
import { useGetNotesByScanIdQuery } from "@/lib/features/scans/scansAPI";
import { selectSelectedScanId,selectSelectedScan,selectNotes,setNotes } from '@/lib/features/scans/scansApiSlice';
import { useDispatch } from 'react-redux';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from "../Tools";

export const TopContent = () => {
  const selectedScanId = useSelector(selectSelectedScanId);
  const selectedScan = useSelector(selectSelectedScan);
  const notes = useSelector(selectNotes);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetNotesByScanIdQuery(selectedScanId || '', { skip: !selectedScanId });
  
  
  React.useEffect(() => {
    if (data) {
      dispatch(setNotes(data));
    }
  }, [data, dispatch]);
  
  if (isLoading) {
    return <div className="top-content" >Loading...</div>;
  }
   
  if (error) {
    if ('message' in error) {
      return <div className="top-content">Error: {error.message}</div>;
    } else if ('data' in error) {
      return <div className="top-content">Error: {error.data?(error.data as any).message:""}</div>;
    } else {
      return <div className="top-content">Error: Unknown error</div>;
    }
  } 
  
  

  return (
    <div className="top-content">
      <h1 className="text-2xl">Notes</h1>
      <div>
        {selectedScan?
        (
          <>
          {selectedScan.description}{formatDate(selectedScan.addTime)}
          </>
        ):""}
        
      </div>
      {notes ? (
        <ul className="list">
          {notes.map((note:any) => (
            <li className="list-item">
                <div className="list-column1">{note.scanId}</div>
                <div className="list-column2">{note.title}</div>
                <div className="list-column3">{note.content}</div>
            </li>
            
          ))}
        </ul>
      ) : (
        <p>No notes available</p>
      )}     
    </div>
  );
};