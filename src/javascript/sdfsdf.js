'use strict';
(function() {



    var app = app || {};

    var classValidate = 'validateForm';

    //var form = document.querySelectorAll(classValidate);
    /* 
      Create table for list winners
    */
    
    
    var listWinners = document.querySelector('.validate-form'),
         formRundomWinner = document.getElementById('formRundomWinner'),
        
        totalItems = listWinners.querySelectorAll(".validate");

var table = document.createElement('table'),
                head = table.createTHead(),
                tbody = table.createTBody(),
                row = tbody.insertRow(-1);
    

    app = {
        createTable: function() {
          var totalLabels = listWinners.querySelectorAll("label");
              table.setAttribute('id', 'listUsers'),
              table.setAttribute('class', 'listUsers'),
              formRundomWinner.appendChild(table);

          for (let i = 0; i < totalLabels.length; i++) {
              head.appendChild(document.createElement("th")).innerHTML = totalLabels[i].textContent;
          }
          var tr = table.tHead,
              thEdit = document.createElement('th'),
              thDelete = document.createElement('th');

              thEdit.innerHTML = "Edit";
              thDelete.innerHTML = "Remove";

              tr.appendChild(thEdit);
              tr.appendChild(thDelete);
              row.className = classValidate;

          this.fillingDate(listWinners, row);
          this.fillingInputs(tbody, row);
          this.submitEditRow(row);
        },

        addTagElement: function(tag, classs, icon) {
          var spanEdit = document.createElement(tag);
          var spanEditData = document.createTextNode("");
          spanEdit.className = ` ${classs} glyphicon ${icon} `;
          spanEdit.id = `${icon} `;
          spanEdit.appendChild(spanEditData);
          return spanEdit;
        },

        submitEditRow: function(row) {
          
        },

        fillingInputs: function(tbody, row) {
            var inputType = 'number';

            for (let i = 0; i < totalItems.length; i++) {

                if (totalItems[i].type === 'number') {
                    inputType = 'number'
                } else {
                    inputType = 'text'
                }

                row.insertCell(i).innerHTML = `${totalItems[i].value}
                          <input type="${inputType}" 
                          value="${totalItems[i].value}">
                        `;
            }
            row.insertCell(-1).className= 'edit-cell';
            row.insertCell(-1).className= 'remove-cell';

            row.querySelector('.edit-cell').appendChild(this.addTagElement('a', 'edit', 'glyphicon-edit'));
            row.querySelector('.edit-cell').appendChild(this.addTagElement('a', 'edit', 'glyphicon-ok'));
            row.querySelector('.remove-cell').appendChild(this.addTagElement('a', 'edit', 'glyphicon-remove'));


        },

        fillingDate: function(source, row) {
            var month_val = source.querySelector(".month"),
                date_val = source.querySelector(".date"),
                year_val = source.querySelector(".year");

            var date = new Date();
            month_val.max = month_val.value = date.getMonth();
            date_val.max = date_val.value = date.getDate();
            year_val.max = year_val.value = date.getFullYear();
            //inputs for DOB
            row.insertCell(-1).innerHTML = month_val.value + '<input type="number" value=' + month_val.value + '>/' + date_val.value + '<input type="number" value="' + date_val.value + '">/' + year_val.value + '<input type="number" value=' + year_val.value + '>';
        },

        checkIsEmpty: function(inputs, eForm) {
            var isEmpty = false;
            console.log(eForm);
            //loop all inputs for empty ONLY
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                if (input.value.trim() === "" && input.hasAttribute("data-error")) {
                    isEmpty = true; // finded empty
                    //arrMan.push(input.value);
                    this.markInput(input); // add errors div
                }

            }

            var inputEmail = eForm.getElementsByClassName("email")[0];
            //console.log(inputEmail);
            if (inputEmail.value !== "") {
                var checkEmailComplete = this.ValidateEmail(inputEmail);
                console.log('input ok')
            } else {
                console.log('input empty');
            }


            if (!isEmpty && checkEmailComplete) {

                for (var i = 0; i < inputs.length; i++) {
                    var input = inputs[i];
                    if (input.value.trim() === "") {
                        isEmpty = true; // finded empty
                        //arrMan.push(input.value);
                        this.markInput(input); // add errors div
                    }
                }
                // setTimeout(function() {
                    
                    let row = tbody.insertRow(-1);
                    row.className = classValidate;


                    this.fillingDate(listWinners, row);
                    this.fillingInputs(tbody, row);
                    let totalInputs = eForm.querySelectorAll("input:not([type=submit]):not([type=submit])");
                    console.log(tbody);
                     for (let i = 0; i < totalInputs.length; i++) {
                        console.log(totalInputs)
                        totalInputs[i].value = '';
                    }

                // }, 300);
            }
        },
        clear: function(inputsItem, callback) {
            for (var i = 0; i < inputsItem.length; i++) {
                var input = inputsItem[i],
                    parent = input.parentNode,
                    message = parent.querySelector(".error-text");

                input.classList.remove("error");
                if (message) parent.removeChild(message);
            }

            if (callback) callback();
        },
        validate: function(e){
          e.preventDefault;
          //console.log(e);
          // //form.addEventListener("click", this.validate);

          // e.addEventListener("submit", this.validate);

          // form = document.getElementById("validateForm")("submit", this.validate);

          // //console.log(event);
          // //let form = this;
          // //console.log(form);
          var inputs = e.querySelectorAll("input:not([type=submit]):not([type=submit])");
          //console.log(inputs);
          var self = this;
          // //console.log(this.clear());
          this.clear(inputs, function() {
               self.checkIsEmpty(inputs, e);
           });

          return false;

        },

        ValidateEmail: function(email) {
          if (!email) return true;
            this.clear(email);
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email.value.match(mailformat)) {
                return true;
            } else {
                this.markInput(email);
                return false;
            }
        },
      
        markInput: function(input) {
            input.classList.add("error");
            var text = input.getAttribute("data-error");

            if (!text) return;

            var div = document.createElement("div");

            //addMan = [];

            div.textContent = text;
            div.className = "error-text";
            input.parentNode.appendChild(div);
        },

        init: function() {
          this.createTable();
          //console.log(form);
          //console.log(this);
          //form.addEventListener("submit", this.validate, false);
          //return false;
          //  form.onclick = function(e) {
          //   e.preventDefault;
          //   console.log( 'f' );
          //   return false;
          // };


          // var self = this;

          // console.log(this);

          // //form.addEventListener("submit", this.validate)
          // this.onclick = function() {
          //   //self.validate(this);
          //   form.addEventListener("submit", this.validate);
          //   // alert('d');
          //   //r
            
          // }
        }
    }
  
  
  app.init();
  
  var form = document.getElementById("validateForm");
  var submitt = document.getElementById("submitt");

 submitt.onclick = function() {
    app.validate(form);
    return false;
  };

  //form.addEventListener("submit", app.validate);






    

    // function validate(e) {
      


    //     function checkIsEmpty(inputs) {
    //         var isEmpty = false;
    //         //loop all inputs for empty ONLY
    //         for (var i = 0; i < inputs.length; i++) {
    //             var input = inputs[i];
    //             if (input.value.trim() === "" && input.hasAttribute("data-error")) {
    //                 isEmpty = true; // finded empty
    //                 //arrMan.push(input.value);
    //                 markInput(input); // add errors div
    //             }

    //         }


    //         var inputEmail = form.getElementsByClassName("email")[0];

    //         if (inputEmail.value !== "") {
    //             var checkEmailComplete = ValidateEmail(inputEmail);
    //         } else {
    //             console.log('input empty');
    //         }


    //         if (!isEmpty && checkEmailComplete) {

    //             for (var i = 0; i < inputs.length; i++) {
    //                 var input = inputs[i];
    //                 if (input.value.trim() === "") {
    //                     isEmpty = true; // finded empty
    //                     //arrMan.push(input.value);
    //                     markInput(input); // add errors div
    //                 }
    //             }

    //             setTimeout(function() {

    //                 let totalInputs = form.querySelectorAll("input:not([type=submit]):not([type=submit])");

    //                 let row = tbody.insertRow(-1);
    //                 for (let i = 0; i < totalItems.length; i++) {
    //                     if (totalItems[i].type === 'number') {
    //                         inputType = 'number'
    //                     } else {
    //                         inputType = 'text'
    //                     }

    //                     console.log(inputType)
    //                     row.insertCell(i).innerHTML = totalItems[i].value + "<input type=" + inputType + " value=" + totalItems[i].value + ">";

    //                 }



    //                 //row.insertCell(-1).innerHTML = month_val.value + '/' + date_val.value + '/' + year_val.value;
    //                 row.insertCell(-1).innerHTML = month_val.value + '<input type="number" value=' + month_val.value + '>/' + date_val.value + '<input type="number" value="' + date_val.value + '">/' + year_val.value + '<input type="number" value=' + year_val.value + '>';



    //                 var spanEdit = document.createElement("a");
    //                 var spanEditData = document.createTextNode("");
    //                 spanEdit.className = "edit glyphicon glyphicon-edit";
    //                 spanEdit.appendChild(spanEditData);
    //                 var spanRemove = document.createElement("a");
    //                 var spanRemoveData = document.createTextNode("");
    //                 spanRemove.className = "remove glyphicon glyphicon-remove";
    //                 spanRemove.appendChild(spanRemoveData);
    //                 row.insertCell(-1).appendChild(spanEdit);
    //                 row.insertCell(-1).appendChild(spanRemove);
                    
    //                 //console.log(inputs)
    //                 //form.submit();
    //                 for (let i = 0; i < totalInputs.length; i++) {
    //                     console.log(totalInputs)
    //                     totalInputs[i].value = '';
    //                 }

    //             }, 300);


    //         }









    //     }









        

        
    //}

    // window.onload = function() {
    //     var link = document.getElementById("newInner");
    //     link.onclick = function() {
    //         var randomUser = Math.floor(1 + Math.random() * 9);
    //         // подгружаем контент
    //         console.log(randomUser);
    //         return false;
    //     }
    // }




}());
