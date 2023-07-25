function RadioButton({id, name ,handleRadioChange}){
    return (
        <input type="radio" id={id} name={name} onClick={handleRadioChange}/>
    )
}

export default RadioButton;