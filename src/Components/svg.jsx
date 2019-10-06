import React from 'react';

const SVGIcon = ({ icon }) => {
    let fills = [];
    let paths = icon.path.split(",");
    fills = icon.fill !== null ? icon.fill.split(",") : fills.push('#000000');

    return (
        <svg id={icon.iconClass} viewBox={icon.viewBox}>
            <title>{icon.title}</title>
            {
                paths.map((p, i) => {
                    let f = fills[i] !== undefined ? fills[i] : icon.fill
                    return <path key={i} fill={f} d={p}></path>
                })
            }
        </svg>      
    );
}

export default SVGIcon;