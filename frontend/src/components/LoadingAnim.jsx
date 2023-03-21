import React from "react";
export default function LoadingAnim(){
    return(
        <><div id="loadingAnim">
            <lottie-player id="loadingAnimPlayer" src="img/loading_anim.json" background="transparent" speed="2"  loop autoplay></lottie-player>
        </div>
        </>
    )
}