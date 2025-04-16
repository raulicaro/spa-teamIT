import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Modal,
    Fade,
    Backdrop,
} from '@mui/material';
import '../styles.css';


export function ModalItem({ open, setOpen, handleAdd, newItem, setNewItem }) {

    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box className="dashboard-modal">
                    <Typography variant="h6" className="dashboard-modal-title">
                        {handleAdd !== undefined ? 'New Item' : newItem.id}
                    </Typography>
                    <form onSubmit={handleAdd}>
                        <TextField
                            label="Title"
                            fullWidth
                            className="dashboard-modal-input"
                            margin="normal"
                            value={newItem.title}
                            disabled={handleAdd === undefined}
                            onChange={(e) =>
                                setNewItem({ ...newItem, title: e.target.value })
                            }
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            margin="normal"
                            value={newItem.description}
                            disabled={handleAdd === undefined}
                            className="dashboard-modal-input"
                            onChange={(e) =>
                                setNewItem({ ...newItem, description: e.target.value })
                            }
                        />
                        {handleAdd !== undefined && <Box className="dashboard-modal-actions">
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button variant="contained" type="submit">
                                Save
                            </Button>
                        </Box>}
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
}

export default ModalItem;


