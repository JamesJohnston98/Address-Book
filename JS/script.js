//jQuery code will activate once the document has successfully loaded.
$(document).ready(function(){
//ajax call for the data.json file this will create a table for the length of the data which has been created. This will generate the table data which would then be output onto the screen. This means that the user would be able to see the names displayed within the online address book. the loop will execute until it gets to the maximum number within the json file and then outputted within the table on the page. 
$.ajax({
    url: 'data.json',
    dataType: 'json',
    success: function(data){
        for(var i=0; i<data.length; i++){
            var row = $('<tr><td class = "contact" title = "name">'+data[i].name+ '</td></tr>');
            $('#contact_tbl').append(row);
        }
    },
    error: function(jqXHR, textStatus, error){
        alert('Error:Please connect to server to display the json data');
    }

});
//code to sort the table alphabetically. This will allow the user to see the details arranged within the page. This will allow the user to sort the contact information which loads to be in alphabetical order when they click the heading of the table. 
$('th').click(function(){
    //variable which assigns the table to the function so it knows what to use
    var tbl = $(this).parents('table').eq(0);
    //variable for contact data in the table. Will be used to sort the information within the table. will then sort the table using the compare function which has been defined to compare sort the data
    var cntact_data= tbl.find('tr:gt(0)').toArray().sort(compare($(this).index()));
    //this will run a for loop as long as the data length is run and will sort the data the length of the table.
    for (var i = 0; i < cntact_data.length; i++){
        tbl.append(cntact_data [i]);
                                                }
})
    
//compare function which will evaluate the data in the table and will sort it into alphabetically order so that the table would have been sorted into alphabetical order. 
function compare(index) {
    //internal function which will activate when the compare function has been called. This will ensure that the data has been correctly sorted so that it will be displayed in alphabetical order. 
    return function(a, b) {
    //variable within the function which will it will use to compare the data which are A and B which are sensible variables to use which will mean that the data within the table will be sorted. this will take the parameter index from the compare variable so that it will understand which value has been assigned and the variable A will take in a from the funtion which will be returned when this is activated and the B variable will take in the b parameter.
        var A = ContactName(a, index), B = ContactName(b, index);
    //will change the A variable and the B variable to be numeric so that the value can be compared and changed if B is less than A and then convert back to string and compare to ensure that the data has been arranged to be alphabetical.
        return $.isNumeric(A) && $.isNumeric(B) ? A - B : A.toString().localeCompare(B);
    }
}
    //function getCellValue will return the value for the row of the table. 
function ContactName(row, index){ 
    //will return the row child as the element which makes up the row of the table and adds this to the index as text so that it will be loaded into the compare function so that the table could successfully sort the data within the table.
        return $(row).children('td').eq(index).text();
    }
    
//live search the table to allow the user to be able to locate the person that they would like to access information on easily within the address book which has been developed. 
$('#search').on('keyup', function(){
//search will activate on the key up function which means that as the user enters keys the information should refine on what has been displayed. 
    var search = $(this).val().replace('/[A-Z a-z 0-9]/');
    //looks at the table and each row of the table to ensure that the data within the table will be refined when the search is being carried out.
    $("table tr").each(function(index){
        //conditional statement will run as long as the index is not equal to zero as this is the heading of the table. 
        if(index !== 0){
            //assigns the variable name using the this selector which identifies that the name would be used to show or hide as it would be required. 
            var name = $(this);
            //will find the name from the td elements within table which is what they are contained within on the page. 
            name.find('td').each(function(){
                //reference variable which will be assigned the text name of the contact within the table that is being searched for. 
                var ref = $(this).text();
                //conditional statement which is used to use the ref variable and .indexof which uses the search variable value to check if the number is not the one being search for and this will mean that the unrequired names will be hidden.
                if(ref.indexOf(search)<0){
                    name.hide();
                }
                //else statement which will display the name which is being searched for. This will mean that the names will be displayed and refined as the search is carried out.
                else{
                    name.show();
                    return false;
                }
            });
        }
    });
//will count the number of results visible on the screen and will display a number to the user. Allows them to see the number of results given.
var rowCount = $('#contact_tbl>tbody>tr>td:visible').length;
 document.getElementById('count' ).innerHTML=rowCount;
});
    
//hover on the table to reveal more contact details using a jQuery ajax call. 
$('#contact_tbl>tbody>tr>td').click(function(event) {
  $.get("data.json")
      .done(function(e) {
    $(e).appendTo('textarea');
    console.log("Success");

  })
  .fail(function() {
    alert("Unforunately we are unable to process your request at this time." + "<br />" +  "Please ensure you are connected to a server and try again");
}); 

}); 
    
 $('#postData').click(function(){   
newKey = $('#key').val();
     newValue = $('#value').val();
     $.post('/postData', {
         key: newKey,
         value: newValue
     },function(data){
         console.log('Data successfully posted -' + newKey + '' + newValue);
         alert('Data Posted');
     });
});
    
    
});
