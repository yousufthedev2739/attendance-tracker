import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {week} from './periods-list-without-timing.js'



let start_date = '2026-09-07';
let end_date = dayjs().add(1,'days').format('YYYY-MM-DD');
// let end_date = '2026-12-24';
let classes_info = { 
  "Heritage of Tamils": { subject_code: "26UCS101", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 }, 
  "Calculus for Engineers": { subject_code: "26UCS102", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 }, 
  "Climate Change and Sustainability": { subject_code: "26UCS103", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 }, 
  "Life Skills for Engineers": { subject_code: "26UCS104", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 }, 
  "English Essentials - I": { subject_code: "26UCS105", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 }, 
  "Applied Physics - I": { subject_code: "26UCS106", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 }, 
  "Problem Solving and Python Programming": { subject_code: "26UCS107", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 }, 
  "Engineering Drawing": { subject_code: "26UCS108", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 }, 
  "Makers Space": { subject_code: "26UCS109", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 }, 
  "Physical Education - I": { subject_code: "26UCS110", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 },
  "Library": { subject_code: "noCODE", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 },
  "Mentor": { subject_code: "noCODE", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 },
  "Seminar": { subject_code: "noCODE", total_confirmed_classes: 0, classes_present: 0, classes_absent: 0 }
};

let subjects = {
    "26UCS101": "Heritage of Tamils",
    "26UCS102": "Calculus for Engineers",
    "26UCS103": "Climate Change and Sustainability",
    "26UCS104": "Life Skills for Engineers",
    "26UCS105": "English Essentials - I",
    "26UCS106": "Applied Physics - I",
    "26UCS107": "Problem Solving and Python Programming",
    "26UCS108": "Engineering Drawing",
    "26UCS109": "Makers Space",
    "26UCS110": "Physical Education - I"
  }


let cancelled_class = [{date :'2026-10-07', periods : 'all'}, {date :'2026-11-09', period : 'all'}]
let absent_class = [
    {date :'2026-09-28', period : 'all'},
    {date :'2026-09-29', period : '1'},
    {date :'2026-10-05', period : 'all'},
    {date :'2026-10-06', period : 'all'},
    {date :'2026-10-16', period : 'all'},
    {date :'2026-11-04', period : 'all'},
    {date :'2026-11-06', period : 'all'},
    {date :'2026-11-11', period : '3'},
    {date :'2026-11-11', period : '5'},
    {date :'2026-11-11', period : '6'},
    {date :'2026-11-13', period : 'all'}
    ,{date :'2026-11-19', period : 'all'}
    ,{date :'2026-11-23', period : '1'}
    ,{date :'2026-11-26', period : 'all'}
]

function getAbsentPeriod(date){
    for(let i = 0;i < absent_class.length; i += 1){
        if (absent_class[i].date == date){
            return absent_class[i].period;
        }
    }
    return false
}
function isCancelled(date){
    for(let i = 0; i < cancelled_class.length; i += 1){
        if (cancelled_class[i].date == date){
            return true
        }
    }
    return false
}
console.log(classes_info)
let confirmed_classes = []
console.log(dayjs().format('dddd'))
let current_date = start_date
while (true){
    if (current_date == end_date){break;} 
    if (dayjs(current_date).format('dddd') != 'Sunday'
            && dayjs(current_date).format('dddd') != 'Saturday'
            && !isCancelled(current_date)){
        confirmed_classes = week[`${dayjs(current_date).format('dddd')}`]
        for (let i = 1; i <= 8; i += 1){
            if (confirmed_classes[i] == null){continue;}
            classes_info[`${confirmed_classes[i]}`].total_confirmed_classes += 1;
        }
        const absent_period = getAbsentPeriod(current_date)
        

        if (absent_period){
            if (absent_period == 'all'){
                for (let i = 1; i <= 8; i += 1){
                    if (confirmed_classes[i] == null){continue;}
                    classes_info[`${confirmed_classes[i]}`].classes_absent += 1;
                }
            }else{
                console.log(confirmed_classes[absent_period])
                classes_info[`${confirmed_classes[absent_period]}`].classes_absent += 1;
                for (let i = 1; i <= 8; i += 1){
                    if (confirmed_classes[i] == null){continue;}
                    if (i.toString() != absent_period){
                        classes_info[`${confirmed_classes[i]}`].classes_present += 1;
                    }
                }
            }
        }else{
            for (let i = 1; i <= 8; i += 1){
                if (confirmed_classes[i] == null){continue;}
                classes_info[`${confirmed_classes[i]}`].classes_present += 1;
            }
        }
    }
    
    current_date = dayjs(current_date).add(1, 'days').format('YYYY-MM-DD')
}
console.log(classes_info)
const sub_keys = Object.keys(classes_info)
console.log(sub_keys)
let attendance_percentage = {}
for (let i = 0; i < sub_keys.length; i+=1){
    attendance_percentage[sub_keys[i]] = (classes_info[sub_keys[i]].classes_present
                                            /classes_info[sub_keys[i]].total_confirmed_classes)*100
}
console.log(attendance_percentage)


for(let i = 1; i < 11; i += 1){
    const class_code = "26UCS" + String(100+i);
    const percentage = attendance_percentage[subjects[class_code]].toFixed(2)
    // 26UCS106-attendance-percentage
    // 26UCS101-attendance-percentage 
    const attendance_percentage_element = document.getElementsByClassName(class_code+'-attendance-percentage')[0];
    const attendance_percentage_container_element = document.getElementsByClassName(class_code+'-attendance-percentage-container')[0];
   
    console.log("." + class_code+'-attendance-percentage', attendance_percentage_element)
    attendance_percentage_element.style.width = `${percentage}%`;
 attendance_percentage_container_element.innerHTML +=`
        <p>${subjects[class_code]} percentage : ${percentage}%</p>
    `
}
let keysInClassInfo = Object.keys(classes_info)
for(let i = 0; i < keysInClassInfo.length ; i++){
    document.querySelector('.other-info').innerHTML += `
    <p>${keysInClassInfo[i]} :</p>
    <p>classes absent${classes_info[keysInClassInfo[i]].classes_absent}</p> 
    <p>classes present${classes_info[keysInClassInfo[i]].classes_present}</p> 
    <p>total classes${classes_info[keysInClassInfo[i]].total_confirmed_classes}</p> 
    `
}
