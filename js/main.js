$(document).ready(function() {
    let uri = 'https://my-json-server.typicode.com/ary21/mypwa/peoples';

    let listData = ''
    let filterResults = '';
    let filters = [];

    $.get(uri, function(data) {
        filterResults += '<option value="all">Semua Negara</option>'
        $.each(data, function(k, itm) {
            listData += `<div>`+
                `<h5>${itm.name} <small>(${itm.gender})</small></h5>`+
                `<p>${itm.country}</p>`+
            `</div>`
            
            if ($.inArray(itm.country, filters) == -1) {
                filters.push(itm.country)
                filterResults += `<option value="${itm.country}">${itm.country}</option>` 
            }
        })
        
        $('#listData').html(listData)
        $('#filter').html(filterResults)
    })

    $('#filter').on('change', function(){
        const filter = $(this).val()
        let uriFilter = uri

        if (filter != 'all') 
            uriFilter = uri + `?country=${filter}`

            $.get(uriFilter, function(data) {
                listData = '';
                $.each(data, function(k, itm) {
                    listData += `<div>`+
                        `<h5>${itm.name} <small>(${itm.gender})</small></h5>`+
                        `<p>${itm.country}</p>`+
                    `</div>`
                })
                
                $('#listData').html(listData)
            })
    })
})