//   FUNCTION TO MULTIPLY LARGE NUMBERS AND RETURN A NUMBER IN NON-SCIENTIFIC NOTATION

function multiply(a, b) {
    if (a == 0 || b == 0) {
        return '0'
    }
    a = a.toString().split('')
    while (a[0] == 0) {
        a.splice(0, 1)
    }
    a = a.reverse()
    b = b.toString().split('')
    while (b[0] == 0) {
        b.splice(0, 1)
    }
    b = b.reverse()
    var lengthA = a.length
    var lengthB = b.length
    var aX = lengthA > lengthB ? a : b
    var bX = aX == a ? b : a
    var final = []
    var addition = []
    for (let i = 0; i < bX.length; i++) {
        addition.push([])
    }
    for (let i = 0; i < bX.length; i++) {
        var cache = 0
        for (let j = 0; j < aX.length; j++) {
            var lowMult = +(bX[i] * aX[j]) + (cache - 0)
            if (lowMult > 9) {
                cache = lowMult.toString().slice(0, -1)
            } else if (lowMult < 10) {
                cache = 0
            }
            if (j != aX.length - 1) {
                addition[i].push(lowMult.toString().slice(-1))
            }
            if (j == aX.length - 1) {
                addition[i].push(lowMult.toString().split("").reverse().join(""))
            }
        }
    }
    var zeroIndex = 0
    addition.map(function (x) {
        for (let i = 0; i < zeroIndex; i++) {
            x.unshift('0')
        }
        zeroIndex++
    })
    addition = addition.map(x => x = x.join('').split(''))
    addition.map(function (x) {
        while (x.length < addition[addition.length - 1].length) {
            x.push('0')
        }
    })
    var addCache = 0
    var limit = (addition[(addition.length - 1)].length)
    for (let i = 0; i < limit; i++) {
        var sum = 0
        addition.map(x => sum += (x[i] - 0))
        sum = (sum - 0) + (addCache - 0)
        if (sum > 9) {
            addCache = ((sum.toString().slice(0, -1)) - 0)
        } else if (sum < 10) {
            addCache = 0
        }
        if (i != limit - 1) {
            final.push(sum.toString().slice(-1))
        }
        if (i == limit - 1) {
            final.push(sum.toString().split("").join(""))
        }
    }
    return final.reverse().join('')
}

//  FUNCTION THAT WILL OUTPUT ALL POSSIBLE PERMUTATIONS OF STRING WITHOUT DUPLICATES

function permutations(string) {
    //   string.toString()
    var finalArr = [];

    if (string.length == 1) {
        return [string];
    }

    for (let i = 0; i < string.length; i++) {
        var static = string[i];
        var outsideStart = string.slice(0, i);
        var outsideEnd = string.slice(i + 1);
        var outside = outsideStart + outsideEnd;
        var inceptOutside = permutations(outside);

        for (let j = 0; j < inceptOutside.length; j++) {
            var finalAdd = static + inceptOutside[j];
            finalArr.push(finalAdd)
        }
    }
    return [...new Set(finalArr)];
}

//   FUNCTION TO DISPLAY SECONDS IN HH:MM:SS FORMAT

function formatDuration(seconds) {
    if (seconds == 0) {
        return 'now'
    }
    var years = Math.floor((((seconds / 60) / 60) / 24) / 365);
    seconds -= (years * 31536000)
    var days = Math.floor(((seconds / 60) / 60) / 24);
    seconds -= (days * 86400)
    var hours = Math.floor((seconds / 60) / 60);
    seconds -= (hours * 3600)
    var minutes = Math.floor(seconds / 60);
    seconds -= (minutes * 60)
    var collectArray = [years, days, hours, minutes, seconds]
    var pluralArray = ['years', 'days', 'hours', 'minutes', 'seconds']
    for (let i = 0; i < collectArray.length; i++) {
        if (collectArray[i] == 1) {
            pluralArray[i] = pluralArray[i].slice(0, -1)
        }
    }
    var finalArr = []
    for (let i = 0; i < collectArray.length; i++) {
        if (collectArray[i] > 0) {
            finalArr.push(collectArray[i] + ' ' + pluralArray[i] + ',')
        }
    }
    finalArr = finalArr.join(" ").slice(0, -1)
    var space = finalArr.split(" ").length - 1
    if (space > 2) {
        var gocha = finalArr.lastIndexOf(',')
        var beginingString = ''
        var finalString = ''
        for (let i = 0; i < gocha; i++) {
            beginingString += finalArr[i]
        }
        for (let i = gocha + 1; i < finalArr.length; i++) {
            finalString += finalArr[i]
        }
        return beginingString + ' and' + finalString
    }
    if (space == 1) {
        return finalArr
    }
}
