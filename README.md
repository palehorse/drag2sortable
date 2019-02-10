
## drag2sortable
拖曳排序
## 前置安裝
    jQuery
## 安裝
1.用npm指令安裝
```sh
npm install drag2sortable
```
2.用html語法引入
```html
<script src="drag2sortable/drag2sortable.jquery.js"></script>
```
#### Vue
```javascript
require('drag2sortable/drag2sortable.jquery.js');
```
#### Demo
[Demo on jsFiddle](https://jsfiddle.net/Palehorse/fpumzvb3/26/)

## 使用方法
#### 基本用法
```html
<!-- HTML --!>
<ul id="drag2sortable">
  <li>item1</li>
  <li>item2</li>
  <li>item3</li>
  <li>item4</li>
  <li>item5</li>
  <li>item6</li>
</ul>
```
```javascript
//JavaScript
$('ul#drag2sortable').drag2sortable();
```
## Callbacks
#### onMove
```javascript
$('ul#drag2sortable').drag2sortable({
    onMove: function() {
        // Do something during dragging.
    }
});
```
#### onSorted
```javascript
$('ul#drag2sortable').drag2sortable({
    onSorted: function() {
        // Do something when sorting done.
    }
});
```
