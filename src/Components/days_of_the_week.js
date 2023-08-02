import { Component} from "react";
import { useState } from "react";


function Days_of_the_week({handleInputChange, days_of_the_week, dayslist, handleDaysOfWeekChange}){
   

    return (
        <div className="form-control days_of_the_week" onChange={  handleDaysOfWeekChange}  >
            {dayslist.map(day => {
              return (
                (day != "")? 
                <div className="Container">
                  <label htmlFor={day}>{day.slice(0,3)}</label>
                  <input type="checkbox" value= {day} label={day} name="day"/>
                </div>: ""
              )
            })}
        </div>
    );
}
export default Days_of_the_week;