import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    Pagination,
    Grid
} from '@mui/material';
import { Delete } from '@mui/icons-material';


function DataList({ items, onDelete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (_, value) => {
        setCurrentPage(value);
    };

    return (
        <Box mt={4}>
            <Grid container spacing={2}>
                {currentItems.map((item) => (
                    <Grid item xs={12} md={4} key={item.id}>
                        <Paper key={item.id} elevation={2} className="datalist-paper" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography variant="body2" className="datalist-description" sx={{ mb: 1 }} >
                                {item.description}
                            </Typography>
                            {onDelete && (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<Delete />}
                                    onClick={() => onDelete(item.id)}
                                    size='small'
                                >
                                    Remover
                                </Button>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Box>
        </Box>
    );
}


export default DataList;
