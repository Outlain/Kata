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

//  FUNCTION THAT TAKES IN 2 NUMBER ARRAYS IN ANY ORDER [FIRST NUMBER MUST BE LOWER] THEN MERGES ALL OVERLAPPING ARRAYS AND RETURNS THE LEAST DISTANCE BETWEEN ALL REMAINING ARRAYS

function sumIntervals(intervals) {
    var intervals = intervals.sort((a, b) => {
        if (b[0] > a[0]) {
            return -1
        }
    })
    if (intervals.length == 1) {
        return intervals[0][1] - intervals[0][0]
    }
    var cache = null;
    var newIntervals = []
    intervals.map(function (x, index) {
        if (cache) {
            if (x[0] > cache[1]) {
                newIntervals.push(cache)
                if (index == intervals.length - 1) {
                    newIntervals.push(x)
                }
                cache = x
            } else if (x[0] <= cache[1] && x[1] >= cache[0]) {
                var start = x[0] < cache[0] ? x[0] : cache[0];
                var end = x[1] > cache[1] ? x[1] : cache[1];
                cache = [start, end]
                if (index == intervals.length - 1) {
                    newIntervals.push(cache)
                }
            }
        }
        if (cache == null) {
            cache = x;
        }
    })
    var sum = 0
    newIntervals.map(x => sum += ((x[1] - 0) - (x[0] - 0)))
    return sum
}

// FUNCTION TO DETERMINE IF THE PARENTHESE ARE VALID IN AN INPUT
function validParentheses(parens) {
    var c = { total: parens.split('') }
    for (let i = 0; i < c.total.length - 1; i++) {
        if (c.total[i] == '(' && c.total[i + 1] == ')') {
            c.total.splice(i, 2)
            i -= 2
        }
    }
    return c.total.length == 0
}

// FIBONACCI PATTERN ON ARRAY WITH EVEN SAME NUMBER OF LENGTH AS VALUES IN SAID LENGTHS

var oldSnail = function (array) {
    var c = {
        x: 0,
        y: 0,
        horizontal: {
            motion: true,
            positive: true,
        },
        vertical: {
            motion: false,
            positive: false,
        },
        s: {
            values: [],
            max: (array.length * array.length),
            itteration: 0,
            current: array.length - 1,
            add: array.length - 1,
        },
        final: []

    }
    function changeMotion() {
        c.horizontal.motion = !c.horizontal.motion
        c.vertical.motion = !c.vertical.motion
    }

    function changeDirection() {
        c.horizontal.positive = !c.horizontal.positive
        c.vertical.positive = !c.vertical.positive
    }
    while (c.s.current <= c.s.max) {
        if (c.s.itteration != 0) {
            if (c.s.itteration % 2 == 0) {
                c.s.add -= 1
                if (c.s.add == 0) {
                    c.s.add = 1
                }
            }
        }
        if (c.s.current <= c.s.max) {
            c.s.values.push(c.s.current)
        }

        c.s.current += c.s.add
        c.s.itteration++
    }
    var fixing = [4, 8, 12, 15, 18, 20, 22, 23]
    for (let i = 0; i < (array.length * array.length); i++) {
        c.final.push(array[c.y][c.x])
        if (c.horizontal.motion) {
            if (c.horizontal.positive) {
                c.x += 1
            } else {
                c.x -= 1
            }
        }
        if (c.vertical.motion) {
            if (c.vertical.positive) {
                c.y += 1
            } else {
                c.y -= 1
            }
        }
        c.s.values.map((x, index) => {
            if ((x - 1) == (i)) {
                changeMotion()
                if (index % 2 == 0) {
                    changeDirection();
                }
            }
        })
    }
    return c.s.final
}

// MORE EFFICIENT CONTINUATION OF FIBONACCI/SNAIL PATTERN FUNCTION

var snail = function (array) {
    if (array.length == 1) {
        return array.flat(1)
    }
    var center = array.slice(1, array.length - 1).map(x => x.slice(1, x.length - 1))

    return [array[0], array.slice(1, array.length - 1).map(x => x.slice(-1)).flat(1), array.reverse()[0].reverse(), array.slice(1, array.length - 1).map(x => x[0]), center.length > 0 ? snail(center) : []].flat(array.length)
}