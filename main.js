//alert('Project for Business Class, made by Oleh Fetsyak. ');
document.getElementsByClassName('browseItem')[0].addEventListener('click', () => {
    window.location.href = 'browse.html';
})

function catalogDrop() {
    document.getElementsByClassName('catalogOptions')[0].classList.toggle('activeDrop');
    document.getElementsByClassName('catalogOptions')[0].addEventListener('mouseleave', (e) => {
        if (!e.target.matches('.optionForCatalog')) {
            document.getElementsByClassName('catalogOptions')[0].classList.remove('activeDrop');
        }
       
        
    })
}
/*window.addEventListener('click', (e) => {
    if(!e.target.matches('.optionForCatalog')) {
        console.log(e.target)
        
        if (!document.getElementsByClassName('catalogOptions')[0].classList.contains('activeDrop')) {
            document.getElementsByClassName('catalogOptions')[0].classList.remove('activeDrop');
        }
    }
})*/