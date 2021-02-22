




import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { PostContent } from '../store/PostProvider';
import Preloader from './Preloader';



const Landing = (props) => {
    const [jobs,setJobs] = useContext(PostContent)
    const [laoded,setLoaded] = useState(false);

   const  getJobs = async ()=>{
        const { data } = await axios('http://localhost:2000/page');
        console.log(data)
       if (data && data.links.length>0){
           setJobs(data.links)
           setLoaded(true);
       }
    }

    useEffect(()=> {
        getJobs()
     
    },[])

    const formattext = (text)=>{
        const [com, title] = text.split('com/jobs/');
        const titleWithoutDash = title.replace(/-/g, ' ' )
        console.log()
        return titleWithoutDash

    }
    return ( 
        <>
            <div style={{ position: 'absolute', width: '100%', minHeight: '100vh' }}>
                {/* <div className="container"> */}
                    {laoded ?
                    <ul className="collection">
                            {jobs.map(x => <li className='collection-item black' >
                                <span><i class="material-icons">done</i></span>
                                <span><i className="material-icons">file_download</i></span>
                                <span><i className="material-icons red">error</i></span>
                                <span style={{paddingLeft:'1rem'}}>{formattext(x)}</span>
                            </li>)}

                    </ul>
                      


                        : <Preloader />}
                {/* </div> */}
            

         </div>
        </>
     );
}
 
export default Landing;