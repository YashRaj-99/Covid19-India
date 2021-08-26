console.log("Welcome :)");
// const api_url="";
var data;
var statesSearchbtn=document.getElementById('searchStates');
async function getData(){
    const pop=await fetch('https://data.covid19india.org/v4/min/data.min.json');
    data=await pop.json();
    console.log(data);
} 
getData();
total=[];
values=[];
var completePercentage;
var canvas=document.querySelector('canvas');
var c=canvas.getContext('2d');//Getting the context of the canvas
// console.log("Canvas Height: "+ canvas.height);
// console.log("Canvas Width: "+ canvas.width);
color=["purple","orange","greenyellow","red","grey","yellow","violet"];
statesSearchbtn.addEventListener('click',()=>
{
    var state=document.getElementById('states').value;
    // total[0]=data[state].meta.population;
    total[0]=0;
    total[1]=data[state].total.confirmed;
    total[2]=data[state].total.recovered;
    total[3]=data[state].total.deceased;
    total[4]=data[state].total.vaccinated1;
    total[5]=data[state].total.vaccinated2;
    total[6]=data[state].total.tested;
    var maxi= Math.max(...total);
    var i=0;
    while(i<=6)
    {
        values[i]=total[i]/maxi;
        i++;
    }
    c.clearRect(0,0,300,150);
    animation();
    completePercentage=0;
    // i=1;
    // while(i<=6)
    // {
    //     c.fillStyle=color[i];
    //     c.fillRect(50*(i-1),150-150*values[i]-10,45,150*values[i]+10);
    //     i++;
    // }
    // document.getElementById('population').innerHTML=total[0];
    document.getElementById('cc').innerHTML="Confirmed Cases<br>"+total[1];
    document.getElementById('rec').innerHTML="Recovered<Br>"+total[2];
    document.getElementById('death').innerHTML="Deaths<Br>"+total[3];
    document.getElementById('vacc1').innerHTML="Vaccinated 1<Br>"+total[4];
    document.getElementById('vacc2').innerHTML="Vaccinated 2<Br>"+total[5];
    document.getElementById('test').innerHTML="Tested<Br>"+total[6];

    // console.log(state);
    // console.log(total);
    // console.log(values);
})

// canvas.width=document.innerWidth-100;
// canvas.height=document.innerHeight;
 completePercentage=0;
function animation()
{
  if(completePercentage<100)
  {
      requestAnimationFrame(animation);
      completePercentage++;
  }
else  {
    completePercentage=0;
    return 0;
}
  c.clearRect(0,0,canvas.width,canvas.height);
  let j=1;
  while(j<=6)
  {
        // c.clearRect(0,0,canvas.width,canvas.height);
        c.fillStyle=color[j];
        c.fillRect(50*(j-1),canvas.height,45,-(150*values[j]+10)*(completePercentage)/100);
        j++;
  }
}