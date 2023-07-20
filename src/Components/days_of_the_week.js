import { Component} from "react";
import { useState } from "react";


function Days_of_the_week({handleInputChange, days_of_the_week}){

    const [data, setData] = useState([])

      const handleInputChanges = (name, value) => {
        
        value == true? setData({ ...data, [name]: value }): data.splice(name,1);
        console.log(data);
      }

    return (
        <div className="form-control my-3" value = {days_of_the_week} onChange={ (e) => handleInputChanges(e.target.value, e.target.checked)} onSubmit={handleInputChange} >
            <label for="Sunday">S</label>
            <input type="checkbox" value="Sunday"  id="Sunday" name="day" />
            <label for="Monday">M</label>
            <input type="checkbox" value= "Monday"  label="Monday" name="day" />
            <label for="Tuesday">T</label>
            <input type="checkbox" value="Tuesday" label="Tuesday" name="day" />
            <label for="Wednesday">W</label>
            <input type="checkbox" value= "Wednesday" label="Wednesday" name="day" />
            <label for="Thursday">S</label>
            <input type="checkbox" value= "Thursday" label="Thursday"  name=" day"/>
            <label for="Friday">F</label>
            <input type="checkbox" value="Friday" label="Friday" name="day" />
            <label for="Saturday">S</label>
            <input type="checkbox" value= "Saturday" label="Saturday" name="day"/>
        </div>
    );
}
export default Days_of_the_week;