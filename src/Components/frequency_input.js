
function Frequency_input({handleInputChange, frequency, input_type, id}){

    return (
        <input type={input_type} onChange={handleInputChange} value={frequency} name={id} placeholder="#" className="form-control my-3"/>
    );
}
export default Frequency_input;