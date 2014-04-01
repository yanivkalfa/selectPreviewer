selectPreviewer
===============

selectPreviewer plugin that will allow you to preview images or sites in a select node indluding the ability to show an image icon in the select options.



Simple init : 

$('.select').selectPreview();

<select class="select" name="select">
  <option value="http://mkalty.org/wp-content/uploads/2014/03/Animals_Cats_Small_cat_005241_.jpg"> Nice cat</option>
  <option value="http://4.bp.blogspot.com/-BuWMwQI4u_0/UIUQjhKFsbI/AAAAAAAAHnw/bvGi3VE2bLo/s640/cats_animals_desktop_2560x1600_hd-wallpaper-749539.jpeg"> Nice cat2</option>
  <option value="http://mkalty.org/wp-content/uploads/2014/03/cats_animals_kittens_cat_kitten_cute_desktop_1680x1050_hd-wallpaper-753974.jpeg"> Nice cat3</option>
  <option value="not an image"> not an image </option>
</select>


Demo: <a href="">Simple Init</a>


Init with options :

$('.select').selectPreview({
  imgBGColor :  red,
  showImg : true,
  showText : true
});

<select class="select" name="select">
  <option value="http://mkalty.org/wp-content/uploads/2014/03/Animals_Cats_Small_cat_005241_.jpg"> Nice cat</option>
  <option value="http://4.bp.blogspot.com/-BuWMwQI4u_0/UIUQjhKFsbI/AAAAAAAAHnw/bvGi3VE2bLo/s640/cats_animals_desktop_2560x1600_hd-wallpaper-749539.jpeg"> Nice cat2</option>
  <option value="http://mkalty.org/wp-content/uploads/2014/03/cats_animals_kittens_cat_kitten_cute_desktop_1680x1050_hd-wallpaper-753974.jpeg"> Nice cat3</option>
  <option value="not an image"> not an image </option>
</select>

Demo: <a href="">Init with options</a>


<storn>you have the following options available:</strong>
imgBGColor : (String) css color value {black | #3h38s} (defualt : black).
showImg" :  (Boolean) display image icon in options? (defualt : true).
showText" : (Boolean) display text in option? (defualt : false).
srcImgWidth" : (String) icon css height value {"20px"} (defualt : "20px").
srcImgHeight" : (String) icon css width value {"20px"} (defualt : "20px").
prevWinLinkWidth" : (String) preview iFrame css width value {"20px"} (defualt : "300px").
prevWinLinkHeight" : (String) preview iFrame css width value {"20px"} (defualt : "300px").
prevWinImgWidth" : (String) preview image css width value {"20px"} (defualt : "auto").
prevWinImgHeight" : (String) preview image css height value {"20px"} (defualt : "auto").
prevWinWaitTime" : (Int) Hovering wait time in seconds before preview pops {2} (defualt : 0).


Init with method :
$('.select').selectPreview({
  optEnter : function(){
    alert($(this).data('value'));
    alert($(this).data('innerHTML'));
    alert($(this).data('selected'));
    alert($(this).data('disabled'));
  }
});

<select class="select" name="select">
  <option value="http://mkalty.org/wp-content/uploads/2014/03/Animals_Cats_Small_cat_005241_.jpg"> Nice cat</option>
  <option value="http://4.bp.blogspot.com/-BuWMwQI4u_0/UIUQjhKFsbI/AAAAAAAAHnw/bvGi3VE2bLo/s640/cats_animals_desktop_2560x1600_hd-wallpaper-749539.jpeg"> Nice cat2</option>
  <option value="http://mkalty.org/wp-content/uploads/2014/03/cats_animals_kittens_cat_kitten_cute_desktop_1680x1050_hd-wallpaper-753974.jpeg"> Nice cat3</option>
  <option value="not an image"> not an image </option>
</select>

Demo: <a href="">Init with options</a>

<storn>you have the following methods available:</strong>
optEnter : accept no variable and is called when you enter an option. you can use this as reference to the option
optExit : accept no variable and is called when you exit an option. you can use this as reference to the option
                    
                    
                    
