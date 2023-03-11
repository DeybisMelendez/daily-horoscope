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
const BUTTON_TOMORROW = document.querySelector("#tomorrow")
const BUTTON_TODAY = document.querySelector("#today")
const BUTTON_YESTERDAY = document.querySelector("#yesterday")
const TEMPLATE_SECTION = document.querySelector("#template")
const ELEMENTS_ID = ["#title", "#date", "#img", "#description", "#color", "#lucky_time", "#lucky_number", "#mood"]

let day = URL_PARAMS.get("day") || "today"

function createSections(sign) {
    let template = TEMPLATE_SECTION.content.cloneNode(true)
    let section = template.children[0]
    section.id = sign
    ELEMENTS_ID.forEach(element => section.querySelector(element).id += sign)
    document.querySelector("#content").appendChild(template)
}

function getHoroscope(sign) {
    let url = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`
    fetch(url, {
        method: "POST"
    })
        .then(response => response.json())
        .then(json => {
            document.querySelector("#title" + sign).innerHTML = capitalize(sign)
            document.querySelector("#img" + sign).src = IMG[sign]
            document.querySelector("#date" + sign).innerHTML = json.date_range
            document.querySelector("#description" + sign).innerHTML = json.description
            document.querySelector("#color" + sign).innerHTML = json.color
            document.querySelector("#lucky_number" + sign).innerHTML = json.lucky_number
            document.querySelector("#lucky_time" + sign).innerHTML = json.lucky_time
            document.querySelector("#mood" + sign).innerHTML = json.mood
        })
}

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


function init() {
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
        default:
            window.location.href = "/"
    }

    SIGNS.forEach(sign => { createSections(sign); getHoroscope(sign) })
}

init()