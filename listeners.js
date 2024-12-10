document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sand_button').addEventListener('click', () => {
        erase = false;
        document.getElementById('sand_button').className = "selected";
        document.getElementById('erase_button').className = "";
    });

    document.getElementById('erase_button').addEventListener('click', () => {
        erase = true;
        document.getElementById('sand_button').className = "";
        document.getElementById('erase_button').className = "selected";
    });

    document.getElementById('clear_button').addEventListener('click', () => {
        clearSand();
    });
});
