
function Frequency_input({handleInputChange, frequency, input_type, id}){

    return (
        <input type={input_type} onChange={handleInputChange} value={frequency} name={id} placeholder="#" min={1}  className="form-control"/>
    );
}
export default Frequency_input;