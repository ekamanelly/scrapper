import React from 'react';

// import 

const Preloader = (props) => {   
    return ( 
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <div className="preloader_wraper" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div class="preloader-wrapper small active">
                    <div class="spinner-layer spinner-green-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Preloader;