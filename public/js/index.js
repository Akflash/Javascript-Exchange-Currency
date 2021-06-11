


var currencyOneElem = document.getElementById("currency-one");
var amountOneElem = document.getElementById("amount-one");
var currencyEl_two = document.getElementById("currency-two");
var amountTwoElem = document.getElementById("amount-two");
var errorElement = document.getElementById("error-display");
var tableElement = document.getElementById("table");
var request = new XMLHttpRequest();

var accesskey ="c871d3dfb14e08ad4ab93aa425fecb5e"
var rateEl = document.getElementById("rate");
function showChart(){

    if(currencyEl_two.value!=="ALL" && amountTwoElem.innerHTML.trim()!=="" ) {
        var chart = new CanvasJS.Chart("chart", {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "Currency Exchange"
            },
            axisY: {
                title: "Amount"
            },
            data: [{        
                type: "column",  
                showInLegend: true, 
                legendMarkerColor: "grey",
                legendText: " ",
                dataPoints: [      
                    { y: parseFloat(amountOneElem.value), label: currencyOneElem.value},
                    { y: parseFloat(amountTwoElem.innerHTML),  label: currencyEl_two.value },
                
                ]
            }]
        });
        chart.render()
    }
    else{
        document.getElementById("chart").innerHTML = "";
    }
   
}

function handleSubmit(e){

    var dateInput  = document.getElementById("date-input").value 
    var currency_one = currencyOneElem.value;
    request.open("GET",`http://api.exchangeratesapi.io/v1/${dateInput}`
    +`?access_key=${accesskey}`)
     request.responseType = 'json';
    
     request.send();
     request.onerror = function(){
         console.log("error")
        errorElement.innerHTML = "ERROR: Please enter a date on or before today "; 
        tableElement.innerHTML = " "; 
        chart.innerHTML = ""
     }
     request.onload = function() {
    
         var resp = request.response
       
      let bool = request.response.error ? true:false 
      console.log(resp,bool)
      if(bool) {
        errorElement.innerHTML = "ERROR: Please enter a date on or before today "; 
          tableElement.innerHTML = " "; 
          chart.innerHTML = ""
      }
      else{
        errorElement.innerHTML = " "; 
      if(currencyEl_two.value==="ALL") {
  
        if(tableElement.childNodes[0])tableElement.removeChild(tableElement.childNodes[0]); 
        var table = document.createElement('table'), tr, td, row, cell;
        for(let i=0;i<1;i++) {
            tr = document.createElement('tr');
            for( let i =0 ; i<2 ;i++) {
                td = document.createElement('td');
                tr.appendChild(td);
               if(i==0)td.innerHTML = "CURRENCY"
               else td.innerHTML = " 1 EUR ="
            }
            table.appendChild(tr);
        }
       
        tableElement.appendChild(table)
        for(let key in resp.rates) {
            if(key==="ALL"||key==="EUR")continue
            tr = document.createElement('tr');
            for( let i =0 ; i<2 ;i++) {
                td = document.createElement('td');
                tr.appendChild(td);
               if(i==0)td.innerHTML = key
               else td.innerHTML = (amountOneElem.value *resp.rates[key]).toFixed(2) + " " + key
            }
            table.appendChild(tr);
        }
        tableElement.appendChild(table)
      }
      else{
        tableElement.innerHTML = " "; 
      }
      }

      if(currencyEl_two.value!=="ALL") {
        var amountTwoValue  = (amountOneElem.value * resp.rates[currencyEl_two.value]).toFixed(2)
        amountTwoElem.innerHTML = amountTwoValue
      }
      else{
        amountTwoElem.innerHTML = "Refer the table below"
      }
     
   

       showChart()
     };
}

