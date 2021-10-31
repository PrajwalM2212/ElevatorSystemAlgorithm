
let liftCapacity = 100;

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    });
}

// elevator full capacity operation
function checkIfCapacityExceeded(passMap, startRange, endRange, isEveningHours=false) {
    let curPass = 0;
    let max = 0;
    for (let i = startRange; i <= endRange; i++) {
        curPass += passMap[i];
        if (passMap[i] > max) {
            max = i;
        }
    }
    curPass += passMap[0];
    if (passMap[0] > max) {
        max = 0;
    }

    if (isEveningHours) {
        // if operating in evening rush hours, then go to the floor with most number of requests
        console.log('Operating in evening mode');
        console.log('Stopping at ')
        console.log('Floor ' + max);
        console.log('Dropped off ' + passMap[max] + ' passengers at floor ' + max);
        sleep(8000);
        passMap[max] = 0;
    } else {
        // when lift has max capacity go the floor that empties most 
        // number of people
        if (curPass >= liftCapacity) {
            console.log('Lift capacity exceeded');
            console.log('Stopping at ')
            console.log('Floor ' + max);
            console.log('Dropped off ' + passMap[max] + ' passengers at floor ' + max);
            sleep(8000);
            passMap[max] = 0;
        }
    }
}

// new passengers enter the lift
function addNewPassengers(passMap, startRange, endRange, curFloor) {
    for (let i = startRange; i <= endRange; i++) {
        if(i==curFloor){
            continue;
        }
        passMap[i] += Math.floor(Math.random() * 20);
    }
    if(curFloor == 0){
        return;
    }
    passMap[0] += Math.floor(Math.random() * 20);
}

/*
direction - 0 means go up and 1 means go down
startRange - The starting floor that the lift services
endRange - The ending floor that the lift services
passMap - The map that contains number of passengers per floor
isMorningHours - is morning trip going on 
isEveningHours - is evening trip going on 
tripNumber - The number of trips currently executed
*/

function operateSingleElevator(direction, startRange, endRange, passMap, isMorningHours, isEveningHours, tripNumber) {

    if (tripNumber == 20) {
        return;
    }
    console.log('Trip Number ' + tripNumber);
    tripNumber++;

    if (direction == 0) {
        console.log('Floor ' + 0);
        console.log('Dropped off ' + passMap[0] + ' passengers at floor ' + 0);
        sleep(8000)
        passMap[0] = 0;
        addNewPassengers(passMap, startRange, endRange, 0);
        if (!isMorningHours) {
            checkIfCapacityExceeded(passMap, startRange, endRange);
        }

        curFloor = startRange;
        while (curFloor < endRange) {
            console.log('Floor ' + curFloor);
            console.log('Dropped off ' + passMap[curFloor] + ' passengers at floor ' + curFloor);
            sleep(8000)
            passMap[curFloor] = 0;
            addNewPassengers(passMap, startRange, endRange, curFloor);

            if (!isMorningHours) {
                checkIfCapacityExceeded(passMap, startRange, endRange);
            }
            curFloor++
        }

        if (isMorningHours) {
            console.log('Floor ' + curFloor);
            console.log('Dropped off ' + passMap[curFloor] + ' passengers at floor ' + curFloor);
            sleep(8000);
            passMap[curFloor] = 0;
            addNewPassengers(passMap, startRange, endRange, curFloor);
            operateSingleElevator(0, startRange, endRange, passMap, true, false, tripNumber);
        } else {
            operateSingleElevator(1, endRange, startRange, passMap, false, false, tripNumber);
        }

    }


    if (direction == 1) {
        console.log('Floor ' + startRange);
        console.log('Dropped off ' + passMap[startRange] + ' passengers at floor ' + startRange);
        sleep(8000);
        passMap[startRange] = 0;
        addNewPassengers(passMap, endRange, startRange, startRange);
        if (!isEveningHours) {
            checkIfCapacityExceeded(passMap, endRange, startRange);
        }

        curFloor = startRange - 1;
        while (curFloor >= endRange) {
            console.log('Floor ' + curFloor);
            console.log('Dropped off ' + passMap[curFloor] + ' passengers at floor ' + curFloor);
            sleep(8000);
            passMap[curFloor] = 0;
            addNewPassengers(passMap, endRange, startRange, curFloor);
            if (!isEveningHours) {
                checkIfCapacityExceeded(passMap, endRange, startRange);
            }
            curFloor--
        }

        if (isEveningHours) {
            console.log('Floor ' + 0);
            console.log('Dropped off ' + passMap[0] + ' passengers at floor ' + 0);
            sleep(8000);
            passMap[0] = 0;
            addNewPassengers(passMap, endRange, startRange, 0);
            // go the floor with most passenger requests
            checkIfCapacityExceeded(passMap, endRange, startRange, true);
            operateSingleElevator(1, startRange, endRange, passMap, false, true, tripNumber);
        } else {
            operateSingleElevator(0, endRange, startRange, passMap, false, false, tripNumber);
        }

    }

}

function runSingleElevator(direction, startRange, endRange, isMorningHours, isEveningHours, tripNumber) {
    let passMap = {

    }
    passMap[0] = 0;
    for (let i = 1; i <= 4; i++) {
        passMap[i] = 0;
    }
    operateSingleElevator(direction, startRange, endRange, passMap, isMorningHours, isEveningHours, tripNumber);
}


function runAll() {

    let numOfFloors = 200;
    let numLifts = 50;

    let numOfFloorsPerLift = numOfFloors / numLifts;

    // Other possible combinations
    // Note the order of start and end floors when in up and down direction
    // up direction during morning rush hours
    // runSingleElevator(0, 1, 4, true, false, 0);
    // up direction during normal hours
    // runSingleElevator(0, 1, 4, false, false, 0);
    // down direction during normal hours
    // runSingleElevator(1, 4, 1, false, false, 0);
    // down direction during rush hours
    // runSingleElevator(1, 4, 1, false, true, 0);

    runSingleElevator(0, 1, 4, false, false, 0);


    // Add more lifts


}

runAll()