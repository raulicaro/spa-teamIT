import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Pagination,
} from '@mui/material';

function DataList({ items, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  return (
    <Box mt={4}>
      {currentItems.map((item) => (
        <Paper key={item.id} elevation={2} className="datalist-paper" >
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2" className="datalist-description" >
            {item.description}
          </Typography>
          {onDelete && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(item.id)}
            >
              Remover
            </Button>
          )}
        </Paper>
      ))}

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
