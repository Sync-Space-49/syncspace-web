import React from "react";

function Landing() {
  return (
    // Container
    <div>

        {/* Header 
                I started styling this but the rest of the sections are just skeleton
        */}
        <div className="bg-dark h-20 w-full flex justify-between">
        <div className="flex items-center p-4 ml-6">
            <img className="text-center" src="../Nav/SyncSpace-mint.png"/>
            <p className='p-3 items-center text-white'>SyncSpace</p>
        </div>
        <div className="flex items-center mr-6">
            {/* log in */}
            <button className="text-white">Log In</button>
            {/* sign up */}
            <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Get Started</button>
        </div>
        </div>
        <div>
            {/* Move svg to body maybe */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#253646" fill-opacity="1" d="M0,160L60,181.3C120,203,240,245,360,261.3C480,277,600,267,720,224C840,181,960,107,1080,80C1200,53,1320,75,1380,85.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        </div>

        <div>
            {/* Body */}
            <div>
            <p>Visualize Your Goals and</p>
            <p>Enhance with AI</p>
            </div>

            <div>
                <h2>Optimize Team Productivity and Collaboration</h2>
            </div>

            {/* Tabs showcase */}
            <div>
                <div className="flex flex-col">
                    <a className="font-semibold" href="#">&hearts; Organizations</a>
                    <a className="font-semibold" href="#">&hearts; Boards</a>
                    <a className="font-semibold" href="#">&hearts; Lists</a>
                    <a className="font-semibold" href="#">&hearts; AI</a>
                </div>
            </div>
        </div>

        <div>
            {/* Footer */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#253646" fill-opacity="1" d="M0,96L60,85.3C120,75,240,53,360,64C480,75,600,117,720,138.7C840,160,960,160,1080,154.7C1200,149,1320,139,1380,133.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        </div>

    </div>
  );
}

export default Landing;