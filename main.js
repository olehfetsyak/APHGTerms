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
const popularCatalogItems = [
    {
        name: "White Tank Top Kids Shirt",
        image: "data:,",
        color: [
            "black",
            "white",
            "blue"
        ],
        price: "8.99 - Kid's"
    },
    {
        name: "Sport Pants Skinny",
        image: "data:,",
        color: [
            "blue",
            "cyan"
        ],
        price: "20.99 - Teen's"
    },
    {
        name: "Winter Outdoor Wool Hat",
        image: "data:,",
        color: [
            "green",
            "grey",
            "black"
        ],
        price: "5.99 - Kid's"
    },
    {
        name: "Sleak Black Sneaker",
        image: "data:,",
        color: [
            "black"
        ],
        price: "59.99 - Men's"
    },
    {
        name: "Fancy Wool Tarp",
        image: "data:,",
        color: [
            "red",
            "cyan",
            "yellow"
        ],
        price: "39.99 - Women's"
    },
    {
        name: "White Tank Top Kids Shirt",
        image: "data:,",
        color: [
            "red",
            "blue"
        ],
        price: "8.99 - Kid's"
    },
    {
        name: "White Tank Top Kids Shirt",
        image: "data:,",
        color: [
            "red",
            "blue"
        ],
        price: "8.99 - Kid's"
    },
    {
        name: "White Tank Top Kids Shirt",
        image: "data:,",
        color: [
            "red",
            "blue"
        ],
        price: "8.99 - Kid's"
    },
]
popularCatalogItems.forEach((data, index) => {
    let $cardContainer = $('<div>').addClass('cardContainer').appendTo('#topPicks');

    $('<div>').addClass('cardName').text(data.name).appendTo($cardContainer);

    let $cardImage = $('<div>').addClass('cardImage').appendTo($cardContainer);
    let $form = $('<form>').appendTo($cardImage);
    $('<label>').addClass('fileUpload').html('<input type="file" id="headerImgFile">Try Uploading an Item Pic').appendTo($form);
    $('<img>').addClass('cardItem').attr('draggable', 'false').attr('src', data.image).attr('alt', "").appendTo($cardImage);

    let $colorOptions = $('<div>').addClass('colorOptions').appendTo($cardContainer);
    data.color.forEach((color, index) => {
        if (index == 0) {
            $('<div>').addClass('color').addClass(color).addClass('active').appendTo($colorOptions);
        } else {
            $('<div>').addClass('color').addClass(color).appendTo($colorOptions);
        }
    })

    let $item = $('<a>').addClass('price').attr("target", "_blank").attr('href', "/item/previewItem.html").html('$' + data.price).appendTo($cardContainer);
    $item.on('click', function() {
        localStorage.clear()
        localStorage.setItem("currentItem",  JSON.stringify(data));
        window.location.href('/item/previewItem.html');
    })
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



/*
<div class="cardContainer">
    <div class="cardName">
        Grey Sweater for All
    </div>
    <div class="cardImage">
        <form>
            <label class="fileUpload">
                <input type="file" id="headerImgFile">
                Try Uploading an Item Pic
            </label>
        </form>
        <img class="cardItem" draggable="false" src="data:," alt>
    </div>
    <div class="colorOptions">
        <div class="color red active"></div>
        <div class="color blue"></div>
        <div class="color yellow"></div>
    </div>
    <div class="price">$4.99 - Men's</div>
</div>
*/
