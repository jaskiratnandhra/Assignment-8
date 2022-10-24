/*eslint-env browser*/

var empList = [], i;

for (i = 0; i < 5; i += 1) {
    empList[i] = "<button class='empList" + String(i) + "'>delete</button>";
}

var employeeList = [["Tim Cook", "CEO", 1230, empList[0]],
                    ["Katherine Adams", "SDSenior Vice President and General Counsel", 4560, empList[1]],
                    ["Eddy Cue", "Senior Vice President Services", 7890, empList[2]],
                    ["Craig Federighi", "Senior Vice President Software Engineering", 1011, empList[3]],
                    ["John Giannandrea", "Senior Vice President Machine Learning and AI Strategy", 1254, empList[4]]];

var $ = function(id){
    'use strict';
    return document.getElementById(id);
}
function displayEmployees() {
    "use strict";
    var row, col, table, tbody, tableStr = "";
    
    table = document.getElementsByTagName("table")[0];
    tbody = document.createElement('tbody');
    
    $("employees").innerHTML = "Showing " + employeeList.length + " employees";
        
    for (row = 0; row < employeeList.length; row += 1) {
        tableStr += "<tr>";
        for (col = 0; col < 4; col += 1) {
            tableStr += "<td>" + employeeList[row][col] + "</td>";
        }
        tableStr += "</tr>";
    }
    tableStr += "</tbody>";
    table.appendChild(tbody);
    $("tblBody").innerHTML = tableStr;
}

var insertEmployee = function () {
    "use strict";
    var name, title, extension, employee = [];
       
    name = $("name").value;
    title = $("title").value;
    extension = $("extension").value;
       
    if (name === "") {
        $("requireName").innerHTML = "This field is required.";
        return;
    } else {
        $("requireName").innerHTML = "";
        employee.push(name);
    }
    
    if (title === "") {
        $("requireTitle").innerHTML = "This field is required.";
        return;
    } else {
        $("requireTitle").innerHTML = "";
        employee.push(title);
    }
    
    if (extension === "") {
        $("requireExt").innerHTML = "This field is required.";
        return;
    }
    
    if (isNaN(extension) || extension.length !== 4) {
        $("requireExt").innerHTML = "The extension must be a 4-digit number";
        return;
    } else {
        $("requireExt").innerHTML = "";
        employee.push(extension);
        empList[employeeList.length + 1] = "<button class='empList" + String(employeeList.length + 1) + "'>delete</button>";
        employee.push(empList[employeeList.length + 1]);
    }
    
    if (employee.length > 0) {
        employeeList.push(employee);
    }
    displayEmployees();
   
    //CLEAR FIELDS
    $("regForm").reset();
    $("name").innerHTML = "";
    $("title").innerHTML = "";
    $("extension").innerHTML = "";
};

var removeEmployee = function (index) {
    "use strict";
    employeeList.splice(index, 1);
    displayEmployees();
};

window.addEventListener("load", function () {
    "use strict";
    displayEmployees();
    $("add").addEventListener("click", insertEmployee);
    $("tblBody").addEventListener("click", function (e) {
        if (e.target.textContent.match(/delete/)) {
            var i, index, tblBody, btnElements;

            tblBody = $("tblBody");
            btnElements = tblBody.getElementsByTagName("button");
            for (i = 0; i < btnElements.length; i += 1) {
                if (event.target.className === btnElements[i].className) {
                    index = i;
                }
            }
            removeEmployee(index);
        }
    });
});