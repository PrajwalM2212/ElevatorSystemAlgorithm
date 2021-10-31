
let liftCapacity = 100;

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    });
}

// elevator full capacity operation
function checkIfCapacityExceeded(passMap, startRange, endRange, isEveningHours) {
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
function addNewPassengers(passMap, startRange, endRange) {
    for (let i = startRange; i <= endRange; i++) {
        passMap[i] += Math.floor(Math.random() * 20);
    }
    passMap[0] += Math.floor(Math.random() * 20);
}


function operateSingleElevator(direction, startRange, endRange, passMap, isMorningHours, isEveningHours) {


    if (direction == 0) {
        console.log('Floor ' + 0);
        console.log('Dropped off ' + passMap[0] + ' passengers at floor ' + 0);
        sleep(8000)
        passMap[0] = 0;
        addNewPassengers(passMap);
        if (!isMorningHours) {
            checkIfCapacityExceeded(passMap, startRange, endRange);
        }

        curFloor = startRange;
        while (curFloor < endRange) {
            console.log('Floor ' + curFloor);
            console.log('Dropped off ' + passMap[curFloor] + ' passengers at floor ' + curFloor);
            sleep(8000)
            passMap[curFloor] = 0;
            addNewPassengers(passMap, startRange, endRange);

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
            addNewPassengers(passMap, startRange, endRange);
            operateSingleElevator(0, startRange, endRange, passMap, true, false);
        } else {
            operateSingleElevator(1, endRange, startRange, passMap, false, false);
        }

    }


    if (direction == 1) {
        console.log('Floor ' + startRange);
        console.log('Dropped off ' + passMap[startRange] + ' passengers at floor ' + startRange);
        sleep(8000);
        passMap[startRange] = 0;
        addNewPassengers(passMap, startRange, endRange);
        if (!isEveningHours) {
            checkIfCapacityExceeded(passMap, endRange, startRange);
        }

        curFloor = startRange - 1;
        while (curFloor >= endRange) {
            console.log('Floor ' + curFloor);
            console.log('Dropped off ' + passMap[curFloor] + ' passengers at floor ' + curFloor);
            sleep(8000);
            passMap[curFloor] = 0;
            addNewPassengers(passMap, startRange, endRange);
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
            addNewPassengers(passMap, startRange, endRange);
            // go the floor with most passenger requests
            checkIfCapacityExceeded(passMap, endRange, startRange);
            operateSingleElevator(1, startRange, endRange, passMap, false, true);
        } else {
            operateSingleElevator(0, endRange, startRange, passMap, false, false);
        }

    }

}

function runSingleElevator(direction, startRange, endRange, isMorningHours, isEveningHours) {
    let passMap = {

    }
    passMap[0] = 0;
    for (let i = 1; i <= 4; i++) {
        passMap[i] = 0;
    }
    operateSingleElevator(direction, startRange, endRange, passMap, isMorningHours, isEveningHours);
}


function runAll() {

    let numOfFloors = 8;
    let numLifts = 2;

    let numOfFloorsPerLift = numOfFloors/numLifts;
    runSingleElevator(0, 1, 4, false, false);


}

runAll()