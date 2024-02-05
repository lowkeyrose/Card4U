import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext, token } from '../App';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 80, sortable: true },
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'business', headerName: 'Business', width: 170, format: (value) => value.toString() },
  {
    field: 'manage',
    headerName: 'Manage',
    width: 170,
    sortable: false,
    filterable: false,
    renderCell: (params) => <ManageCell {...params} />,
  },
];

function ManageCell(params) {
  const { row } = params;
  const { setLoading, snackbar } = useContext(GeneralContext);

  const deleteClient = (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) {
      return;
    }
    setLoading(true);
    fetch(`https://api.shipap.co.il/admin/clients/${id}?token=${token}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(() => {
        snackbar("Client removed successfully");
      })
      .catch(err => {
        console.log(err);
        snackbar("Failed to delete client.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <IconButton className='trash-icon' onClick={() => deleteClient(row.id)} aria-label="delete">
        <DeleteIcon style={{ color: "grey" }} />
      </IconButton>

      <IconButton className='edit-icon' aria-label="edit">
        <Link to={`/admin/clients/${row.id}`} style={{ textDecoration: 'none', color: 'grey', height: '24px' }}><EditIcon /></Link>
      </IconButton>
    </div>
  );
}

export default function ClientManagement() {
  const { snackbar } = useContext(GeneralContext);
  const [clients, setClients] = useState([]);

  // fetch all clients
  useEffect(() => {
    fetch(`https://api.shipap.co.il/admin/clients?token=${token}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setClients(data);
      })
      .catch(err => {
        console.log(err);
        snackbar("Failed to get clients.");
      });
  }, [snackbar]);

  return (
    <div style={{ minHeight: 400, width: '100%' }}>
      <Typography component="h1" sx={{ fontFamily: "Pacifico, cursive", fontWeight: 600, fontSize: 48, margin: "30px 0 20px 0", paddingBottom: "10px", textAlign: 'center' }}>
        Client Management
      </Typography>
      <DataGrid
        rows={clients}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection
      />
    </div>
  );
}
