
const $ = selector => document.querySelector(selector);
const $IPForm = $('#ip-form');
const $IPInput = $('#ip-input');
const $submit = $('#submit-button');
const $results = $('#results-pre');

$IPForm.addEventListener('submit', async event => {
    event.preventDefault();

    const { value } = $IPInput;

    if (!value) {
        return;
    }

    $submit.setAttribute('disabled', '');
    $submit.setAttribute('aria-busy', 'true');

    const IPInfo = await fetchIPInfo(value);

    $submit.removeAttribute('disabled');
    $submit.removeAttribute('aria-busy');

    if (IPInfo) {
        $results.innerHTML = JSON.stringify(IPInfo, null, 2);

        location.hash = value;
    }
});

const fetchIPInfo = async ip => {
    const OPTIONS = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9ae8270815msh6a309e526b989adp1b1a2ejsnce13e579b98d',
            'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com',
        },
    };

    try {
        const URL = `https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`;
        const responseAPI = await fetch(URL, OPTIONS);
        const responseJSON = await responseAPI.json();

        return responseJSON;
    } catch (error) {
        console.error(error);
    }

    return null;
}

const ipHash = location.hash.substring(1);

if (ipHash) {
    $IPInput.value = ipHash;
    $submit.click();
}
