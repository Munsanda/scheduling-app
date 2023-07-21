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
    cronExpression += " " + splittime[1]; //minutes
    cronExpression += " " + splittime[0]; //hours

    //days of the month
    cronExpression += " " + calculateCronDayNumber(jsonData.week_number,jsonData.day);

    console.log(cronExpression);

   }

   function calculateCronDayNumber(weekInterval, dayInterval) {

    const weekIntervals = ['first','second','third','fourth','last'];
    const daysIntervals = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];

    const weekIndex = weekIntervals.indexOf(weekInterval) + 1;
    const dayIndex = daysIntervals.indexOf(dayInterval) + 1;

  
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
    
    const [whattorender, Setwhattorender] = useState([{week:false, month:false}])


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

        if(inputFieldValue === 'week'){
            const newweekmonth = [{week: true, month:false}];
            Setwhattorender(newweekmonth);
            
        }
        else if(inputFieldValue === 'month'){  
            const newweekmonth = [{week: false, month:true}];
            Setwhattorender(newweekmonth);
        }
        else if(inputFieldValue === 'day' || inputFieldValue === 'year'){
            const newweekmonth = [{week: false, month:false}];
            Setwhattorender(newweekmonth);
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
                            
                        {(whattorender[0].week == true)?<Days_of_the_week days_of_the_week = {formInputData.days_of_the_week} handleInputChange={handleInputChange} dayslist= {daysIntervals}/>: '' }
                        </div>

                        <div className="Month top-items" id="Month">
                        {(whattorender[0].month == true)?<Interval_input week_number = {formInputData.week_number} handleInputChange={handleInputChange} intervals={weekIntervals} id = "week_number"/>: '' }
                        {(whattorender[0].month == true)?<Interval_input day = {formInputData.day} handleInputChange={handleInputChange} intervals={daysIntervals} id ="day"/>: '' }
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