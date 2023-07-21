import { useState } from "react";

function Interval_input({handleInputChange, intervals, id}){

    const [selectedDropdownItem, setSelectedDropdownItem] = useState(null);
    //setSelectedDropdownItem({ id: id });
    return (
        <div className="input-group">
        <label htmlFor={id}></label>
        
        {console.log(id)}
        <select name={id} id={id} onChange={handleInputChange}>
            {
                intervals.map(interv => {
                    return (
                        <option key={interv} value={interv}> {interv} </option>
                    );
                })
            }
        </select>
    </div>  
    );
}
export default Interval_input;