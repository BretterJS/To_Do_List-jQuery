$(document).ready(function() {

    $('#add-btn').on('click', addItem);
    $('#to-do-list').on('change', '.completeItem', completeItem);
    $('#to-do-list').on('click', '.deleteItem', removeItem);
    $('#to-do-list').on('click', '.newText', editItem);
    $('#to-do-list').on('click', '.editButton', changeItem);
    $('#to-do-list').on('keypress', '.editText', inputPressEnter);

    // Allow for pressing of enter key to add to list
    $('#input').on('keypress', function(e) {
        if (e.which === 13) {
            addItem();
            e.preventDefault();  
        };
    });

    // Edit list items
    function changeItem() {
        var updatedItem = $(this).parent().find('.editText').val();
        $(this).hide();
        $(this).parent().find('.editText').hide();
        $(this).parent().find('.newText').text(updatedItem);
        $(this).parent().find('.newText').show();
        $('.editText').focus();
   };

    // Create the list item and checkbox, input etc and add to the ul
    function addItem() {
        var newItem = $('#input').val();
        console.log(newItem);
        var newListItem = $('<li><input type="checkbox" class=\"completeItem\"><span class=\'newText\'>' + newItem + '</span><input type=\'text\' class=\'editText\'/><input type=\'button\' class=\'button editButton\' value=\'Save Changes\'>' + '<span class=\'deleteItem\'>X</span>' + '</li>');
        $(newListItem).addClass('added');
        $('#to-do-list').append(newListItem);
        $(newListItem).hide().fadeIn(500);
        $(newListItem).parent().addClass('display');
        $('#input').focus();
        $('#input').val('');
    };

    // Line through the completed items when checked
    function completeItem() {   

        $(this).parent().toggleClass('completed');

    }

    // Remove items from the list
    function removeItem() {

        $(this).parent().animate({opacity: '.5'}).delay(100).slideUp('fast', function() {
        });

    };

    // Edit items added to the list
    function editItem() {

        var editText = $('.editText');
        $(this).parent().find('.newText');

        var currentItem = $(this).parent().find('.newText').text();
        $(this).parent().find('.editText').val(currentItem);
        $(this).parent().find('.editText').show();
        $(this).parent().find('.editButton').show();
        $(this).parent().find('.newText').hide();

        editText.focus();

    };

    // Allow for pressing of the enter key when editing added items
    function inputPressEnter(e) {
    
        if (e.which === 13) {

            var editedItem = $(this).parent().find('.editText').val();
            $(this).hide();
            $(this).parent().find('.editText').hide();
            $(this).parent().find('.newText').text(editedItem);
            $(this).parent().find('.newText').show();
            $(this).parent().find('.editButton').hide();
            $('.editText').focus();
        
        }; 
    };

    // To do... Disable editing if item is checked
});
