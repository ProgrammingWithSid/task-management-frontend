import React from "react";
import { RotatingLines } from "react-loader-spinner";

export function FullPageLoader() {
    return (
        <div
            className="fullpage-loader-container">
            <RotatingLines
                strokeColor="#FEA15D"
                strokeWidth="4"
                animationDuration="1"
                width="40"
                visible={true}
            />
        </div>
    )
}