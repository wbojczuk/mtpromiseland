import React from "react";
export default function LoadingAnim(){
    return(
        <div id="loadingAnim">
            <svg xmlns="http://www.w3.org/2000/svg" style={{margin: "auto", background: "none", display: "block", "shapeRendering": "auto"}} width="204px" height="204px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="84" cy="50" r="10" fill="#bbc8b1">
                <animate attributeName="r" repeatCount="indefinite" dur="0.7575757575757576s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
                <animate attributeName="fill" repeatCount="indefinite" dur="3.0303030303030303s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#bbc8b1;#bbc8b1;#bbc8b1;#bbc8b1;#bbc8b1" begin="0s"></animate>
            </circle><circle cx="16" cy="50" r="10" fill="#bbc8b1">
            <animate attributeName="r" repeatCount="indefinite" dur="3.0303030303030303s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
            <animate attributeName="cx" repeatCount="indefinite" dur="3.0303030303030303s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
            </circle><circle cx="50" cy="50" r="10" fill="#bbc8b1">
            <animate attributeName="r" repeatCount="indefinite" dur="3.0303030303030303s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7575757575757576s"></animate>
            <animate attributeName="cx" repeatCount="indefinite" dur="3.0303030303030303s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7575757575757576s"></animate>
            </circle><circle cx="84" cy="50" r="10" fill="#bbc8b1">
            <animate attributeName="r" repeatCount="indefinite" dur="3.0303030303030303s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.5151515151515151s"></animate>
            <animate attributeName="cx" repeatCount="indefinite" dur="3.0303030303030303s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.5151515151515151s"></animate>
            </circle><circle cx="16" cy="50" r="10" fill="#bbc8b1">
            <animate attributeName="r" repeatCount="indefinite" dur="3.0303030303030303s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.2727272727272725s"></animate>
            <animate attributeName="cx" repeatCount="indefinite" dur="3.0303030303030303s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.2727272727272725s"></animate>
            </circle>
            </svg>
        </div>
    )
}