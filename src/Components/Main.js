
import { useState } from "react";
import Frequency_input from "./frequency_input";
import Interval_input from './interval'
import Days_of_the_week from "./days_of_the_week";
import SubmitButton from './submit_button'
import RefreshButton from './refresh_button';
import RadioButton from './radio'

//global
const allintervals = ['daily', 'weekly', 'monthly']; //omitted yearly due to its rare usage
const daysIntervals = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];
const dotmIntervals = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];  
const monthIntervals = [1,2,3,4,5,6,7,8,9,10,11,12]; 
const monthsIntervals = ['january','february','march','april','may','june','july','august','september','october','november','december'];

//should be is separeate file, used to generate the CRON expression
function generateCronExpression(jsonData, dotw, radio, monthslist) {
    {/*minute, hour, dom, month*/}
    let cronExpression = "";
    //time
    const splittime = jsonData.time.split(':')

    if(radio[0].radio2){
        if(!splittime[1] || splittime[1] === '00'){
            cronExpression += " " + '*' ;
        }
        else{
            cronExpression += " " + splittime[1] ; //minutes
        }
    
        if(!splittime[0] || splittime[0] === '00'){
            cronExpression += " " + '*' ;
        }
        else{
            cronExpression += " " + splittime[0]; //hours
        }
    }
    else{
        if(!splittime[1]){
            cronExpression += " " + '*' ;
        }
        else{
            cronExpression += " " + splittime[1] ; //minutes
        }
    
        if(!splittime[0]){
            cronExpression += " " + '*' ;
        }
        else{
            cronExpression += " " + splittime[0]; //hours
        }        
    }

    

    //days of the month 
    const dotm = jsonData.week_number;
    cronExpression += (dotm !== '')? " " + dotm: '  *';



    //month
    if(jsonData.day == ''){
        cronExpression += " " + getMonthsIntervalOrList(monthslist);
    }
    else {
        cronExpression += " " + jsonData.day;
    }


    //days
    cronExpression += " " + getDaysIntervalOrList(dotw);

    cronExpression += " " + jsonData.user +  " " + jsonData.command;

    console.log(cronExpression);

    return cronExpression;
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

const getMonthsIntervalOrList = (months) => {
    const sortedMonths = months.sort((a, b) => monthsIntervals.indexOf(a) - monthsIntervals.indexOf(b));
    const shortMonths = sortedMonths.map(getShortDayName);

    let result = [];
    let start = shortMonths[0];

    for (let i = 1; i < shortMonths.length; i++) {
        const prevMonth = monthsIntervals.indexOf(sortedMonths[i - 1]);
        const currentMonth = monthsIntervals.indexOf(sortedMonths[i]);

        if (currentMonth - prevMonth === 1) {
            // Months are in sequence, continue to the next month
            continue;
        } else {
            // End the current interval and add it to the result
            const end = shortMonths[i - 1];
            result.push(start === end ? start : `${start}-${end}`);
            start = shortMonths[i];
        }
    }

    // Add the last interval to the result
    result.push(start === shortMonths[shortMonths.length - 1] ? start : `${start}-${shortMonths[shortMonths.length - 1]}`);

    return result;
};

const Main = () =>{
    
    //states
    const [whattorender, Setwhattorender] = useState([{day:false,week:false, month:false,year:false}])// sets what comp to render depending on interval chosen
    const [radio, setRadio] = useState([{radio1:true,radio2:false}]);//sets time to at or every
    const [inputValue, setInputValue] = useState('');
    const [formInputData, setFormInputData] = useState({ //the data 
        frequency:'',
        interval:'',
        week_number: '',
        day: '',
        time: '',
        user: '',
        command: '',
    });
    const [days_of_the_week, setdays_of_the_week] = useState([]);
    const [month, setmonth] = useState([]);


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
        else if(inputFieldValue === 'daily'){
            const newweekmonth = [{week: false, month:false}];
            Setwhattorender(newweekmonth);
        }
        else if(inputFieldValue === 'yearly'){
            const newweekmonth = [{day:true,week:false, month:true,year:true}];
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
    }


    const handleMonthChange = (evnt) => {

        const value = evnt.target.checked;
        const name = evnt.target.value;

        if (value === true) {
            // Add the new item to the data array
            setmonth((prevData) => [...prevData, name]);
          } else {
            // Remove the item with the specified name from the data array
            setmonth((prevData) => prevData.filter((item) => item !== name));
          }
  
        console.log(name);
    }

    const handleFormSubmit =(evnt)=>{
        evnt.preventDefault();
        const checkEmptyInput = !Object.values(formInputData).every(res=>res==="")
        if(checkEmptyInput)
        {   
            //console.log( formInputData);
            setInputValue(generateCronExpression(formInputData, days_of_the_week,radio,month));
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
            <legend>SCHEDULER</legend>
            <div className="row">
                <div className="col-sm-4">
                    <form method="POST">
                        <div className='top-items'>
                        
                            <Interval_input interval={formInputData.interval} handleInputChange={handleInputChange} intervals = {allintervals} id = "interval"  placeholder = {"days, months..."}/>         
                            {/* <Frequency_input frequency={formInputData.frequency} handleInputChange={handleInputChange} input_type = "number" id = "frequency" placeholder = {"number of days, mon... yea"}/>                        */}
                        </div>

                        <div className="Month top-items" id="Month">
                            {(whattorender[0].month === true)?<Interval_input week_number = {formInputData.week_number} handleInputChange={handleInputChange} intervals={dotmIntervals} id = "week_number" placeholder = {"day of the month"}/>: '' }
                            
                            {(whattorender[0].month === true)?<Interval_input day = {formInputData.day} handleInputChange={handleInputChange} intervals={monthIntervals} id ="day" placeholder = {"month"}/>: '' }
                        </div>  

                        <div  className="Month top-items-left" id="Month">
                            {(whattorender[0].month === true)?<div><hr/><Days_of_the_week days_of_the_week = {formInputData.days_of_the_week} handleDaysOfWeekChange={handleMonthChange} dayslist= {monthsIntervals}/><hr/></div>: '' }
                            {/* {(whattorender[0].month === true)?<div><Days_of_the_week days_of_the_week = {formInputData.days_of_the_week} handleDaysOfWeekChange={handleDaysOfWeekChange} dayslist= {daysIntervals}/><hr/></div>: '' } */}
                        </div>
                        
                        <div className="Week" id="Week">
                            {(whattorender[0].week === true)?<div><Days_of_the_week days_of_the_week = {formInputData.days_of_the_week} handleDaysOfWeekChange={handleDaysOfWeekChange} dayslist= {daysIntervals}/><hr/></div>: '' }
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
                        {(radio[0].radio1 === true)?<Frequency_input time = {formInputData.time} handleInputChange={handleInputChange} input_type = "time" id = "time"/>:<Frequency_input time = {formInputData.time} handleInputChange={handleInputChange} input_type = "text" maxlen = "5" id = "time" placeholder={"hrs:mins"}/>}

                        <hr/>                      
                         <label htmlFor='user'>user:</label>
                        <Frequency_input start_date = {formInputData.start_date} handleInputChange={handleInputChange} input_type = "text" id = "user"/>

                        <label htmlFor='command'>command:</label>
                        <Frequency_input end_date = {formInputData.end_date} handleInputChange={handleInputChange} input_type = "text" id = "command"/> 
                        
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