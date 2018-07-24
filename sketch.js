let sel,submit,result;
let players = {};
let names;
let database,results;
let table,tab;
let elements = [];
var records;
function setup() {

    sel = createSelect();
    createCanvas(windowWidth, windowHeight);
    background(51);

    sel.position(width / 4 - sel.width, 50);
    //sel.style('align','left');
    result = createInput('');

    result.style('width', '80');
    //result.style('position','relative');
    result.position(width / 2 - result.width, 50);
    submit = createButton("Submit");

    submit.position(3 * width / 4 - submit.width, 50);
    submit.mousePressed(submitData);
    //submit.style('align','center');

    var config = {
        apiKey: "AIzaSyDC4i4DTGdeEfm5frLl5LmwZDt8Jzi_V-4",
        authDomain: "leaderboard-6e26e.firebaseapp.com",
        databaseURL: "https://leaderboard-6e26e.firebaseio.com",
        projectId: "leaderboard-6e26e",
        storageBucket: "",
        messagingSenderId: "162934248491"
    };
    firebase.initializeApp(config);

    database = firebase.database();

    let ref  = database.ref("Results");

    ref.on('value',gotData,errData);

    tab = select('table');
    tab.position(width*0.1, 100);

    names = "Aditya Chandak\n" +
        "Anikait Adhya\n" +
        "Anuj Gupta\n" +
        "Anuj Shah\n" +
        "Dhrumil Gala\n" +
        "Jay Turakhia\n" +
        "Krupanshu Shah\n" +
        "Mahir Patrawala\n" +
        "Mohit Ladkani\n" +
        "Neel Porwal\n" +
        "Varun Shah\n" +
        "Yash Shah";
    names = names.split("\n");

    for(var i=0;i<12;i++)
    {
        sel.option(names[i]);
    }

    for(name of names)
    {
        players[name] = [];
        players[name].push(0);
        //players[name].push(int(random(-1000,1000)));
    }
    makeTable();
}

function makeTable()
{
    for(var i = elements.length-1;i>=0; i--)
    {
        elements[i].remove();
        elements.pop();
    }
    sortNames();
    let tableB = createElement('tbody');
    tableB.parent(tab);
    for(var i=0;i<names.length;i++) {
        let row = createElement('tr');
        row.parent(tableB);
        elements.push(row);
        let rank = createElement('th', ""+(i+1)+".");
        rank.parent(row);
        elements.push(rank);
        let rc1 = createElement('th', names[i]);
        rc1.parent(row);
        elements.push(rc1);
        let tot = calcTotal(names[i]);
        let rc2 = createElement('th', tot);
        rc2.parent(row);
        if(tot>0)
        {
            rc2.style('color','#00FF00');
        }
        else if(tot<0)
        {
            rc2.style('color','#FF0000');
        }
        elements.push(rc2);

        let bestRec = max(players[names[i]]);
        if(bestRec===Infinity)
            bestRec = 0;


        let best = createElement('th', bestRec);
        if(bestRec>0)
        {
            best.style('color','#00FF00');
        }
        else if(bestRec<0)
        {
            best.style('color','#FF0000');
        }
        best.parent(row);
        elements.push(best);

        let worstRec = min(players[names[i]]);
        if(worstRec===-Infinity)
            worstRec = 0;
        let worst = createElement('th', worstRec);

        if(worstRec>0)
        {
            worst.style('color','#00FF00');
        }
        else if(worstRec<0)
        {
            worst.style('color','#FF0000');
        }
        worst.parent(row);
        worst.parent(row);
        elements.push(worst);
    }

}

function calcTotal(playerName)
{
    var tot = 0;
    records = players[playerName];
    for(var i = 0; i < records.length;i++)
    {
        if(records[i])
        {
            tot+=int(records[i]);
        }
    }
    return tot;
}

function sortNames()
{
    for(var i =0;i<names.length-1;i++)
    {
        for(var j=i+1;j<names.length;j++)
        {
            if(calcTotal(names[j])> calcTotal(names[i]))
            {
                let temp = names[i];
                names[i] = names[j];
                names[j] = temp;
            }
        }
    }
}

function errData(err)
{
    console.log(err);
}

function gotData(data)
{
    records = data.val();
    var keys = Object.keys(records);

    for(let player in players)
    {
        players[player] = [];
        players[player].push(0);
    }

    for(var i=0;i<keys.length;i++) {
        let key = keys[i];
        let name = records[key].name;
        let value = records[key].result;
        if(!value)
            value = 0;
        players[name].push(value);
    }

    makeTable();
}

function submitData()
{
    console.log("Submitting");
    if(result.value()!== '') {
        let data = {
            name: sel.value(),
            result: result.value()
        };
        result.value('');

        let ref = database.ref("Results");

        let res = ref.push(data);
        console.log("Submitted!");

        console.log(res.key);
    }

}

function draw() {
    noLoop();

    background(51);

}
