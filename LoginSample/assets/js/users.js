
    let users = null;
    
    $(document).ready(function () {

      getUsers();
      searchUsers();
      const updateForm = document.getElementById('updateForm');
      const newUserForm = document.getElementById('newUserForm');

      // Add an event listener for the form submission
      updateForm.addEventListener('submit', function (event) {
            // Prevent the default form submission behavior
            event.preventDefault();
            // Perform custom validation or actions here if needed
            update = 'true'
            updateResetUser(update);
        });

          // Add an event listener for the form submission
            newUserForm.addEventListener('submit', function (event) {
              // Prevent the default form submission behavior
              event.preventDefault();
              // Perform custom validation or actions here if needed
              addUser();
          });

    });

    //FOR SEARCH USERS   
    function searchUsers(){

          // Reference to the table body
          var tableBody = $('.datatable-table tbody');
          
          // Event listener for the search input
          $('#searchInput').on('input', function () {
              var searchText = $(this).val().toLowerCase();
              
              // Loop through each row in the table
              tableBody.find('tr').each(function () {
                  var row = $(this);
                  var employeeId = row.find('td:eq(0)').text().toLowerCase();
                  var name = row.find('td:eq(1)').text().toLowerCase();
                  var email = row.find('td:eq(2)').text().toLowerCase();
                  
                  // Check if the search text matches any cell value
                  if (
                      employeeId.includes(searchText) ||
                      name.includes(searchText) ||
                      email.includes(searchText)
                  ) {
                      // Show the row if it matches
                      row.show();
                      // document.getElementById('entries').style.display = "block"
                  } else {
                      // Hide the row if it doesn't match
                      row.hide();
                      // document.getElementById('entries').style.display = "none"
                  }
              });
          });
    }
    
    //function GET USERS
    function getUsers(){
      $.ajax({
        url: 'users/all',
        method: 'GET',
        success: function (data) {
            users = data;
          // Loop through the data and populate the table
          const tbody = $('#data-table tbody');
          tbody.empty()

          data.forEach(function (item) {
            tbody.append(
              `<tr>
                  <td>${item.employeeID}</td>
                  <td>${item.name}</td>
                  <td>${item.email}</td>
                  <td>
                        <button type="button" class="btn btn-success btn-sm" style="margin-right: 1px; margin-bottom: 2px;"  onclick="populateEditModal('${item.employeeID}')">Edit</button>
                        <button type="button" class="btn btn-danger btn-sm" id="removeUser" onclick="deleteUsers('${item.employeeID}')">Remove</button>
                  </td>
               </tr>`
            );
          });
        },
        error: function (error) {
          console.error('Error:', error);
        },
      });
    }
    

    //END SEARCH

  //DELETE USERS
function deleteUsers(employeeID){
      const confirmation = window.confirm('Are you sure you want to delete this user?');

      if (confirmation){
        if(employeeID === 'IBP001') return window.alert('You cannot delete this user')
              $.ajax({
          type: 'DELETE',
          url: `/users/${employeeID}`
        });
        console.log(users);
        window.alert('Record successfully deleted');
      }

      getUsers();

    }
  //END DELETE USERS

//UPDATE USERS
  function updateResetUser(update){
    if (update=='true'){

      const confirmation = window.confirm('Are you sure you want to update user information?');
      if (confirmation){

              // const name = document.getElementById('updateName').value
                const employeeID = document.getElementById('updateEmployeeID').value
                const name = document.getElementById('updateName').value
                const email = document.getElementById('updateEmail').value
                const username = document.getElementById('updateUsername').value

              $.ajax({
                type: 'PATCH',
                url: `/users/${employeeID}`,
                data: { update: update, employeeID, name, email, username} // Include 'update' as a parameter
              });
        window.alert('Record successfully updated')
      }
    } else{
              const employeeID = document.getElementById('updateEmployeeID').value
              
              $.ajax({
                type: 'PATCH',
                url: `/users/${employeeID}`,
              });
              window.alert('Password Reset')
    }

    getUsers();
  }
//END UPDATE USERS

function populateEditModal(employeeID){
    //POPULATE DATA ON EDIT MODAL
    const user = users.find(user => user.employeeID === employeeID);
    document.getElementById('updateEmployeeID').value = employeeID;
    document.getElementById('updateName').value = user.name;
    document.getElementById('updateEmail').value = user.email;
    document.getElementById('updateUsername').value = user.username;
    $('#updateUserModal').modal('show');
    //END 
}

//ADD USERS
function addUser(){

    const confirmation = window.confirm('Are you sure you want to update user information?');
    if (confirmation){

            // const name = document.getElementById('updateName').value
              const employeeID = document.getElementById('employeeID').value
              const name = document.getElementById('name').value
              const email = document.getElementById('email').value
              const username = document.getElementById('username').value

            $.ajax({
              type: 'POST',
              url: `/users`,
              data: {employeeID, name, email, username},// Include 'update' as a parameter
              success: function (data) {
                if (data.flag){
                  return window.alert(data.message)
                }
                else{
                  window.alert(data.message)
                  formClear()
                }
               //console.log(data.message)
                getUsers();
            },
            error: function (error) {
              console.error('Error:', error);
            },
          });
    }
}

//form Clear
function formClear(){
    document.getElementById('employeeID').value = ""
    document.getElementById('name').value = ""
    document.getElementById('email').value = ""
    document.getElementById('username').value = ""
}
