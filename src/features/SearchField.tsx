import * as React from 'react';
import {useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
// import {UsersContext} from "../../context/userContext";
import {FormControl, InputAdornment} from "@mui/material";
import {Clear, Search} from "@mui/icons-material";
import { useUser } from '../data/UserContext';

export default function SearchFieldUser() {
    const data = useUser();
    
    const [showClearIcon, setShowClearIcon] = useState("none");
    const [showSearchIcon, setShowSearchIcon] = useState("");

    const [searchValue, setSearchValue] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
        setShowSearchIcon(event.target.value !== "" ? "none" : "flex");
        setSearchValue(event.target.value as string);
        console.log(event.target.value as string);
    }

    const handleClick = (): void => {
        setShowClearIcon("none");
        setShowSearchIcon("");
        setSearchValue("");
    };

    return (
        <FormControl style={{minWidth: 220}} sx={{ml: '2rem', my: '1rem'}}>
            <TextField
                id="outlined-search"
                label="Søk"
                role="search"
                onChange={handleChange}
                value={searchValue}
                InputLabelProps={{
                    shrink: true,
                }}

                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            position="start"
                            style={{
                                display: showSearchIcon,
                            }}
                        >
                            <Search/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            style={{
                                display: showClearIcon,
                                cursor: 'pointer'
                            }}
                            onClick={handleClick}
                        >
                            <Clear id="showClearIcon"/>
                        </InputAdornment>
                    )
                }}
            />
        </FormControl>
    );
}