function createEmployeeRecord(recordArr) {
    return recordArr = {
        firstName: recordArr[0],
        familyName: recordArr[1],
        title: recordArr[2],
        payPerHour: recordArr[3],
        timeInEvents: [],
        timeOutEvents: []

    }
};

function createEmployeeRecords(arrOfArray) {
    return arrOfArray.map(createEmployeeRecord)
};

function createTimeInEvent(employeeRecord, dateStamp) {

    const [date, time] = dateStamp.split(" ");
    const hour = parseInt(time, 10);
    const fullDate = `${date} ${hour.toString().padStart(2,"0")}:00`;

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour,
        date
    });
    return employeeRecord;
};

function createTimeOutEvent(employeeRecord, dateStamp) {
    
    const [date, time] = dateStamp.split(" ");
    const hour = parseInt(time, 10);
    const fullDate = `${date} ${hour.toString().padStart(2,"0")}:00`;

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour,
        date
    });
    return employeeRecord;

};

function hoursWorkedOnDate(employeeRecord, date) {

const timeInEvent = employeeRecord.timeInEvents.find(e => e.date === date)
const timeOutEvent = employeeRecord.timeOutEvents.find(e => e.date === date)

if (!timeInEvent || !timeOutEvent) {
    return 0;
}

const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
return Math.floor(hoursWorked)
};


function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payForHours = (hoursWorked * employeeRecord.payPerHour)

    return parseInt(payForHours)

}

function allWagesFor(employeeRecord) {
 const allDates = employeeRecord.timeInEvents.map(e => e.date);
 const totalWages = allDates.reduce((acc, date) => acc + wagesEarnedOnDate(employeeRecord, date), 0);

    return parseInt(totalWages)
};

function calculatePayroll(employeeRecord) {
const totalPay = employeeRecord.reduce((acc, employeeRecord) => {
    const allDates = employeeRecord.timeInEvents.map( e => e.date);
    const wagesForEmployee = allDates.reduce((employeeAcc, date) =>{
        return employeeAcc + wagesEarnedOnDate(employeeRecord, date);
    } ,0);
    return acc + wagesForEmployee;
}, 0);
return totalPay;
}
