import React, {  lazy,Suspense } from "react";



import Loading from '../Loading/Loading'
const HomeFirst =lazy(()=>import('../Homefirst/Homefirst')) 
export default function Home() {
  
  return (
    <>
<Suspense fallback={<Loading/>}>
<HomeFirst/>
</Suspense>
         </>
  );
}
