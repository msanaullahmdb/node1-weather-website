
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const search = document.querySelector('form')
const inputSearch = document.querySelector('input')

search.addEventListener('submit', (e) => {
    
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const address = inputSearch.value

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(address)).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messageTwo = ''
        }

        messageOne.textContent = data.location
        messageTwo.textContent = data.description
        
    })
})

    


})


