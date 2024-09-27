function fetchData() {
    return fetch('/api/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function showLoading() {
    document.getElementById('loading').classList.add('active');
    document.getElementById('error').classList.remove('active');
}

function showError() {
    document.getElementById('loading').classList.remove('active');
    document.getElementById('error').classList.add('active');
}

window.addEventListener('load', () => {
    showLoading();
      
    fetchData().then(data => {
        document.getElementById('loading').classList.remove('active');
        console.log('Данные загружены:', data);
    }).catch(error => {
        console.error('Ошибка загрузки данных:', error);
        showError();
    });
});

if (navigator.serviceWorker) {
    window.addEventListener('load', async () => {
        try {
            if (navigator.serviceWorker) {
                await navigator.serviceWorker.register(
                    './service.worker.js'
                );
                console.log('sw registered');
            }
        } catch (e) {
            console.log(e);
        }
    });
}
