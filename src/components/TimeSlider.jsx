import React, {useEffect} from "react";
import { Slider } from "@mui/material";
import Box from '@mui/material/Box';
import { menuItems, maxValues } from '../pages/Home';


export function TimeSlider(props) {
    const [maxValue, setMaxValue] = React.useState(props.steps);
    const [value, setValue] = React.useState(props.steps);
    const [time, setTime] = React.useState(props.time)

    const handleOnChange = () => {
      console.log(value)
    }

    useEffect(() => {
      setMaxValue(props.steps)
      setValue(props.steps)
    }, [props.steps])

    return(
      <Box sx={{ width: 1000, paddingLeft: 13  }}>
      <Slider
        step={1}
        marks
        min={0}
        max={maxValue}
        value={value}
        defaultValue={24}
        disabled={maxValue === 0}
        onChange={(e)=> setValue(e.target.value)}
        onChangeCommitted={handleOnChange}
      />
    </Box>

    )
}