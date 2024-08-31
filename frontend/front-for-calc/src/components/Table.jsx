import { useSelector } from 'react-redux';
import { homeSelector } from '../store/slices/HomeSlice.jsx';
import { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

export default function DataTable() {
    const token = localStorage.getItem('token');
    const { array } = useSelector(homeSelector);

    useEffect(() => {
        console.log(array);
    }, [array]);

    if (!!token && array.length !== 0) {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>X</TableCell>
                            <TableCell>Y</TableCell>
                            <TableCell>R</TableCell>
                            <TableCell>Result</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {array.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.x}</TableCell>
                                <TableCell>{item.y}</TableCell>
                                <TableCell>{item.r}</TableCell>
                                <TableCell>{item.result.toString()=="true" ? "Попадание":"Промах"}</TableCell>
                            </TableRow>
                        )).reverse()}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return (
            <Typography variant="h6" align="center" sx={{ marginTop: '20px' }}>
                Нет доступных попыток
            </Typography>
        );
    }
}
