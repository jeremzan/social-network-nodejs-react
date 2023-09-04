import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Logo from "./Logo.png";

const BetOfTheWeek = () => {
    const navigate = useNavigate()
    function createData(event, user, time, odds, betAmount) {
        return { event, user, time, odds, betAmount };
    }
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    const rows = [
        createData("אנה זק - נועה קירל", "Hidden", "3:21 PM", "6.50", "2000.00000000"),
        createData("יחלחי - יתושי ", "Hidden", "3:21 PM", "8.53", "10000.00000000"),
        createData("France - Spain", "Hidden", "3:20 PM", "1.89", "38418.00000000"),
        createData("Medvedev, Daniil - De Minaur, Alex", "Hidden", "3:20 PM", "1.40", "3350.00000000"),
        createData("Ilkel, Cem - Mpetshi Perricard, Giovanni", "Hidden", "3:20 PM", "1.80", "20000.00000000"),
        createData("Stearns, Peyton - Vondrousova, Marketa", "Hidden", "3:20 PM", "1.46", "40710.80024939"),
        createData("England - Australia", "Hidden", "3:18 PM", "1.58", "0.31300000"),
        createData("Thailand - Vietnam", "Hidden", "3:17 PM", "1.75", "0.62811999"),
        createData("Alcaraz Garfia, Carlos - Arnaldi, Matteo", "Hidden", "3:17 PM", "1.02", "R$15,000.00"),
        createData("France - Spain", "Hidden", "3:16 PM", "1.52", "CA$2,500.00"),
        createData("Fake Natty - TSM", "Hidden", "3:15 PM", "1.01", "CA$1,500.00"),
        createData("Alcaraz Garfia, Carlos - Arnaldi, Matteo", "Hidden", "3:15 PM", "1.02", "1.40000000"),
        createData("Zund, Serafin - Jeran, Aljaz", "Hidden", "3:11 PM", "1.30", "0.06260160"),
        createData("Stearns, Peyton - Vondrousova, Marketa", "Hidden", "3:09 PM", "1.16", "9443.92533693"),
        createData("France - Spain", "Hidden", "3:07 PM", "15.28", "2200.00000000"),
        createData("Cengiz, Berfu - Akugue Noha, Noma", "Hidden", "3:05 PM", "1.80", "0.04171280"),
        createData("France - Spain", "Hidden", "3:04 PM", "1.96", "CA$2,500.00"),
        createData("Fonio, Giovanni - Agamenone, Franco", "Hidden", "3:03 PM", "1.30", "50529.60250627"),
        createData("France - Spain", "Hidden", "3:03 PM", "10.50", "2202.19999780"),
        createData("France - Spain", "Hidden", "3:02 PM", "2.74", "1003.00199900"),
        createData("Draper, Jack - Rublev, Andrey", "Hidden", "3:00 PM", "1.08", "0.07157146"),
        createData("Kasatkina, Daria - Sabalenka, Aryna", "Hidden", "2:58 PM", "1.31", "R$15,000.00"),
        createData("Fonio, Giovanni - Agamenone, Franco", "Hidden", "2:57 PM", "1.03", "49072.32243399"),
        createData("Alcaraz Garfia, Carlos - Arnaldi, Matteo", "Hidden", "2:57 PM", "1.01", "1178.00000000"),
        createData("England - Australia", "Hidden", "2:56 PM", "1.61", "1.50000000"),
        createData("England - Australia", "Hidden", "2:56 PM", "1.85", "1.50000000"),
        createData("Swansea City - Hull City", "Hidden", "2:55 PM", "1.01", "0.03991524"),
        createData("Jacquet, Kyrian - Passaro, Francesco", "Hidden", "2:53 PM", "1.75", "2000.00000000"),
        createData("Jabeur, Ons - Zheng, Qinwen", "Hidden", "2:51 PM", "2.15", "7000.00000000"),
        createData("Alcaraz Garfia, Carlos - Arnaldi, Matteo", "Hidden", "2:51 PM", "2.05", "1018.00000000"),
        createData("Shin, Jiho - Ayala Serra, Nora", "Hidden", "2:50 PM", "1.90", "9000.00000000"),
        createData("Swansea City - Hull City", "Hidden", "2:50 PM", "1.01", "1156.23804100"),
        createData("Murawski, Michal - Jarocki, Lukasz", "Hidden", "2:49 PM", "1.85", "28.99641910"),
        createData("England - Australia", "Hidden", "2:49 PM", "1.85", "1.00000000"),
        createData("France - Spain", "Hidden", "2:48 PM", "2.09", "10000.00000000"),
        createData("Lotte Giants - Doosan Bears", "Hidden", "2:48 PM", "1.60", "1.18000000"),
        createData("LDU Quito - Guayaquil City FC", "Hidden", "2:47 PM", "1.20", "R$15,000.00"),
        createData("Fake Natty - TSM", "Hidden", "2:45 PM", "1.40", "0.26640901"),
        createData("Pigossi, Laura - Sramkova, Rebecca", "Hidden", "2:45 PM", "1.75", "1584.00000000"),
        createData("Monday, Johannus - Zuk, Kacper", "Hidden", "2:45 PM", "1.22", "1.00386003"),
    ];


    return (
        <Container>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Button
                    variant="contained"
                    sx={{ borderRadius: "20px" }}
                    onClick={() => navigate("/")}
                >
                    Back Home
                </Button>
                <img
                    src={Logo}
                    alt="Logo"
                    style={{ width: "200px", marginLeft: "auto" }}
                />
            </div>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Event</StyledTableCell>
                            <StyledTableCell align="right">User</StyledTableCell>
                            <StyledTableCell align="right">Time</StyledTableCell>
                            <StyledTableCell align="right">Odds</StyledTableCell>
                            <StyledTableCell align="right">Bet Amount</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {row.event}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.user}</StyledTableCell>
                                <StyledTableCell align="right">{row.time}</StyledTableCell>
                                <StyledTableCell align="right">{row.odds}</StyledTableCell>
                                <StyledTableCell align="right">{row.betAmount}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>


    );
}
export default BetOfTheWeek;
