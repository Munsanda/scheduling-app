import { Component} from "react";
import { useState } from "react";


function Days_of_the_week({handleInputChange, days_of_the_week, dayslist}){

    const [data, setData] = useState([])

    const handleInputChanges = (name, value) => {
      if (value) {
        // Add the new item to the data array
        setData((prevData) => [...prevData, { [name]: value }]);
      } else {
        // Remove the item with the specified name from the data array
        setData((prevData) => prevData.filter((item) => !item.hasOwnProperty(name)));
      }

    };

    return (
        <div className="form-control days_of_the_week" value = {data} onChange={ (e) => handleInputChanges(e.target.value, e.target.checked)} onSubmit={handleInputChange} >
            {dayslist.map(day => {
              return (
                (day != "")?
                <div className="Container">
                  <label htmlFor={day}>{day[0]}</label>
                  <input type="checkbox" value= {day} label={day} name="day"/>
                </div>: ""
              )
            })}
        </div>
    );
}
export default Days_of_the_week;