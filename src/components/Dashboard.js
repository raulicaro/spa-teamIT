import React, { useEffect, useState, Suspense } from 'react';
import { fetchData, addItem, deleteItem } from '../Api/mockApi';
import { Add } from '@mui/icons-material';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
const DataList = React.lazy(() => import('./Datalist'));


function Dashboard({ onLogout }) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [newItem, setNewItem] = useState({ title: '', description: '' });
  const [open, setOpen] = useState(false);

  const loadData = () => {
    fetchData().then((items) => {
      setData(items);
      setFiltered(items);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filteredItems = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredItems);
  }, [search, data]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.title.trim()) return;
    await addItem(newItem);
    setNewItem({ title: '', description: '' });
    loadData();
    setOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    loadData();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

return (
    <Container maxWidth="sm" className="dashboard-container">
        <Paper elevation={3} className="dashboard-paper">
            <Box className="dashboard-header">
                <Typography variant="h5">Dashboard</Typography>
                <Button variant="outlined" color="error" onClick={onLogout}>
                    Sair
                </Button>
            </Box>

            <TextField
                fullWidth
                label="Buscar por título"
                variant="outlined"
                margin="normal"
                className="dashboard-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Button
                variant="contained"
                className="dashboard-add-button"
                onClick={handleOpen}
                startIcon={<Add />}
            >
                Adicionar Item
            </Button>

            <Suspense fallback={<Typography className="dashboard-loading">Carregando...</Typography>}>
                <DataList items={filtered} onDelete={handleDelete} />
            </Suspense>
        </Paper>

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
                        Novo Item
                    </Typography>
                    <form onSubmit={handleAdd}>
                        <TextField
                            label="Título"
                            fullWidth
                            className="dashboard-modal-input"
                            margin="normal"
                            value={newItem.title}
                            onChange={(e) =>
                                setNewItem({ ...newItem, title: e.target.value })
                            }
                        />
                        <TextField
                            label="Descrição"
                            fullWidth
                            margin="normal"
                            value={newItem.description}
                            className="dashboard-modal-input"
                            onChange={(e) =>
                                setNewItem({ ...newItem, description: e.target.value })
                            }
                        />
                        <Box className="dashboard-modal-actions">
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button variant="contained" type="submit">
                                Adicionar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Fade>
        </Modal>
    </Container>
);
}

export default Dashboard;