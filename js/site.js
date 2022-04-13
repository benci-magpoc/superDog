//onload

//Object stored in local
const events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

function buildDropDown() {
    //first step is get a handle on the drop down
    let eventDropDown = document.getElementById("eventDropDownList");
    //reset the list
    eventDropDown.innerHTML = "";

    //<li><a class="dropdown-item" href="#"></a></li>
    //gets the template
    let dropDownTemplate = document.getElementById("dropDown-template");

    //get the template nodes
    let dropDownItem = document.importNode(dropDownTemplate.content, true);

    //select a tag on dropDownTemplate
    let dropDownLink = dropDownItem.querySelector("a");
    //set attribute on a tag of dropDownTemplate
    dropDownLink.setAttribute("data-city", "All");
    //set text
    dropDownLink.textContent = "All";
    eventDropDown.appendChild(dropDownItem);

    let currentEvents = getEvents();

    //get distinct array of city names using spread and set(map)
    let distinctCities = [...new Set(currentEvents.map((event) => event.city))];

    distinctCities.forEach(element => {
        let dropDownItem = document.importNode(dropDownTemplate.content, true);

        //select a tag on dropDownTemplate
        let dropDownLink = dropDownItem.querySelector("a");
        //set attribute on a tag of dropDownTemplate
        dropDownLink.setAttribute("data-city", element);
        //set text
        dropDownLink.textContent = element;
        eventDropDown.appendChild(dropDownItem);
    });

    displayStats(currentEvents);
}

//get events from data. checks if null, if so, create and save to localstorage
function getEvents() {
    let currentEvents = JSON.parse(localStorage.getItem("eventData"));

    if (currentEvents === null) {
        currentEvents = events;
        localStorage.setItem("eventData", JSON.stringify(currentEvents));
    }
    return currentEvents;
}

//onclick for cities name
function getEventData(clickedElement) {
    console.log(clickedElement);
    let cityName = clickedElement.getAttribute("data-city");
    // alert(`The City you clicked is ${cityName}`);

    //create stats for the clicked city
    let currentEvents = getEvents();
    let filteredEvents = [];
    if (cityName != 'All') {

        filteredEvents = currentEvents.filter(function (event) {
            if (event.city == cityName) {
                return event;
            }
        });
    } else {
        filteredEvents = currentEvents;
    }

    let statHeader = document.getElementById("statHeader");
    statHeader.innerHTML = `Stats for ${cityName} events`;
    console.log(filteredEvents);

    displayStats(filteredEvents);

}

//function to display stats of an event
function displayStats(filteredEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let index = 0; index < filteredEvents.length; index++) {
        currentAttendance = filteredEvents[index].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }
        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }

        average = total / filteredEvents.length;
    }

    //write values to the page
    document.getElementById("totalAttendance").innerHTML = total.toLocaleString();
    document.getElementById("mostAttendance").innerHTML = most.toLocaleString();
    document.getElementById("leastAttendance").innerHTML = least.toLocaleString();
    document.getElementById("averageAttendance").innerHTML = average.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}