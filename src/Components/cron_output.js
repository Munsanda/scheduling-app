function Cron_output({handleInputChange, frequency, input_type, id}){

    return (
        <input required type={input_type} onChange={handleInputChange} value={frequency} name={id} min={0}  className="form-control"/>
    );
}
export default Cron_output;