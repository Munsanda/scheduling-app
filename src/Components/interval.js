import { useState } from "react";

function Interval_input({handleInputChange, intervals, id, placeholder}){

    const [selectedDropdownItem, setSelectedDropdownItem] = useState(null);
    //setSelectedDropdownItem({ id: id });
    return (
        <div className="input-group">
        <label htmlFor={id}></label>
        
        
        <select required name={id} id={id} onChange={handleInputChange} placeholder={placeholder}>
        <option value="" disabled>{placeholder}</option>
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