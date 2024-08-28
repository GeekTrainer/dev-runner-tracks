// on page load, find race list and populate
window.addEventListener('DOMContentLoaded', async (event) => {
    const raceList = document.getElementById('race-list');

    // check the query string for a parameter named name
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if(name) displayName(name);

    try {
        const races = await loadRaces(name);

        displayRaces(races, raceList);
    } catch (error) {
        console.error('Error:', error);
    }
    
    async function loadRaces(name) {
        let response;
        if(name) {
            // url encode name
            name = encodeURIComponent(name);
            // call /api/race/name
            response = await fetch(`/api/race/${name}`);
        } else {
            // call /api/race
            response = await fetch('/api/race');
        }
    
        // get the json response
        return await response.json();
    }

    function displayRaces(races, raceList) {
        races.forEach(race => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-group-item');
            listItem.textContent = race.name;
            raceList.appendChild(listItem);
        });
    }

    function displayName(name) {
        const displayName = document.getElementById('name-display');
        const header = document.createElement('h3');
        header.innerText = `<h3>Showing results for: ${name}</h3>`;
        displayName.children = [header];

        const nameTextBox = document.getElementById('name');
        nameTextBox.value = name;
    }
});