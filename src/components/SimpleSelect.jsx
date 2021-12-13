import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function SimpleSelect(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box sx={{ width: 135  }}>
      <FormControl fullWidth>
        <InputLabel id="time-id">{props.title}</InputLabel>
        <Select
          value={value}
          label="Time"
          onChange={(e)=> setValue(e.target.value)}
          placeholder="Time"
        >
         
          {props.menuItems.map(item => {
            return <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
          })}

        </Select>
      </FormControl>
    </Box>
  );
}