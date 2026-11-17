function unCamelCase(str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()).trim();
}

function buildStatBreakdown() {

    const sortOrder = ["stars", "moons", "orbs", "diamonds", "coins", "userCoins", "demons", "demonKeys", "goldKeys"].reverse()
    const statImages = { orbs: "orbs", userCoins: "silvercoin", demonKeys: "key"  }

    let stats = Object.keys(statBreakdown).sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b)).reverse()

    stats.forEach(x => {
        $('#statBreakdownTypes').append(`<img class="statBType gdButton" statType="${x}" src="assets/${statImages[x] || x.slice(0, -1)}.png">`)
    })

    $('.statBType').click(function() {
        showStatBreakdown($(this).attr("statType"))
    })

    showStatBreakdown("stars")
}


function showStatBreakdown(stat) {
    let e = $('#mainStatBreakdown')

    if (e.attr("statname") == stat) return
    e.attr("statname", stat)

    let isCoins = stat == "coins"

    let breakdown = statBreakdown[stat]
    if (!breakdown) return

    e.html(`<h2 style="margin-bottom: 2px">${isCoins ? "Secret Coins" : unCamelCase(stat)}</h2>`)
    e.append(`<div style="margin-bottom: 25px" class="allInline allMiddle"><img style="height: 2.5em; margin-right: 6px" src="${$(`.statBType[statType=${stat}]`).attr("src")}"> <p><b>${commafy((breakdown.Total || 0) + (breakdown.Unknown || 0))}<b></p></div>`)

    let sources = Object.entries(breakdown).sort((a, b) => ((b[0] != "Unknown") - (a[0] != "Unknown")) || b[1] - a[1])
    sources.forEach(x => {
        let groupName = (isCoins && x[0] == "Unknown") ? "Map Packs / Unknown" : x[0]
        if (x[0] != "Total") e.append(`<div class="statBRow${x[0] == "Unknown" ? " statBUnknown" : ""}"><p class="statBName">${groupName}</p><p class="statBCount">${commafy(x[1])}</p>`)
    })
}