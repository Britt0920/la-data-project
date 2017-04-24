function getData(){
    var endpoint='https://data.lacity.org/resource/v87k-wgde.json'
    var searchYear = document.getElementById('year').value
    if (searchYear === '') {
        searchYear = '2012'
    }
    var year = searchYear[searchYear.length - 2] + searchYear[searchYear.length - 1]
    
    console.log(year)

    fetch(endpoint)
    .then(function(data){
        return data.json()
    })
    .then(function(json){
        console.log(json)
        var finalHTML = ''
        
        var filteredData = json.filter(function(item){
            for (var prop in item){
                if (prop.match(year)) {
                    return true
                }
            }
        })

        filteredData.forEach(function(item){
        var cardItem = `
            <div class="col s6 m4">
              <div class="card">
                <div class="card-image">
                  <img src="https://static.pexels.com/photos/71940/water-drop-splashing-motion-71940.jpeg">${searchYear}</span>
                </div>
                <div class="card-content">
                  <p>In the zip ${item.location_1_zip} the amount of water they used in ${searchYear} were ${Math.floor(item.fy_06_07*7.48)} gallons.</p>
                </div>
                <div class="card-action">
                </div>
              </div>
            </div>
        `
        finalHTML += cardItem
        })    
        var resultDiv= document.getElementById('result')
        resultDiv.innerHTML = finalHTML
     })
     .catch(function(error){
         console.log(error)
     })
}