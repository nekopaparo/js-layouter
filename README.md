# 網頁模板套用 (Javascript)

## USE
```html
<script src="./js.layouter.js"></script>
<script>
    Layouter.open("./content.html");
</script>
```
## Base Sample
### layout.html
```html
<!DOCTYPE html>
<html lang="zh-tw">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {% block head %} <!--head will insert it-->
</head>
<body>
    {% block content %} <!--content will insert it-->
</body>
</html>
```
### content.html
```html
{% extends "layout.html" %}
{% block head %}
<title>Document</title>
<!--your script-->
<!--your css-->
{% endblock %}
<body>
{% block content %}
<!--your html code-->
{% endblock %}
</body>
```
## Result
```html
<!DOCTYPE html>
<html lang="zh-tw">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!--your script-->
    <!--your css-->
</head>
<body>
    <!--your html code-->
</body>
</html>
```