import React from 'react';

const LogoClouds = () => {
    // Array com os URLs dos logotipos das marcas
    const logos = [
        '/assets/bmw.png',
        '/assets/lamboLogo.png',
        '/assets/lexus.png',

        '/assets/logo10.png',

        '/assets/mercedes.png',
        '/assets/ferrariLogo.png',
        '/assets/logo9.png',

    ];

    return (
        /*<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="bg-black flex justify-center gap-28  items-center rounded-lg p-4 " style={{ backgroundColor: '#2E2E2E' }}>
                 <img src={logos[0]} alt="Logo 1" className="h-12 w-12 object-contain" />
                 <img src={logos[1]} alt="Logo 2" className="h-12 w-12 object-contain" />
                 <img src={logos[2]} alt="Logo 3" className="h-12 w-12 object-contain" />
                 <div className=" bg-white rounded-lg p-2">
                     <img src={logos[3]} alt="Logo 4" className="h-12 w-12 object-contain" />
                 </div>
 
                 <img src={logos[4]} alt="Logo 5" className="h-12 w-12 object-contain" />
                 <img src={logos[5]} alt="Logo 6" className="h-12 w-12 object-contain" />
                 <img src={logos[6]} alt="Logo 7" className="h-12 w-12 object-contain" />
 
             </div>
         </div>*/
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-black grid grid-cols-logos justify-items-center items-center rounded-lg p-4" style={{ backgroundColor: '#2E2E2E' }}>
        <img src={logos[0]} alt="Logo 1" className="h-12 w-12 object-contain" />
        <img src={logos[1]} alt="Logo 2" className="h-12 w-12 object-contain" />
        <img src={logos[2]} alt="Logo 3" className="h-12 w-12 object-contain" />
        <div className="bg-white rounded-lg p-2 hidden sm:block">
            <img src={logos[3]} alt="Logo 4" className="h-12 w-12 object-contain" />
        </div>
        <img src={logos[4]} alt="Logo 5" className="h-12 w-12 object-contain" />
        <img src={logos[5]} alt="Logo 6" className="h-12 w-12 object-contain" />
        <img src={logos[6]} alt="Logo 7" className="h-12 w-12 object-contain" />
    </div>
</div>





    );
};

export default LogoClouds;
