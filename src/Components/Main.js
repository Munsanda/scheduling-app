import ReactDOM from 'react-dom/client';
import { useState } from "react";
import Frequency_input from "./frequency_input";
import Interval_input from './interval'
import Days_of_the_week from "./days_of_the_week";
import SubmitButton from './submit_button'


const Main = () =>{
    const allintervals = ['', 'day', 'week', 'month', ,'year'];
    const weekIntervals = ['','first','second','third','fourth','last'];
    const daysIntervals = ['','Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];
    

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
        let week= null;
        let month = null;

        if(!week && !month){
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
                <div>
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
        }
    }

    return (
        <div className="App">
            <fieldset>
            <legend>Scheduler</legend>
            <div className="row">
                <div className="col-sm-4">
                    <form method="POST">

                        <Frequency_input frequency={formInputData.frequency} handleInputChange={handleInputChange} type = "number" id = "frequency"/>                       
                        <Interval_input interval={formInputData.interval} handleInputChange={handleInputChange} intervals = {allintervals} id = "interval"/>         

                        <div className="Week" id="Week">
                            {/* <Days_of_the_week days_of_the_week = {formInputData.days_of_the_week} handleInputChange={handleInputChange}/>  */}
                        </div>

                        <div className="Month" id="Month">
                            {/* <Interval_input week_number = {formInputData.week_number} handleInputChange={handleInputChange} intervals={weekIntervals} id = "week_number" /> 
                            <Interval_input day = {formInputData.day} handleInputChange={handleInputChange} intervals={daysIntervals} id ="day" />  */}
                        </div>
                        
                        <Frequency_input time = {formInputData.time} handleInputChange={handleInputChange} input_type = "time" id = "time"/>

                        <p>Starts:</p>
                        <Frequency_input start_date = {formInputData.start_date} handleInputChange={handleInputChange} input_type = "date" id = "start_date"/>

                        <p>Ends:</p>
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