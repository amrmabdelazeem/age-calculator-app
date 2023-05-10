import React, { useState } from "react";
import Label from "./Label";

//Calculate leap years between currentyear and inputyear

function App(){

    const [year, setYear] = useState("--");
    const [month, setMonth] = useState("--");
    const [day, setDay] = useState("--");
    
    const [inputDay, setInputDay] = useState("");
    const [inputMonth, setInputMonth] = useState("");
    const [inputYear, setInputYear] = useState("");
    
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth()+1;
    const currentYear = new Date().getFullYear();

    // Function checks how many days in each month
    function getDaysInMonth(year, month){
        const numberOfDays = new Date(year, month, 0).getDate();
        console.log(numberOfDays);
        return numberOfDays;
        }

    //Check Leap year

    function countLeapYears(startYear, endYear){
        let leapYearsCount = 0;

        for(let year = startYear; year <=endYear; year++){
            if(isLeap(year)){
                leapYearsCount++;
            }
        }
        return leapYearsCount;
    }
    function isLeap(year){
        if(year % 4 !== 0){
            return false;
        }else if(year % 100 !== 0){
            return true;
        }else if(year % 400 !==0){
            return false;
        }else{
            return true;
        }
    }

    function updateDay(event){
        const newValue = event.target.value;
        setInputDay(newValue);
    }
    function updateMonth(event){
        const newValue = event.target.value;
        setInputMonth(newValue);
    }

    function updateYear(event){
        const newValue = event.target.value;
        setInputYear(newValue);
    }

    function handleAge(event){

        // const formData = {
        //     day: inputDay,
        //     month: inputMonth,
        //     year: inputYear
        // }

        // const errors = validateForm(formData);

        // if(Object.keys(errors).length === 0){
        //     console.log("form is valid");
        // }else{
        //     document.getElementById("labelDay").style.color="red";
        //     document.getElementsByClassName("error-day")
        // }

        const leapYears = countLeapYears(inputYear, currentYear);
        console.log(leapYears);
        const daysInMonth = getDaysInMonth(inputYear, inputMonth);

        if(currentYear>= inputYear && inputYear !==""){

            if(currentMonth < inputMonth){
                const newYear = (currentYear - Number(inputYear)) -1;
                // console.log(inputYear);
                setYear(newYear);
                document.getElementById("labelYear").style.color= "#716f6f";
                document.getElementById("error-year").style.visibility = "hidden";
            }else if(currentMonth >= inputMonth){
                const newYear = (currentYear - Number(inputYear));
                setYear(newYear);
                document.getElementById("labelYear").style.color= "#716f6f";
                document.getElementById("error-year").style.visibility = "hidden";
            }

        }else{
            setYear("--");
            document.getElementById("labelYear").style.color="red";
            document.getElementById("error-year").style.visibility = "visible";
        }

        if(inputMonth<1 || inputMonth>12){
            setMonth("--");
            // console.log("Month Errr");
            document.getElementById("labelMonth").style.color="red";
            document.getElementById("error-month").style.visibility = "visible";
        }else{
            if(currentMonth>=inputMonth){
                const newMonth = currentMonth - Number(inputMonth);
                console.log(inputMonth);
                setMonth(newMonth);
                // console.log(newMonth)
                document.getElementById("labelMonth").style.color= "#716f6f";
                document.getElementById("error-month").style.visibility = "hidden";
            }else if(currentMonth<inputMonth){
                const newMonth = 12+ currentMonth - Number(inputMonth);
                // console.log(newMonth);
                setMonth(newMonth);
                
                document.getElementById("labelMonth").style.color= "#716f6f";
                document.getElementById("error-month").style.visibility = "hidden";
            }
        }

        if(inputDay>31 || inputDay<1){
            // console.log("Day err");
            document.getElementById("labelDay").style.color="red";
            document.getElementById("error-day").style.visibility = "visible";
            
        }else{
            if(currentDay>=inputDay){
                if(inputDay<=daysInMonth){
                    const newDay = (currentDay - Number(inputDay)) + leapYears;
                    if(!isNaN(newDay)){
                        setDay(newDay);
                        document.getElementById("labelDay").style.color="#716f6f";
                        document.getElementById("error-day").style.visibility = "hidden";
                    }else{
                        console.log("cannot output NAN");
                    }
                }else{
                    document.getElementById("labelDay").style.color="red";
                    document.getElementById("error-day").style.visibility = "visible";
                    console.log("Must be within range of days of month");
                }
            }else{
                const daysInMonthBefore = getDaysInMonth(inputYear, Number(inputMonth)-1);
                const newDay = (daysInMonthBefore - Number(inputDay))+currentDay;
                console.log(daysInMonthBefore, inputDay, currentDay);
                if(!isNaN(newDay)){
                    setDay(newDay);
                    document.getElementById("labelDay").style.color="#716f6f";
                    document.getElementById("error-day").style.visibility = "hidden";
                }else{
                    console.log("cannot output NAN");
                }

            }
        }
        event.preventDefault();
    }
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [showResults, setShowResults] = useState(false);
  
    const handleClick = () => {
      setIsButtonClicked(true);
      setShowResults(true);
    };


    return (
        //Container
        <main>
        {/* inputs div */}
        <div className="top-container">
        <form onSubmit={handleAge}>
        <div className="labels">
        <Label name="DAY" id="labelDay" />
        <Label name="MONTH" id="labelMonth"/>
        <Label name="YEAR" id="labelYear"/>
        </div>
        <div className="inputs">
        <input onChange={updateDay} name="day" id="day" type="tel" placeholder="DD" value={inputDay} maxLength={2}/>
        <input onChange={updateMonth} name="month" id="month" type="tel" placeholder="MM" value={inputMonth} maxLength={2}/>
        <input onChange={updateYear} name="year" id="year" type="tel" placeholder="YYYY" value={inputYear} maxLength={4}/>
        </div>
        <div className="error-container">
        <p className="error-day" id="error-day">Must be a valid day</p>
        <p className="error-month" id="error-month">Must be a valid month</p>
        <p className="error-year" id="error-year">Must be in the past</p>
        </div>

        <button></button>
        </form>
        </div>
        <div className="bottom-container">
        <h1><span value={year}>{year}</span> years</h1>
        <h1><span value={month}>{month}</span> months</h1>
        <h1><span value={day}>{day}</span> days</h1>
        </div>
        </main>
    )

}


export default App;