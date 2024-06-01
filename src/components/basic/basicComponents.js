import { Button, TextField, styled } from "@mui/material";

export const CustomButton = styled(Button)(() => ({

    color: "black",
    backgroundColor: "#FED18C",
    '&:hover': {
        backgroundColor: "#FED18C",
    },
    '@media (max-width: 600px)': { // Adjust for mobile
        fontSize: 14, // Use theme for responsiveness
        padding: '8px', // Adjust padding for smaller screens
    },
    '@media (max-width: 350px)': { // Adjust for mobile
        fontSize: 14, // Use theme for responsiveness
        padding: '4px', // Adjust padding for smaller screens
    },
}));

export const CustomTextField = styled(TextField)({
    marginTop: 20,
    '& label.Mui-focused': {
        color: '#444444',
        fontSize: 20,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
        color: '#444444',
    },
    '& .MuiInputBase-input': {
        fontSize: 20,
        color: '#444444',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#D0D0D0',
            color: '#444444',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
        },
    },
});