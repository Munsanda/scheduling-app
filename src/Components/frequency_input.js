
function Frequency_input({handleInputChange, frequency, input_type, id, placeholder, maxlen}){

    return (
        <input required type={input_type} onChange={handleInputChange} maxlength= {maxlen} value={frequency} name={id} min={0} className="form-control" placeholder={placeholder}/>
    );
}
export default Frequency_input;