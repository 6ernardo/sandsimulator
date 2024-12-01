document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sand_button').addEventListener('click', () => {
        erase = false;
    });

    document.getElementById('erase_button').addEventListener('click', () => {
        erase = true;
    });

    document.getElementById('clear_button').addEventListener('click', () => {
        clearSand();
    });
});
