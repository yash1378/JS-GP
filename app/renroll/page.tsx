
import Enroll from "@/components/renroll/client";
import Loading from "./loading"
import { Suspense } from "react"

interface StudentData {
    _id: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    class: string;
    sub: string;
    mentor: string;
  }

  
// as these are server components in this caching doesn't work
async function getData() {
    const res = await fetch('https://gp-backend-u5ty.onrender.com/api/data/',{
      next:{
        revalidate:0
      }
    })
  
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

// as these are server components in this caching doesn't work
async function getAdditionalData() {
    const response2 = await fetch("https://gp-backend-u5ty.onrender.com/api/renrollData",{
      next:{
        revalidate:0
      }
    })
  
  
    if (!response2.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return response2.json()
  }




  
  async function MentServer(){
      const data:StudentData[] = await getData();
      const d:any[] = await getAdditionalData();

      return (
          <>
          <Suspense fallback={<Loading/>}><Enroll data={data} d={d}/></Suspense>
          </>
      )
  }
  
  
  export default MentServer;
  
  
  