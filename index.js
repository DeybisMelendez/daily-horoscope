// API: https://aztro.readthedocs.io/en/latest/

const SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
const IMG = {
    aries: "https://cdn-icons-png.flaticon.com/128/4684/4684270.png",
    taurus: "https://cdn-icons-png.flaticon.com/128/4684/4684370.png",
    aquarius: "https://cdn-icons-png.flaticon.com/128/4684/4684370.png",
    leo: "https://cdn-icons-png.flaticon.com/128/4684/4684329.png",
    cancer: "https://cdn-icons-png.flaticon.com/128/4684/4684304.png",
    capricorn: "https://cdn-icons-png.flaticon.com/128/4684/4684314.png",
    libra: "https://cdn-icons-png.flaticon.com/128/4684/4684334.png",
    sagittarius: "https://cdn-icons-png.flaticon.com/128/4684/4684351.png",
    scorpio: "https://cdn-icons-png.flaticon.com/128/4684/4684365.png",
    gemini: "https://cdn-icons-png.flaticon.com/128/4684/4684319.png",
    pisces: "https://cdn-icons-png.flaticon.com/128/4684/4684346.png",
    virgo: "https://cdn-icons-png.flaticon.com/128/4684/4684376.png"
}
const QUERY_STRING = window.location.search
const URL_PARAMS = new URLSearchParams(QUERY_STRING)
const BUTTON_TOMORROW = document.getElementById("tomorrow")
const BUTTON_TODAY = document.getElementById("today")
const BUTTON_YESTERDAY = document.getElementById("yesterday")

let day = URL_PARAMS.get("day") || "today"

function createSections(sign) {
    let section = document.createElement("section")
    section.id = sign
    document.getElementById("content").appendChild(section)
}

function getHoroscope(sign) {
    let url = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`
    fetch(url, {
        method: "POST"
    })
        .then(response => response.json())
        .then(json => {
            let section = document.getElementById(sign)
            section.innerHTML = `
                <h2>${capitalize(sign)}</h2>
                <img src="${IMG[sign]}">
                <span class = "date">${json.date_range}</span>
                <p class = "description">${json.description}</p>
                <table>
                    <tr>
                        <th>Color</th>
                        <th>Lucky Number</th>
                        <th>Lucky Time</th>
                        <th>Mood</th>
                    </tr>
                    <tr>
                        <td>${json.color}</td>
                        <td>${json.lucky_number}</td>
                        <td>${json.lucky_time}</td>
                        <td>${json.mood}</td>
                    </tr>
                </table>`
        })
}
switch (day) {
    case "tomorrow":
        BUTTON_TOMORROW.disabled = true
        break
    case "today":
        BUTTON_TODAY.disabled = true
        break
    case "yesterday":
        BUTTON_YESTERDAY.disabled = true
        break
}

SIGNS.forEach(sign => { createSections(sign); getHoroscope(sign) })


// Button handler

BUTTON_TODAY.onclick = function () {
    window.location.href = "?day=today"
}

BUTTON_TOMORROW.onclick = function () {
    window.location.href = "?day=tomorrow"
}
BUTTON_YESTERDAY.onclick = function () {
    window.location.href = "?day=yesterday"
}

// Tools

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}