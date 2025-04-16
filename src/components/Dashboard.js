import React, { useEffect, useState, Suspense } from 'react';
import { fetchData, addItem, deleteItem } from '../Api/mockApi';
import { ModalItem } from './Modal';
import { Add } from '@mui/icons-material';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
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

return (
    <Container maxWidth="sm" className="dashboard-container">
        <Paper elevation={3} className="dashboard-paper">
            <Box className="dashboard-header">
                <Typography variant="h5">Dashboard</Typography>
                <Button variant="outlined" color="error" onClick={onLogout}>
                    Logout
                </Button>
            </Box>
            <Container className="dashboard-search-container">
                <TextField
                    fullWidth
                    label="Search by title"
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
                    sx={{ml:5}}
                >
                    Item
                </Button>
            </Container>            

            <Suspense fallback={<Typography className="dashboard-loading">Loading...</Typography>}>
                <DataList items={filtered} onDelete={handleDelete} />
            </Suspense>
        </Paper>
        <ModalItem
            open={open}
            setOpen={setOpen}
            handleAdd={handleAdd}
            newItem={newItem}
            setNewItem={setNewItem}
        />
    </Container>
);
}

export default Dashboard;