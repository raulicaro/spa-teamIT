import React, { useState } from 'react';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Paper,
    Typography,
    IconButton,
    Pagination,
    Grid,
    Container
} from '@mui/material';
import { Delete, Info } from '@mui/icons-material';
import { ModalItem } from './Modal';

function DataList({ items, onDelete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [newItem, setNewItem] = useState({ title: '', description: '', id: '' });
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (_, value) => {
        setCurrentPage(value);
    };

    const handleOpen = (id) => {
        id && setNewItem(items.find((item) => item.id === id));
        setOpen(true);
    };

    const handleDeleteClick = (id) => {
        console.log(id);
        setItemToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete && onDelete) {
            onDelete(itemToDelete);
        }
        setDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    return (
        <>
            <Box mt={4}>
                <Grid container spacing={2} justifyContent="center">
                    {currentItems.map((item) => (
                        <Grid key={item.id}>
                            <Paper key={item.id} elevation={2} className="datalist-paper" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body2" className="datalist-description" sx={{ mb: 1 }} >
                                    {item.description}
                                </Typography>
                                <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <IconButton
                                        variant="outlined"
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1 }}
                                        onClick={() => handleOpen(item.id)}
                                    >
                                        <Info />
                                    </IconButton>
                                    {onDelete && (
                                        <IconButton
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteClick(item.id)}
                                            size='small'
                                        >
                                            <Delete />
                                        </IconButton>
                                    )}
                                </Container>
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
            <ModalItem
                open={open}
                setOpen={setOpen}
                newItem={newItem}
                setNewItem={setNewItem}
            />
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this item? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


export default DataList;
