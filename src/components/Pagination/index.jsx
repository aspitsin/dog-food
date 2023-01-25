import React, {useState} from "react";
import "./style.css";

export default ({hook})=>{
    const max  = hook.maxPage;
    const current = hook.currentPage;
    const pages = [];
    for (let i = 0; i < max; i++){
        pages.push(i + 1);
    }
    return <>
            <div>
            <button className="btn page" disabled={current === 1} onClick={hook.previous}>Пред</button>
                {pages.map(p => <button className=""  
                key={p}
                style={{
                    backgroundColor: p === current && "#222",
                    color: p === current && "yellow"
                }}
                onClick={e => {hook.step(p)}}
                >{p}</button>)}
                 <button className="btn page" disabled={current === max} onClick={hook.next}>После</button>
            </div>
    </>
}