
function Interval_input({handleInputChange, interval, intervals, id}){
    
    return (
        <div className="input-group">
        <label for={id}></label>

        <select name={id} id={id} onChange={handleInputChange}>
            {
                intervals.map(interv => {
                    return (
                        <option key={interv} name = {interv} value={interv}> {interv} </option>
                    );
                })
            }
        </select>
    </div>  
    );
}
export default Interval_input;