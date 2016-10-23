'use strict';
(function() {



    var app = app || {};

    var validateForm = 'validateForm',
        classInputValidate = 'validate',

        listWinners = document.querySelector('.'+validateForm),
        totalItems = listWinners.querySelectorAll('.'+classInputValidate),

        formRundomWinner = document.getElementById('formRundomWinner'),

        table = document.createElement('table'),
        head = table.createTHead(),
        tbody = table.createTBody(),
        row = tbody.insertRow(-1);
    
    app = {
        createTable: function() {
          var totalLabels = listWinners.getElementsByTagName("label");
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
              row.className = validateForm;

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

          //alert('sdf')
        },

        fillingInputs: function(tbody, row) {
            var inputType = 'text';

            for (let i = 0; i < totalItems.length; i++) {

                if (totalItems[i].type === 'number') {
                    inputType = 'number'
                } 
                if (totalItems[i].type === 'email') {
                    inputType = 'email'
                } else {
                    inputType = 'text'
                }
                row.insertCell(i).innerHTML = `${totalItems[i].value}
                          <input type="${inputType}" 
                          class="${classInputValidate}"
                          value="${totalItems[i].value}">
                        `;
            }
            row.insertCell(-1).className= 'edit-cell';
            row.insertCell(-1).className= 'remove-cell';

            row.querySelector('.edit-cell').appendChild(this.addTagElement('a', 'edit rowEdit', 'glyphicon-edit'));
            row.querySelector('.edit-cell').appendChild(this.addTagElement('a', 'submit rowSubmit', 'glyphicon-ok'));
            row.querySelector('.remove-cell').appendChild(this.addTagElement('a', 'remove rowRemove', 'glyphicon-remove'));

            //row.querySelector(".submit").addEventListener("click", this.submitEditRow, false);
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
            //console.log(eForm);
            //loop all inputs for empty ONLY
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                if (input.value.trim() === "" && input.hasAttribute("data-error")) {
                    isEmpty = true; // finded empty
                    //arrMan.push(input.value);
                    this.markInput(input); // add errors div
                }
            }

            //var inputEmail = eForm.querySelector(".email");

            var inputs = eForm.querySelectorAll("input");

            for(let i = 0; i < inputs.length; i++) {
              //console.log(inputs[i])
                if(inputs[i].type.toLowerCase() == 'email') {
                    var inputEmail = inputs[i];
                }
            }

    //console.log(inputEmail)
            //console.log(inputEmail)
            //console.log(inputEmail);
            // console.log(inputEmail);
            if (!inputEmail.value.length == 0) {
                var checkEmailComplete = this.ValidateEmail(inputEmail);
                //console.log('input ok')
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
                    row.className = validateForm;


                    this.fillingDate(listWinners, row);
                    this.fillingInputs(tbody, row);
                    let totalInputs = eForm.querySelectorAll("input:not([type=submit]):not([type=submit]):not([type=number])");
                    //console.log(tbody);
                     for (let i = 0; i < totalInputs.length; i++) {
                        //console.log(totalInputs)
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
        validate: function(eForm){
          eForm.preventDefault;
          //alert(eForm);
          var inputs = eForm.querySelectorAll("input:not([type=submit]):not([type=submit]):not([type=number])");
          //console.log(inputs);
          var self = this;
          this.clear(inputs, function() {
               self.checkIsEmpty(inputs, eForm);
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
            div.textContent = text;
            div.className = "error-text";
            input.parentNode.appendChild(div);
        },

        init: function() {
          this.createTable();

          var submitt = document.getElementsByClassName('rowSubmit');
          //var form;

          for (var i = 0, len = submitt.length; i < len; i++) {
              //console.log(submitt[i]);
              submitt[i].onclick = function (){
                
                let form = this.parentElement.parentElement;
                app.validate(form);
                //alert (submitt[i]);
                return false;
              }
          }

         //  var form = document.getElementById("validateForm");
         //  var submitt = document.getElementById("submitt");

         // submitt.onclick = function() {
         //    app.validate(form);
         //    return false;
         //  };


          // for (let i = 0; i < formm.length; i++) {
            //       console.log(formm[i]);

            //       formm[i].addEventListener("click", app.validate, false);

            //       // formm[i].onclick = function() {
            //       //     app.validate(formm[i]);
            //       //     return false;
            //       // };
          //   }


          //var form = document.getElementById('validateForm');
         // submitt.onclick = function() {
         //    app.validate(form);
         //    return false;
         //  };

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
}());
