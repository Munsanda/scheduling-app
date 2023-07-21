import ReactDOM from 'react-dom/client';
import { useState } from "react";
import Frequency_input from "./frequency_input";
import Interval_input from './interval'
import Days_of_the_week from "./days_of_the_week";
import SubmitButton from './submit_button'


function generateCronExpression(jsonData) {
    let cronExpression = "";
    //time
    const splittime = jsonData.time.split(':')
    cronExpression += splittime[1]; //minutes
    cronExpression += splittime[0]; //hours

    //days of the month
    cronExpression += calculateCronDayNumber(jsonData.week_number,jsonData.day);

    console.log(cronExpression);

   }

   function calculateCronDayNumber(weekInterval, dayInterval) {

    const weekIntervals = ['first','second','third','fourth','last'];
    const daysIntervals = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];

    const weekIndex = weekIntervals.indexOf(weekInterval);
    const dayIndex = daysIntervals.indexOf(dayInterval);

    console.log(weekInterval)
  
    if (weekIndex <= 0 || dayIndex <= 0) {
      throw new Error("Invalid week or day interval.");
    }
  
    const daysInAWeek = 7;
    const daysInAMonth = 31;
    let dayNumber;
  
    // Calculate the day number based on the week and day interval
    if (weekIndex === weekIntervals.length - 1) {
      // For 'last' week, calculate from the end of the month
      dayNumber = daysInAMonth - ((daysInAWeek - dayIndex) % daysInAMonth);
    } else {
      // For other weeks, calculate using multiples of days in a week
      dayNumber = (weekIndex - 1) * daysInAWeek + dayIndex;
    }
  
    return dayNumber;
  }



const Main = () =>{
    const allintervals = ['', 'day', 'week', 'month', ,'year'];
    const weekIntervals = ['','first','second','third','fourth','last'];
    const daysIntervals = ['','Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];
    let week= null;
    let month = null;
    

    //const [formData, setFormData] = useState([])
    const [formInputData, setFormInputData] = useState({ //the data 
        frequency:'',
        interval:'',
        days_of_the_week: [],
        week_number: '',
        day: '',
        time: '',
        start_date: '',
        end_date: '',
    });

    const handleInputChange=(evnt)=>{ // handles input changes to all the components
        const inputFieldValue = evnt.target.value;
        const inputFieldName = evnt.target.name;
        const NewInputValue = {...formInputData,[inputFieldName]:inputFieldValue};
        setFormInputData(NewInputValue);


        //handles the rendering of components depending on the interval chosen


        if((!week) && (!month)){
            week = ReactDOM.createRoot(document.getElementById('Week'));
            month = ReactDOM.createRoot(document.getElementById('Month'));
        }

        if(inputFieldValue === 'week'){
            week.render(
                <Days_of_the_week days_of_the_week = {formInputData.days_of_the_week} handleInputChange={handleInputChange}/>
            )               
            month.unmount();       
        }
        else if(inputFieldValue === 'month'){  
                     
            month.render(
                <div className='top-items'>
                    <Interval_input week_number = {formInputData.week_number} handleInputChange={handleInputChange} intervals={weekIntervals} id = "week_number" /> 
                    <Interval_input day = {formInputData.day} handleInputChange={handleInputChange} intervals={daysIntervals} id ="day" />
                </div>
                 )
            week.unmount();
        }
        else if(inputFieldValue === 'day' || inputFieldValue === 'year'){
            week.unmount();
            month.unmount();
        }
        else{
 
        }
            

    }

    const handleFormSubmit =(evnt)=>{
        evnt.preventDefault();
        const checkEmptyInput = !Object.values(formInputData).every(res=>res==="")
        if(checkEmptyInput)
        {   
            console.log( formInputData)
            generateCronExpression(formInputData);
        }
    }

    return (
        <div className="App">   
            <fieldset>
            <legend>scheduler</legend>
            <div className="row">
                <div className="col-sm-4">
                    <form method="POST">
                        <div className='top-items'>
                            <Frequency_input frequency={formInputData.frequency} handleInputChange={handleInputChange} min = "1" input_type = "number" id = "frequency"/>                       
                            <Interval_input interval={formInputData.interval} handleInputChange={handleInputChange} intervals = {allintervals} id = "interval"/>         
                        </div>
                        
                        <hr/>

                        <div className="Week" id="Week">
                            {/* <Days_of_the_week days_of_the_week = {formInputData.days_of_the_week} handleInputChange={handleInputChange}/>  */}
                        </div>

                        <div className="Month" id="Month">
                            {/* <Interval_input week_number = {formInputData.week_number} handleInputChange={handleInputChange} intervals={weekIntervals} id = "week_number" /> 
                            <Interval_input day = {formInputData.day} handleInputChange={handleInputChange} intervals={daysIntervals} id ="day" />  */}
                        </div>
                        
                        <Frequency_input time = {formInputData.time} handleInputChange={handleInputChange} input_type = "time" id = "time"/>

                        <hr/>
                        
                        <p>starts:</p>
                        <Frequency_input start_date = {formInputData.start_date} handleInputChange={handleInputChange} input_type = "date" id = "start_date"/>

                        <p>ends:</p>
                        <Frequency_input end_date = {formInputData.end_date} handleInputChange={handleInputChange} input_type = "date" id = "end_date"/>
                        <SubmitButton handleFormSubmit={handleFormSubmit} />
                    </form>
                </div>
            </div>
            </fieldset>
        </div>
    )
}

export default Main