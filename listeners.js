document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sand_button').addEventListener('click', () => {
        erase_flag = false;
        sand_flag = true;
        document.getElementById('sand_button').className = "selected";
        document.getElementById('wood_button').className = "";
        document.getElementById('erase_button').className = "";
    });

    document.getElementById('wood_button').addEventListener('click', () => {
        erase_flag = false;
        sand_flag = false;
        document.getElementById('sand_button').className = "";
        document.getElementById('wood_button').className = "selected";
        document.getElementById('erase_button').className = "";
    });

    document.getElementById('erase_button').addEventListener('click', () => {
        erase_flag = true;
        sand_flag = false;
        document.getElementById('sand_button').className = "";
        document.getElementById('wood_button').className = "";
        document.getElementById('erase_button').className = "selected";
    });

    document.getElementById('clear_button').addEventListener('click', () => {
        clearAll();
    });
});
