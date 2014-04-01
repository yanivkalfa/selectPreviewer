selectPreviewer
===============

selectPreviewer plugin that will allow you to preview images or sites in a select node indluding the ability to show an image icon in the select options.



<strong>Simple init : </strong>
```javascript
$('.select').selectPreview();
```

```html
<select class="select" name="select">
  <option value="http://mkalty.org/wp-content/uploads/2014/03/Animals_Cats_Small_cat_005241_.jpg"> Nice cat</option>
  <option value="http://4.bp.blogspot.com/-BuWMwQI4u_0/UIUQjhKFsbI/AAAAAAAAHnw/bvGi3VE2bLo/s640/cats_animals_desktop_2560x1600_hd-wallpaper-749539.jpeg"> Nice cat2</option>
  <option value="http://mkalty.org/wp-content/uploads/2014/03/cats_animals_kittens_cat_kitten_cute_desktop_1680x1050_hd-wallpaper-753974.jpeg"> Nice cat3</option>
  <option value="not an image"> not an image </option>
</select>
```
Demo: <a href="http://jsfiddle.net/JYtc6/">Simple Init</a><br>


<strong>Init with options :</strong>
```javascript
$('.select').selectPreview({
  imgBGColor :  "red",
  showImg : true,
  showText : true,
  prevWinImgWidth : "150px",
  prevWinImgHeight : "150px"
});
```
```html
<select class="select" name="select">
  <option value="http://mkalty.org/wp-content/uploads/2014/03/Animals_Cats_Small_cat_005241_.jpg"> Nice cat</option>
  <option value="http://4.bp.blogspot.com/-BuWMwQI4u_0/UIUQjhKFsbI/AAAAAAAAHnw/bvGi3VE2bLo/s640/cats_animals_desktop_2560x1600_hd-wallpaper-749539.jpeg"> Nice cat2</option>
  <option value="http://mkalty.org/wp-content/uploads/2014/03/cats_animals_kittens_cat_kitten_cute_desktop_1680x1050_hd-wallpaper-753974.jpeg"> Nice cat3</option>
  <option value="not an image"> not an image </option>
</select>
```
Demo: <a href="http://jsfiddle.net/JYtc6/3/">Init with options</a><br>

<strong>you have the following options available:</strong>
imgBGColor : (String) css color value {black | #3h38s} (defualt : black).<br>
showImg" :  (Boolean) display image icon in options? (defualt : true).<br>
showText" : (Boolean) display text in option? (defualt : false).<br>
srcImgWidth" : (String) icon css height value {"20px"} (defualt : "20px").<br>
srcImgHeight" : (String) icon css width value {"20px"} (defualt : "20px").<br>
prevWinLinkWidth" : (String) preview iFrame css width value {"20px"} (defualt : "300px").<br>
prevWinLinkHeight" : (String) preview iFrame css width value {"20px"} (defualt : "300px").<br>
prevWinImgWidth" : (String) preview image css width value {"20px"} (defualt : "auto").<br>
prevWinImgHeight" : (String) preview image css height value {"20px"} (defualt : "auto").<br>
prevWinWaitTime" : (Int) Hovering wait time in seconds before preview pops {2} (defualt : 0).<br>


<strong>Init with method :</strong><br>
```javascript
$('.select').selectPreview({
  optEnter : function(){
    console.log($(this).data('value'));
    console.log($(this).data('innerHTML'));
    console.log($(this).data('selected'));
    console.log($(this).data('disabled'));
  }
});
```
```html
<select class="select" name="select">
  <option value="http://mkalty.org/wp-content/uploads/2014/03/Animals_Cats_Small_cat_005241_.jpg"> Nice cat</option>
  <option value="http://4.bp.blogspot.com/-BuWMwQI4u_0/UIUQjhKFsbI/AAAAAAAAHnw/bvGi3VE2bLo/s640/cats_animals_desktop_2560x1600_hd-wallpaper-749539.jpeg"> Nice cat2</option>
  <option value="http://mkalty.org/wp-content/uploads/2014/03/cats_animals_kittens_cat_kitten_cute_desktop_1680x1050_hd-wallpaper-753974.jpeg"> Nice cat3</option>
  <option value="not an image"> not an image </option>
</select>
```
Demo: <a href="http://jsfiddle.net/JYtc6/2/">Init with options</a><br>

<strong>you have the following methods available:</strong><br>
optEnter : accept no variable and is called when you enter an option. you can use this as reference to the option<br>
optExit : accept no variable and is called when you exit an option. you can use this as reference to the option<br>
                    
                    
                    
