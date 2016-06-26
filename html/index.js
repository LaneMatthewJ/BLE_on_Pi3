$(document).ready(function() {
        $(document).on('click', '.toggle-button', function() {
            $(this).toggleClass('toggle-button-selected');
            $me = $(this);
            $me.toggleClass('off');
            if($me.is(".off")){
                $.getJSON("https://api.myjson.com/bins/4021p", function success(data) {
                	alert("Request");
                  makeUL(data);
                }); 
                       
								myLoop();
                function myLoop () {           //  create a loop function
                   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
                  //  increment the counter
                      if ($me.is(".off")) {    //  if toggle on, call the loop function
                      		$.getJSON("https://api.myjson.com/bins/4021p", function success(data) {
                         alert("Request");
                         makeUL(data);
                       }); 
                         myLoop();             //  ..  again which will trigger another 
                      } else {
                      	remove();
                        alert("Disconnect");
                      }
                   }, 4000)
                }
            } else {
                remove();
            }
      });

  function makeUL(data){
    remove();
    var newdiv = document.createElement('div');
    var divIdName = "myDiv2";
    newdiv.setAttribute('id', divIdName);
		
    newdiv.appendChild(document.createElement('ul'));
    
    // Creating Div
    for (i = 1; i <= Object.keys(data).length; i += 1){
      var list = document.createElement("li");
      var t = document.createTextNode(data[i].name);
    	list.appendChild(document.createElement('ul'));
      list.appendChild(t);
			  for (key in data[i].log) {
          var list2 = document.createElement("li");
          var t2 = document.createTextNode(key + " " + data[i].log[key]);
          list2.appendChild(t2);
          list.appendChild(list2);
        }

       newdiv.appendChild(list);

    }
    var ni = document.getElementById('myDiv');
    ni.appendChild(newdiv)


  }

  // Cleaning Div for toggle off
  function remove() {
    var elem = document.getElementById("myDiv2");
    if (elem != null) {
      elem.parentNode.removeChild(elem);
    }
  }
  

  
});
