//alert("Due to the missing days, I had so much school work that their are bugs that I can't patch, one of them being, if you choose a new item to view, and you keep the previous item open. When you reload the webpage for the previous item the new one will be there as well. It annoys me to have something like that, but I don't have enough time to seek other options, so Sorry!")
// But due also understand that I am limited to languages that aren't considered BackEnd so that has been a huge downside in how much I can do
function catalogDrop() {
    document.getElementsByClassName('catalogOptions')[0].classList.toggle('activeDrop');
    document.getElementsByClassName('catalogOptions')[0].addEventListener('mouseleave', (e) => {
        if (!e.target.matches('.optionForCatalog')) {
            document.getElementsByClassName('catalogOptions')[0].classList.remove('activeDrop');
        }
       
        
    })
}

const popItem = JSON.parse(localStorage.getItem("currentItem"));
const priceItem = parseFloat(popItem.price.slice(0, popItem.price.search(' -')));

$('.titlePreviewItem, .itemName').text(popItem.name);
$('.itemPrice').text('$' + priceItem);
popItem.color.forEach((color, index) => {
    if (index == 0) {
        $('<div>').addClass('itemColor').addClass(color).addClass('active').appendTo($('.itemColorOptions'));
    } else {
        $('<div>').addClass('itemColor').addClass(color).appendTo($('.itemColorOptions'));
    }
})
$('.itemColor').on('click', function() {
    $(this).parent().children().removeClass('active');
    $(this).addClass('active');
})

$('#totalCartPrice').text('Total Price: $' + priceItem)
$('#quantityCart').on('input', function() {
    if ($('#quantityCart').val() > 10) {
        $('#quantityCart').val(10)
        $('#quantityLabel').text('Quantity (Max)')
    } else if ($('#quantityCart').val() <= 0) {
        $('#quantityCart').val(0)
    } else {
        $('#quantityLabel').text('Quantity');
    }
    $('#totalCartPrice').text('Total Price: $' + (priceItem * $('#quantityCart').val()).toFixed(2));
})


$('[type=file]').on('click', function() {
    $(this).on('change', function(e) {
        let imgVal = $(this).val();
        let img = URL.createObjectURL(e.target.files[0])

        if (imgVal.includes('.jpg') || imgVal.includes('.png') || imgVal.includes('.svg')) {
            $(this).parent().parent().siblings("img").attr('src', img);
            $(this).parent().parent().siblings("img").css('display', 'block');
            $(this).parent().parent().remove();
        } else {
            alert(imgVal);
        }
    })
})
$('.color').on('click', function() {
    $(this).parent().children().removeClass('active');
    $(this).addClass('active');
})
