import React from "react";
import { Box, Button } from "@mui/material";

export default ({hook})=>{
	const max  = hook.maxPage;
	const current = hook.currentPage;
	const pages = [];
	for (let i = 0; i < max; i++){
		pages.push(i + 1);
	}
	return <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
			<Box>
				<Button variant="contained" disabled={current === 1} onClick={hook.previous} sx={{mx: '2px'}}>Пред</Button>
					{pages.map(p => <Button 
					key={p}
					sx={{
						backgroundColor: p === current && "primary.main",
						color: p === current && "white", mx: '2px'
					}}
					onClick={e => {hook.step(p)}}
					>{p}</Button>)}
				<Button variant="contained" disabled={current === max} onClick={hook.next} sx={{mx: '2px'}}>После</Button>
			</Box>
		</Box>
}