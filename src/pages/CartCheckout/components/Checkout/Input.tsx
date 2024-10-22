import { InputProps } from '../../types';
import { useState } from 'react';

const Input: React.FC<InputProps> = ({label, type, placeholder, required, setFormData, name, disabled, setDisabled}) => {

    const [value, setValue] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] =useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let formattedValue = '';

        if (type === "tel") {
            const inputValue = event.target.value.replace(/\D/g, '');

            if (inputValue.length < 6) {
                formattedValue = `+375 (${inputValue.slice(3, 5)}`;
            } else if (inputValue.length < 9) {
                formattedValue = `+375 (${inputValue.slice(3, 5)}) ${inputValue.slice(5, 8)}`;
            } else {
                formattedValue = `+375 (${inputValue.slice(3, 5)}) ${inputValue.slice(5, 8)}-${inputValue.slice(8, 12)}`;
            }

            setFormData(prevData => ({
                ...prevData,
                [label]: formattedValue
            }));
            setValue(formattedValue);

        } else if (name === "postal-code") {
            const inputValue = event.target.value.replace(/\D/g, '');
            setFormData(prevData => ({
                ...prevData,
                [label]: inputValue
            }));
            setValue(inputValue);

        } else {
            setFormData(prevData => ({
                ...prevData,
                [label]: event.target.value
            }));
            setValue(event.target.value);
        }
    }

    const handleInputFocus = () => {
        if (value === "" && type === "tel") setValue("+375 (");
    }

    const validateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const required = event.target.required;

        const errorField = () => {
            setError(true);
            if (!disabled.includes(label)) setDisabled(prevDisabled => [...prevDisabled, label]);
        }
    
        const correctField = () => {
            setError(false);
            if (disabled.includes(label)) setDisabled(prevDisabled => prevDisabled.filter(item => item != label));
        }

        if (required && inputValue.length === 0) {
            errorField();
            setMessage("The field is required");
        } else {
            correctField();
            setMessage("");
        }

        if (type === "tel") {
            if (value.length < 7 && type === "tel") setValue("");
            if (inputValue.length < 14 && inputValue.length > 0) {
                errorField();
                setMessage("Incorrect phone number");
            } else {
                correctField();
                setMessage("")
            }
        }

        if (name === "postal-code") {
            if (inputValue.length < 6) {
                errorField();
                setMessage("Incorrect postal code");
            } else {
                correctField();
                setMessage("")
            }
        }
    }

    return (
        <label className={`b-input ${name}`}>
            <span className="b-input_label">{`${label}${required ? '*' : ''}`}</span>
            <input 
                className={`b-input_input ${type} ${error ? "error" : ""}`}
                type={type} 
                value={value}  
                maxLength={name === "postal-code" ? 6 : undefined}
                onFocus={handleInputFocus}
                onBlur={validateInput}
                placeholder={placeholder}
                required={required}
                onChange={handleInputChange} />
            {message && <span className="b-message error">{message}</span>}
        </label>
    )
}

export default Input;