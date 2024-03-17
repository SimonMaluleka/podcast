import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppContext } from '../../context/AppContext';
import { Typography } from '@mui/material';

export default function Search() {
    const { shows } = useAppContext()
  return (
    <Stack spacing={2} sx={{ width: 300, display: 'flex', flex:1}}>
        {/* <Typography variant='h5'>Search: </Typography> */}
        <Autocomplete
            freeSolo
            id="search"
            disableClearable
            options={shows.map((option) => option.title)}
            renderInput={(params) => (
            <TextField
                {...params}
                label="Search shows..."
                InputProps={{
                ...params.InputProps,
                type: 'search',
                }}
            />
            )}
        />
    </Stack>
  );
}