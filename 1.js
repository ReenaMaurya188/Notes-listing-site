//console.log('Welcome to notes app. This is app.js');
showNotes();

//If user adds a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {              //addevent on element with id addBtn when it is clicked

    let addTxt = document.getElementById("addTxt");          //take element of id addTxt 
    let notes = localStorage.getItem("notes");               //take notes from localstorage is already exists

    if (notes == null) {                                     //if no notes then give blank array
        notesObj = [];                                       //notesObj is an array storing all notes in array format
    }
    else {
        notesObj = JSON.parse(notes);                         //notesObj stored in localstorage is always is string format parseIt array
    }

    notesObj.push(addTxt.value);                                //values entered in textarea store in notesObj with help of id addTxt
    localStorage.setItem("notes", JSON.stringify(notesObj));    //setNotesObj in localstorage in array stringFormat  
    addTxt.value = "";                                          //make textarea as blank to add new note
    //console.log(notesObj);
    showNotes();

})
//function to shownotes
function showNotes() {                                  //To show notes on webpages
    let notes = localStorage.getItem("notes");          //take notes from localstorage and store it into notes variable
    if (notes == null) {                                //if there is no notes in localstorage then don't show anything,so blank array
        notesObj = [];
    }
    else {                       
        notesObj = JSON.parse(notes);                   //else parse this notes as string array
    }

    let html = "";                                                          //to display cards now , created blank html
    notesObj.forEach(function (element, index) {                            //notesObj is array so foreach can be applied

                                                                            // <!--index is counting for no. of notes--!>
                                                                            //array elements are added 1 by 1
                                                                            //backticks are used 
                                                                            //noteCard id from div is used for searchbar below
        html += `                                                           
            <div class="noteCards my-2 mx-2 card" style="width: 18rem;">   
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1} </h5>         
                    <p class="card-text"> ${element}</p>                    
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
             </div>                                                         
            </div> `;
        
        //deleteNote function will be called when button will be clicked, Thus onclick event is applied on button and deleteNote is name of function. This index is passed to this.id means index.id 
        // here, id itself is index and index is used to read the index of which note is to be deleted , this same index will be in function deleteNote to delete same index 

    });

    let notesELm = document.getElementById('notes');                        //notes in card's id ,store it into variable notesELm
    if (notesObj.length != 0) {                                             //if there is note in localstorage
        notesELm.innerHTML = html;                                          //then add that note in html and display cards accordingly
    }
    else {                                                              //if there is no note in localstorage then display below statement
        notesELm.innerHTML = `Nothing to show! Use "Add a note" section above to add notes. `;  
    }
}

//function to delete note
function deleteNote(index){ //give parameter as array index
   // console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");                      //all element is stored in our notesObj array
    if(notes == null){                                              //we will delete node and again set the localstorage
        notesObj = [];                                             //localstorage is just read here not update again 
    }else{                                                          //localstorage is read and removed using splice
        notesObj=JSON.parse(notes);
    }

    notesObj.splice(index,1);//splice takes 1st args as start of particular element/Index 2nd argu as how many element is to be removed
    localStorage.setItem("notes", JSON.stringify(notesObj));        //to update localstorage again after delete
    showNotes(); //to show again remaining notes
    
}


//now for search we have to apply event on search btn and search box see in html and also access class=noteCards of div of form element
//give id=searchTxt to input form

let search = document.getElementById('searchTxt');   //get input search bar element from searchTxt id and store in search varible
search.addEventListener("input", function(){            //apply event to write text on search bar, when text is written on search bar
                                                        //  then access it and do following function when text is taken

    let inputVal = search.value.toLowerCase();          //whatever u wil type in searchbar all words will get stored in inputval
                                                        //and these values will be converted to lowercase to make search easy,irrespective of cases
   // console.log('Input event fired !', inputVal);       //comment everything individually and see output
    let noteCards = document.getElementsByClassName('noteCards');  //noteCard is id for every individual card and accessed in variablehere
                                                                    //if text of any note from each noteCard is matched then that card we will display only and other cards will get hide

    Array.from(noteCards).forEach(function(element){                //make these notecards as array and apply loop on every card to check 
                                                                    //there text from element

        let cardTxt = element.getElementsByTagName("p")[0].innerText; //teke text of card in element and  from those text also choose text
                                                                      //from paragraph tag of index 0, and take innerText of it
                                                                //cardtxt takes all elment written in searchbar to match value use if else
        //console.log(cardTxt);
        if(cardTxt.includes(inputVal)){                         //if written statement in searchbar i.e inputVal is mathcing with cardTxt 
                                                                //then display that particular block card
            element.style.display = "block";

        }
        else {                                                    // else don't display anything
            element.style.display = "none";
        }

    })
})


/*
Further features to add:
1. Add Title
2. Mark a note as Important
3.Separate notes by user
4. Sync and host to web server
*/