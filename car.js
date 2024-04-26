document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.car-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedCar = document.querySelector('input[name="car"]:checked');

        if (selectedCar) {
            alert(`Выбрана марка машины: ${selectedCar.value}`);
        } else {
            alert('Пожалуйста, выберите марку машины.');
        }
    });
});