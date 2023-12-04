import React from "react";
import WAVE from './images/svgviewer-png-output.png'
import SYNCFOOTER from './images/Sync-Footer.png'
import APPSTORE from './images/download-on-the-app-store-apple-logo-svgrepo-com.svg'
import SYNCMOBILE from './images/Sync-Mobile.png'
import SYNCWEB from './images/Sync-Web.png'
import SYNC from './images/SyncSpace-mint.png'

function Landing() {

    const styles = {
        waves: {
            backroundImage: `url(${WAVE})`,
            backgroundRepeat: 'no-repeat'
        }
      }

  return (

    // Container
    <div>

        
        {/* <div className="bg-dark h-20 w-full flex justify-between">
        <div className="flex items-center p-4 ml-6">
            <img style={{width: "60px", height: "60px"}} src={SYNC}/>
            <p className='p-3 items-center text-white font-semibold text-xl'>SyncSpace</p>
        </div>
        <div className="flex items-center mr-6">
            {/* log in */}
            {/* <button className="text-white">Log In</button> */}
            {/* sign up */}
            {/* <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Get Started</button> */}
        {/* </div> */}
        {/* // </div> */} 

        <div className="bg-dark h-20"></div>

        <div>
            {/* Body */}
            <div style={{ backgroundImage: `url(${WAVE})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}} className="flex justify-between pb-20">
            <div>
                    <h1 className="font-semibold text-3xl pl-56 text-white">Elevate Your Workflow</h1>
                    <p className="text-white pl-56 pt-5">Sync your ideas and empower your team's creativity.</p>
                    <p className="text-white pl-56 pt-5">Get started today for free!</p>
                    <div className="pl-52">
                    <div className="flex">
                        <div className="pt-5">
                        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Sign Up for Web</button>
                        </div>
                        <div>
                            <img className="pb-20" style={{width: "120px", height: "200px"}} src={APPSTORE}/>
                        </div>
                    </div>
                    <p className="text-dark text-3xl pt-20">Visualize Your Goals and</p>
                    <p className="font-semibold text-4xl pt-5">Enhance with AI</p>
                    </div>
            </div>
            <div className="pr-96">
                <img style={{height: "550px"}} src={SYNCMOBILE}/>
            </div>
            </div>

            <div className="bg-landing pb-20">
                <div className="flex justify-center text-dark">
                    <h2 className="text-3xl font-semibold pt-20">Optimize Team Productivity and Collaboration</h2>
                </div>

                <div className="flex justify-between">

                <div className="flex justify-start flex-col pl-56 pt-20 space-y-4">
                    <div className="bg-white flex justify-between items-center shadow-md shadow-dark rounded" style={{width: "250px", height: "80px"}}>
                        <div style={{height: "80px", width: "10px"}} className="bg-primary"></div>
                        <a className="font-semibold text-lg pr-12" href="#">&hearts; Organizations</a>
                    </div>
                    <div className="flex justify-center items-center rounded" style={{width: "250px", height: "80px"}}>
                        <a className="font-semibold text-lg" href="#">&hearts; Boards</a>
                    </div>
                    <div className="flex justify-center items-center rounded" style={{width: "250px", height: "80px"}}>
                        <a className="font-semibold text-lg" href="#">&hearts; Lists</a>
                    </div>
                    <div className="flex justify-center items-center rounded" style={{width: "250px", height: "80px"}}>
                        <a className="font-semibold text-lg" href="#">&hearts; AI</a>
                    </div>
                </div>

                <div className="pt-20 pr-56">
                    <div style={{width: "600px", height: "400px"}} className="bg-white shadow-md shadow-dark rounded flex flex-col items-center justify-center space-y-4">
                        <div>
                            <img style={{height: "200px", width: "450px"}} src={SYNCWEB}/>
                        </div>
                        <div style={{width: "450px"}}>
                            <p className="">Organizations serve as the foundation that enables users to efficiently manage multiple boards within a unified and collaborative space. These organizations act as containers for boards, offering a structured environment where teams can oversee a range of projects, tasks, and objectives.</p>
                        </div>
                    </div>

                </div>

                </div>

            </div>

        </div>

        <div>
            {/* Footer */}
            {/* <div style={{ backgroundImage: `url(${SYNCFOOTER})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', width: "100%"}} className="">
                <div>
                    <p>ddhdh</p>
                </div>
            </div> */}
            <div style={{ backgroundImage: `url(${SYNCFOOTER})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}} className="flex pb-20 w-full">
            
            </div>
            
        </div>

    </div>
  );
}

export default Landing;