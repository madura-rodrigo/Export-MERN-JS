/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";

const countries = require("./../assets/data.json");

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const CountrySelect = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");

  return (
    <FormControl margin="normal">
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.onChange(newValue.countryShortCode);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="country-select"
        style={{ width: 300 }}
        options={countries}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        getOptionLabel={(option) => option.countryName}
        renderOption={(option) => (
          <React.Fragment>
            <span>{countryToFlag(option.countryShortCode)}</span>
            {option.countryName}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            variant="outlined"
            required={props.required ? true : false}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default CountrySelect;
