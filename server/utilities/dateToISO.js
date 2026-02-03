export default function dateToISO(date) {
    const jsDate = new Date(date)
    
    const time = jsDate.toLocaleString("en-us", { hour: "numeric"});
    const day = jsDate.getDate();
    const month = jsDate.toLocaleString("en-us", { month: "short" });
    const year = jsDate.getFullYear();


    return `${time} | ${day} ${month}, ${year}`;
}