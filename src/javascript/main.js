'use strict';

(function() {
    var form, table, formInputs;
    var app = {
        createTable: function(tableNewClass) {
            var table = document.createElement('table'),
                head = table.createTHead();
            table.className = tableNewClass;
            var totalLabels = form.getElementsByTagName('label');
            form.parentNode.appendChild(table);
            for (var i = 0; i < totalLabels.length; i++) {
                head.appendChild(this.addTagElement('th', null, totalLabels[i].textContent));
            }
            head.appendChild(this.addTagElement('th', null, 'Edit'));
            head.appendChild(this.addTagElement('th', null, 'Remove'));
            return table;
        },
        addTagElement: function(tag, classes, text) {
            var element = document.createElement(tag);
            if (classes) {
                element.className = classes;
            }
            if (text) {
                element.innerHTML = text;
            }
            return element;
        },
        fillingInputs: function(selectFormClass) {
            var row = table.insertRow(-1),
                listClassesEdit = 'rowEdit btn btn-info glyphicon glyphicon-edit',
                listClassesSubmit = 'rowSubmit btn btn-success glyphicon glyphicon-ok',
                listClassesRemove = 'rowRemove btn btn-danger glyphicon glyphicon-remove';
            row.className = selectFormClass;
            for (var i = 0; i < formInputs.length; i++) {
                var cell = row.insertCell(i);
                cell.innerHTML = formInputs[i].value;
                cell.setAttribute('data-type', formInputs[i].type);
                cell.setAttribute('data-name', formInputs[i].name);
                if (formInputs[i].hasAttribute('data-error')) {
                    cell.setAttribute('data-error', formInputs[i].getAttribute('data-error'));
                }
            }
            var colEdit = row.insertCell(-1);
            colEdit.appendChild(this.addTagElement('button', listClassesEdit))
            colEdit.appendChild(this.addTagElement('button', listClassesSubmit));
            var colRemove = row.insertCell(-1);
            colRemove.appendChild(this.addTagElement('button', listClassesRemove));
            return row;
        },
        validateEmail: function(email) {
            if (!email) return true;
            var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email.value.match(mailFormat)) {
                return true;
            } else {
                this.markInput(email);
                return false;
            }
        },
        validateDate: function(date) {
            //  dd/mm/yyyy,dd-mm-yyyy or dd.mm.yyyy
            if (!date) return true;
            var dateFormat = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
            if (date.value.match(dateFormat)) {
                return true;
            } else {
                this.markInput(date);
                return false;
            }
        },
        markInput: function(input) {
            var exixstError = input.parentNode.querySelector('.error-text');
            if (exixstError) {
                return;
            } else {
                var text = input.getAttribute('data-error');
                if (!text) return;
                input.classList.add('error');
                var div = document.createElement('div');
                div.textContent = text;
                div.className = 'error-text';
                input.parentNode.appendChild(div);
            }
        },
        clearInputError: function(input) {
            var parent = input.parentNode,
                message = parent.querySelector('.error-text');

            input.classList.remove('error');
            if (message) {
                parent.removeChild(message);
            }
        },
        fillingDataToInput: function(currentForm, target, classForm, selectorForm) {
            var isEmpty = false,
                input, inputEmail, inputDate, checkEmailComplete, checkDateComplete,
                inputs = currentForm.querySelectorAll('input:not([type=submit])');
            /* Begin check fields */
            var inputs = currentForm.querySelectorAll('input:not([type=submit])');
            for (var i = 0; i < inputs.length; i++) {
                input = inputs[i];
                if (input.value.length == 0 && input.hasAttribute("data-error")) {
                    isEmpty = true;
                    this.markInput(input);
                } else {
                    this.clearInputError(input);
                }
                if (input.getAttribute("name") === 'email') {
                    checkEmailComplete = this.validateEmail(input);
                }
                if (input.getAttribute("name") === 'date') {
                    checkDateComplete = this.validateEmail(inputDate);
                }
            }
            /* End check fields */

            /* If we are ready */
            if (!isEmpty && checkEmailComplete && checkDateComplete) {

                /* If main Form */
                if (classForm) {
                    this.fillingInputs(selectorForm);
                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].value = '';
                    }
                } else {
                    var inputs = currentForm.querySelectorAll('input');
                    target.parentElement.querySelector('.rowEdit').removeAttribute('disabled');
                    if (inputs.length) {
                        for (var i = 0; i < inputs.length; i++) {
                            inputs[i].parentElement.innerHTML = inputs[i].value;
                        }
                        return;
                    }

                }
            }
        },
        edit: function(row, target) {
            target.setAttribute('disabled', 'disabled');
            var cells = row.querySelectorAll('[data-type]');
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                var input = this.addTagElement('input');
                var value = cell.innerHTML;
                cell.innerHTML = '';
                input.setAttribute("type", cell.getAttribute('data-type'));
                input.setAttribute("name", cell.getAttribute('data-name'));
                if (cell.hasAttribute('data-error')) {
                    input.setAttribute("data-error", cell.getAttribute('data-error'));
                }
                input.setAttribute("value", value);
                cell.appendChild(input);
            }
        },
        submit: function(row, target, selectorForm, startForm) {
            var classForm = [].indexOf.call(row.classList, startForm) !== -1;
            this.fillingDataToInput(row, target, classForm, selectorForm);
        },
        remove: function(row) {
            var isRemove = confirm("Are you sure?");
            if (isRemove) {
                row.remove()
            }
        },
        initFirstDate: function() { //  dd/mm/yyyy,  dd-mm-yyyy or dd.mm.yyyy
            var date = document.getElementsByName("date")[0];
            if (date) {
                var dateNew = new Date();
                date.value = dateNew.getDate() + '/' + dateNew.getMonth() + '/' + dateNew.getFullYear();
            }
            return date.value;
        },
        rundomWinner: function(tableNewClass, selectFormClass) {
            var totalTable = document.querySelector('.'+tableNewClass),
                totalWinners = totalTable.querySelectorAll('tr'),
                winnerId =  Math.floor(Math.random() * totalWinners.length) + 1;

            for(var i = 1; i < totalWinners.length+1; i++) {
                if (  i = winnerId) {
                    var winner = totalWinners[i-1].querySelector('td').textContent;
                    document.getElementById('addWinner').innerHTML = winner;
                    break;
                }
            }
        },
        init: function(selectorForm, startForm, randomId) {
          var selectFormClass = selectorForm.slice(1),
            tableNewClass = 'listUsers';
            form = document.querySelector(selectorForm);
            formInputs = form.querySelectorAll('input:not([type=submit])');
            table = this.createTable(tableNewClass);
            
            this.initFirstDate();
            this.fillingInputs(selectFormClass);

            document.querySelector('body').addEventListener('click', function(e) {
                e.preventDefault();
                var classList = e.target.className.split(' '),
                    currentForm = _parentElement(e.target, selectFormClass),
                    randomIdFunc = e.target.IdrandomId;
                
                if (classList.indexOf('rowEdit') !== -1) {
                    app.edit(currentForm, e.target);
                } else if (classList.indexOf('rowSubmit') !== -1) {
                    app.submit(currentForm, e.target, selectorForm, startForm);

                } else if (classList.indexOf('rowRemove') !== -1) {
                    app.remove(currentForm);

                } else if (classList.indexOf('mainSubmit') !== -1) {
                    app.submit(currentForm, e.target, selectFormClass, startForm);

                } else if (classList.indexOf('newInner') !== -1) {
                   app.rundomWinner(tableNewClass, selectFormClass)
                }
            })
        }
    }
    function _parentElement(target, className) {
        do {
            target = target.parentElement;
            if (target && ~target.className.split(' ').indexOf(className)) {
                return target;
            }
        } while (target);
    }
    app.init('.validateForm', 'newForm', '.newInner');
}());
