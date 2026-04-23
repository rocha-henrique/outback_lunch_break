import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

export default function TimePickerLunch({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticTimePicker
        displayStaticWrapperAs="desktop"
        openTo="minutes"
        value={value}
        onChange={(newValue) => onChange(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}