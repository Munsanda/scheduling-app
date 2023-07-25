
import { useState } from "react";
import Frequency_input from "./frequency_input";
import Interval_input from './interval'
import Days_of_the_week from "./days_of_the_week";
import SubmitButton from './submit_button'
import RefreshButton from './refresh_button';
import RadioButton from './radio'

//global
const allintervals = ['daily', 'weekly', 'monthly','yearly'];
const weekIntervals = ['first','second','third','fourth','last'];
const daysIntervals = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];
const dotmIntervals = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];  
const monthIntervals = [1,2,3,4,5,6,7,8,9,10,11,12];  

//should be is separeate file
function generateCronExpression(jsonData, dotw) {
    {/*minute, hour, dom, month*/}
    let cronExpression = "";
    //time
    const splittime = jsonData.time.split(':')
    if(jsonData.time !== ''){
        cronExpression += " " + splittime[1] ; //minutes
        cronExpression += " " + splittime[0]; //hours
    }
    else{
        cronExpression += " " + '*' ; //minutes
        cronExpression += " " + '*'; //hours
    }

    //days of the month 
    const dotm = jsonData.week_number;
    cronExpression += (dotm !== '')? " " + dotm: '  *';

    //month
    if(jsonData.day !== ''){
        cronExpression += " " + jsonData.day;
    }
    else {
        cronExpression += '  *';
    }

    //year
    if(jsonData.interval === 'yearly'){
        cronExpression += " " + jsonData.frequency;
    }
    else{
        cronExpression += '  *';
    }

    //days
    cronExpression += " " + getDaysIntervalOrList(dotw);

    console.log(cronExpression);

    return cronExpression;
   }
   function calculateCronDayNumber(weekInterval, dayInterval) {

    if(weekInterval === "" || dayInterval === "")
        return ""; 

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

// Function to convert full day names to short-form days (e.g., Monday -> Mon)
const getShortDayName = (day) => {
    return day.slice(0, 3); // Extract the first three characters of the day name
  };
  
  // Function to generate the interval or list of short-form days
  const getDaysIntervalOrList = (days) => {
    const sortedDays = days.sort((a, b) => daysIntervals.indexOf(a) - daysIntervals.indexOf(b));
    const shortDays = sortedDays.map(getShortDayName);
  
    let result = [];
    let start = shortDays[0];
  
    for (let i = 1; i < shortDays.length; i++) {
      const prevDay = daysIntervals.indexOf(sortedDays[i - 1]);
      const currentDay = daysIntervals.indexOf(sortedDays[i]);
  
      if (currentDay - prevDay === 1) {
        // Days are in sequence, continue to next day
        continue;
      } else {
        // End the current interval and add it to the result
        const end = shortDays[i - 1];
        result.push(start === end ? start : `${start}-${end}`);
        start = shortDays[i];
      }
    }
  
    // Add the last interval or day
    const lastDay = shortDays[shortDays.length - 1];
    result.push(start === lastDay ? start : `${start}-${lastDay}`);
  
    return result.join(',');
  };

const Main = () =>{
    
    //states
    const [whattorender, Setwhattorender] = useState([{day:false,week:false, month:false,year:false}])
    const [radio, setRadio] = useState([{radio1:false,radio2:false}]);
    const [inputValue, setInputValue] = useState('');
    const [formInputData, setFormInputData] = useState({ //the data 
        frequency:'',
        interval:'',
        week_number: '',
        day: '',
        time: '',
        start_date: '',
        end_date: '',
    });
    const [days_of_the_week, setdays_of_the_week] = useState([]);


    //input handling
    const handleInputChange = (evnt) =>{ // handles input changes to all the components
        const inputFieldValue = evnt.target.value;
        const inputFieldName = evnt.target.name;
        const NewInputValue = {...formInputData,[inputFieldName]:inputFieldValue};
        setFormInputData(NewInputValue);

        //console.log(evnt.target.value);
        //handles the rendering of components depending on the interval chosen

        if(inputFieldValue === 'weekly'){
            const newweekmonth = [{week: true, month:false}];
            Setwhattorender(newweekmonth);
            
        }
        else if(inputFieldValue === 'monthly'){  
            const newweekmonth = [{week: false, month:true}];
            Setwhattorender(newweekmonth);
        }
        else if(inputFieldValue === 'daily' || inputFieldValue === 'yearly'){
            const newweekmonth = [{week: false, month:false}];
            Setwhattorender(newweekmonth);
        }
    }

    const handleRadioChange = (evnt)=> {
        
        const inputFieldValue = evnt.target.value;
        const inputFieldId = evnt.target.id;
        console.log(inputFieldId);
        if(inputFieldId === "radioTime1"){
            const newRadioValue = [{radio1:true,radio2:false}]
            setRadio(newRadioValue)
        }
        else{
            const newRadioValue = [{radio1:false,radio2:true}]
            setRadio(newRadioValue)
        }
        
    }

    const handleDaysOfWeekChange = (evnt) => {

        const value = evnt.target.checked;
        const name = evnt.target.value;

        if (value === true) {
            // Add the new item to the data array
            setdays_of_the_week((prevData) => [...prevData, name]);
          } else {
            // Remove the item with the specified name from the data array
            setdays_of_the_week((prevData) => prevData.filter((item) => item !== name));
          }
  
        console.log(name);
      };

    const handleDaysOfMonthChange = (evnt) => {
        const id = evnt.target.id;
        const value = evnt.target.value;

        console.log(value);
    };

    const handleFormSubmit =(evnt)=>{
        evnt.preventDefault();
        const checkEmptyInput = !Object.values(formInputData).every(res=>res==="")
        if(checkEmptyInput)
        {   
            //console.log( formInputData);
            setInputValue(generateCronExpression(formInputData, days_of_the_week));

        }
    }

    const handleFormRefresh = (evnt)=>{
        evnt.preventDefault();
        window.location.reload();
    }



    // return 
    return (
        <div className="App">   
            <fieldset>
            <legend>scheduler</legend>
            <div className="row">
                <div className="col-sm-4">
                    <form method="POST">
                        <div className='top-items'>
                        
                            <Interval_input interval={formInputData.interval} handleInputChange={handleInputChange} intervals = {allintervals} id = "interval"  placeholder = {"days, months..."}/>         
                            {/* <Frequency_input frequency={formInputData.frequency} handleInputChange={handleInputChange} input_type = "number" id = "frequency" placeholder = {"number of days, mon... yea"}/>                        */}
                            </div>
                        <hr/>
                        <div className="Week" id="Week">
                            {(whattorender[0].week === true)?<Days_of_the_week days_of_the_week = {formInputData.days_of_the_week} handleDaysOfWeekChange={handleDaysOfWeekChange} dayslist= {daysIntervals}/>: '' }
                        </div>

                        <div  className="Month top-items-left" id="Month">
                            {(whattorender[0].month === true)?<Days_of_the_week days_of_the_week = {formInputData.days_of_the_week} handleDaysOfWeekChange={handleDaysOfWeekChange} dayslist= {daysIntervals}/>: '' }
                        </div>

                        <div className="Month top-items" id="Month">
                            {(whattorender[0].month === true)?<Interval_input week_number = {formInputData.week_number} handleInputChange={handleInputChange} intervals={dotmIntervals} id = "week_number" placeholder = {"day of the month"}/>: '' }
                            
                            {(whattorender[0].month === true)?<Interval_input day = {formInputData.day} handleInputChange={handleInputChange} intervals={monthIntervals} id ="day" placeholder = {"month"}/>: '' }
                        </div>  

                    <table className="top-items">
                        <tbody>

                            <tr>
                                <td>
                                <RadioButton id = {"radioTime1"} name = "radioTime" handleRadioChange = {handleRadioChange}/>
                           <label>At:</label>
                                </td>
                                <td>
                                <RadioButton id = {"radioTime2"} name = "radioTime" handleRadioChange = {handleRadioChange}/>
                            <label>Every:</label>
                                </td>
                            </tr>


                        </tbody>
                    </table>

                        {(radio[0].radio1 === true)?<Frequency_input time = {formInputData.time} handleInputChange={handleInputChange} input_type = "time" id = "time"/>:<Frequency_input time = {formInputData.time} handleInputChange={handleInputChange} input_type = "text" id = "time" placeholder={"h:m"}/>}
                        

                        <hr/>                      
                        {/* <label htmlFor='start_date'>starts:</label>
                        <Frequency_input start_date = {formInputData.start_date} handleInputChange={handleInputChange} input_type = "date" id = "start_date"/>

                        <label htmlFor='end_date'>ends:</label>
                        <Frequency_input end_date = {formInputData.end_date} handleInputChange={handleInputChange} input_type = "date" id = "end_date"/> */}
                        
                        <label htmlFor='cronE'>CRON:</label> 
                        {(inputValue !== '')?<input value = {inputValue} input_type="text" id="cronE" placeholder = {""} />: <input value = {inputValue} input_type="text" id="cronE" placeholder = {""} />}
                        <div className='top-items'>
                            <SubmitButton handleFormSubmit={handleFormSubmit} />
                            <RefreshButton handleFormRefresh={handleFormRefresh} />
                        </div>
                    </form>
                </div>
            </div>
            </fieldset>
        </div>
    )
}

export default Main