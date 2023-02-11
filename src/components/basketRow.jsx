import React, { useContext, useState, useEffect } from 'react';
import {Stack, TableRow, TableCell, Button, ButtonGroup } from '@mui/material'
import { Image } from 'mui-image'

import Ctx from '../Ctx';

export default ({name, pictures, cnt, price, id}) => {
	const {setBasket} = useContext(Ctx);
	const [n, setN] = useState(cnt);
	const [flag, setFlag] = useState(false);
    const increment = () => {
        setFlag(true);
        setN(n + 1);
    }
    const decrement = () => {
        setFlag(true);
        setN(n - 1);
    }
    useEffect(() => {
        if (flag) {
            setBasket(prev => {
                if (n) {
                    return prev.map(el => {
                        if (el.id === id) {
                            el.cnt = n;
                        }
                        return el;
                    })
                } else {
                    return prev.filter(el => el.id !== id);
                }
            })
        }
    }, [n]);
	return <TableRow hover>
		<TableCell> 
            <Stack direction="row" sx={{alignItems: 'center', gap: 2}}><Image src={pictures} width="50px" alt={name}/>
            {name}
            </Stack>
        </TableCell>
		<TableCell>
			<ButtonGroup
			disableElevation >
				<Button variant="contained" onClick={decrement}>-</Button>
				<Button variant="outlined" sx={{color: 'black'}}>{n}</Button>
				<Button variant="contained" onClick={increment}>+</Button>
			</ButtonGroup>

		</TableCell>
		<TableCell>{price * n} ₽</TableCell>
	</TableRow>
}
