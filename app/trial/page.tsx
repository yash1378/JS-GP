// "use client"

import Client from '@/component/clientComponent'
import Server from '@/component/serverComponent'
import Loading from '../loading';
import { Suspense } from 'react';
export default async function Trial(){
    const data: string[] = ['item1', 'item2', 'item3'];
    
    return (
        <>
         <div className="display-flex justify-center">
            {/* <Client/> 
            <Suspense fallback={<div>Loading...</div>}><Server/></Suspense> */}
            <Client>
                <Suspense fallback={<Loading/>}><Server/></Suspense> 
            </Client>
         </div>
        </>
    )
}